#!/bin/bash
# Boot a Pi image in QEMU and run a basic smoke test via Ansible.
# Usage: ./scripts/test-emulator.sh [image]

set -euo pipefail

IMG="${1:-runtime/raspios.img}"
if [ ! -f "$IMG" ]; then
  echo "Image $IMG not found" >&2
  exit 1
fi

# Launch emulator in background
./scripts/start-emulator.sh "$IMG" &
QEMU_PID=$!
trap 'kill $QEMU_PID 2>/dev/null; rm -f "$HOSTS_FILE"' EXIT

# Wait for SSH to come up
for i in {1..60}; do
  if nc -z localhost 2222; then
    break
  fi
  sleep 5
done
if ! nc -z localhost 2222; then
  echo "SSH did not become available" >&2
  exit 1
fi

HOSTS_FILE=$(mktemp)
cat >"$HOSTS_FILE" <<EOF
[calendar]
localhost ansible_host=127.0.0.1 ansible_user=pi ansible_port=2222
EOF

ansible-playbook -i "$HOSTS_FILE" playbook.yml
# Simple check: ensure Chromium is installed
ansible -i "$HOSTS_FILE" all -m shell -a 'which chromium-browser'

