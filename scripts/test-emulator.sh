#!/bin/bash
# Boot a Pi image in QEMU and run a basic smoke test via Ansible.
# Usage: ./scripts/test-emulator.sh [image]

set -euo pipefail

if [ -f .env ]; then
  . ./.env
fi

IMG="${1:-${IMG:-runtime/raspios.img}}"
if [ ! -f "$IMG" ]; then
  echo "Image $IMG not found" >&2
  exit 1
fi

# Launch emulator in background, logging output so Ansible has blocking IO
LOG_FILE=$(mktemp)
./scripts/start-emulator.sh "$IMG" >"$LOG_FILE" 2>&1 &
QEMU_PID=$!

# Display emulator output with prefix
tail -F "$LOG_FILE" | sed -u 's/^/[qemu] /' &
TAIL_PID=$!

trap 'kill $QEMU_PID $TAIL_PID 2>/dev/null; rm -f "$HOSTS_FILE" "$LOG_FILE"' EXIT

# Wait for SSH to become available by attempting to run a no-op command
echo "[host] Waiting for SSH on port 2222..."
for i in {1..120}; do
  if ssh -o BatchMode=yes -o StrictHostKeyChecking=no -p 2222 pi@localhost true 2>/dev/null; then
    break
  fi
  sleep 5
done
if ! ssh -o BatchMode=yes -o StrictHostKeyChecking=no -p 2222 pi@localhost true 2>/dev/null; then
  echo "[host] SSH did not become available" >&2
  exit 1
fi

HOSTS_FILE=$(mktemp)
cat >"$HOSTS_FILE" <<EOF
[calendar]
localhost ansible_host=127.0.0.1 ansible_user=pi ansible_port=2222
EOF

echo "[host] Running playbook..."
ansible-playbook -i "$HOSTS_FILE" playbook.yml | sed -u 's/^/[ansible] /'

echo "[host] Checking for Chromium..."
ansible -i "$HOSTS_FILE" all -m shell -a 'which chromium-browser' | sed -u 's/^/[ansible] /'

