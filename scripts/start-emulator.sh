#!/bin/bash
# Start a Raspberry Pi OS image with QEMU.
# Usage: ./start-emulator.sh /path/to/raspios.img

IMG="$1"
if [ -z "$IMG" ]; then
  echo "Usage: $0 /path/to/raspios.img" >&2
  exit 1
fi

# Ensure QEMU is available
if ! command -v qemu-system-aarch64 >/dev/null; then
  echo "qemu-system-aarch64 not installed" >&2
  exit 1
fi

# Kernel and DTB may be extracted from the Pi image's boot partition
KERNEL="${KERNEL:-kernel8.img}"
DTB="${DTB:-bcm2710-rpi-3-b-plus.dtb}"
if [ ! -f "$KERNEL" ] || [ ! -f "$DTB" ]; then
  echo "Missing $KERNEL or $DTB. Place them in the current directory or set KERNEL and DTB." >&2
  exit 1
fi

qemu-system-aarch64 \
  -M raspi3b \
  -m 1G \
  -drive file="$IMG",format=raw \
  -kernel "$KERNEL" \
  -dtb "$DTB" \
  -append "root=/dev/sda2 rw console=ttyAMA0" \
  -serial stdio \
  -net user,hostfwd=tcp::2222-:22 -net nic

