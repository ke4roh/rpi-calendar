#!/bin/bash
# Start a Raspberry Pi OS image with QEMU.
# Usage: ./scripts/start-emulator.sh [image]

set -euo pipefail

if [ -f .env ]; then
  . ./.env
fi

IMG="${1:-${IMG:-runtime/raspios.img}}"
if [ ! -f "$IMG" ]; then
  echo "Image $IMG not found" >&2
  exit 1
fi

if ! command -v qemu-system-aarch64 >/dev/null; then
  echo "qemu-system-aarch64 not installed" >&2
  exit 1
fi

KERNEL="${KERNEL:-runtime/kernel8.img}"
DTB="${DTB:-runtime/bcm2710-rpi-3-b-plus.dtb}"
if [ ! -f "$KERNEL" ] || [ ! -f "$DTB" ]; then
  echo "Missing $KERNEL or $DTB. Run ./configure to prepare runtime files." >&2
  exit 1
fi

exec qemu-system-aarch64 \
  -M raspi3b \
  -m 1G \
  -drive file="$IMG",format=raw \
  -kernel "$KERNEL" \
  -dtb "$DTB" \
  -append "root=/dev/sda2 rw console=ttyAMA0" \
  -serial stdio \
  -net user,hostfwd=tcp::2222-:22 -net nic

