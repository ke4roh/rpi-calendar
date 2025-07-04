#!/bin/bash
# Start a Raspberry Pi OS image with QEMU.
# Usage: ./start-emulator.sh /path/to/raspios.img

IMG="$1"
if [ -z "$IMG" ]; then
  echo "Usage: $0 /path/to/raspios.img" >&2
  exit 1
fi

qemu-system-aarch64 \
  -M raspi3b \
  -m 1G \
  -drive file="$IMG",format=raw \
  -kernel kernel8.img \
  -dtb bcm2710-rpi-3-b-plus.dtb \
  -append "root=/dev/sda2 rw console=ttyAMA0" \
  -serial stdio \
  -net user,hostfwd=tcp::2222-:22 -net nic

