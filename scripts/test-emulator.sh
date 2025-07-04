#!/bin/bash
# Boot a Pi image in QEMU and run a basic smoke test via Ansible.
# Usage: ./test-emulator.sh /path/to/raspios.img

set -euo pipefail

IMG="$1"
if [ -z "$IMG" ]; then
  echo "Usage: $0 /path/to/raspios.img" >&2
  exit 1
fi

# Launch emulator in background
./scripts/start-emulator.sh "$IMG" &
QEMU_PID=$!

# Wait for SSH to come up
for i in {1..60}; do
  if nc -z localhost 2222; then
    break
  fi
  sleep 5
done

HOSTS_FILE=$(mktemp)
sed 's/ansible_port=.*/ansible_port=2222/' hosts-localhost > "$HOSTS_FILE"

ansible-playbook -i "$HOSTS_FILE" playbook.yml
# Simple check: ensure Chromium is installed
ansible -i "$HOSTS_FILE" all -m shell -a 'which chromium-browser'

kill $QEMU_PID
rm "$HOSTS_FILE"
