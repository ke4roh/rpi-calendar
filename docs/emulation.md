# Emulating a Raspberry Pi with QEMU

This project can be tested without real Pi hardware by running a
Raspberry Pi OS image under QEMU. This document outlines a minimal
setup for local experimentation.

## Requirements
* `qemu-system-aarch64`
* A 64‑bit Raspberry Pi OS image. Images are available from the
  [official Pi downloads site](https://www.raspberrypi.com/software/operating-systems/).

## Quick start
1. Run `./configure` to install dependencies and prepare runtime files.
   This downloads a Pi OS image and extracts the kernel and DTB into
   `./runtime`.
2. Launch QEMU with basic emulation parameters:

   ```bash
   qemu-system-aarch64 \
     -M raspi3b \
     -m 1G \
     -drive file=runtime/raspios.img,format=raw \
     -kernel runtime/kernel8.img \
     -dtb runtime/bcm2710-rpi-3-b-plus.dtb \
     -append "root=/dev/sda2 rw console=ttyAMA0" \
     -serial stdio \
     -net user,hostfwd=tcp::2222-:22 -net nic
  ```

   Kernel and DTB files live in `runtime/` after running `./configure`.
   This starts an
   emulated Pi 3B with 1 GiB of RAM. SSH is forwarded to port `2222` on
   the host for convenience.

3. Log in to the virtual Pi using `ssh -p 2222 pi@localhost` once the
   boot process finishes.

### Running the Ansible playbook
With the VM running, copy `hosts-localhost` to `hosts` and adjust the
SSH port:

```ini
[calendar]
localhost ansible_port=2222 ansible_user=pi ansible_host=127.0.0.1
```

Then execute the playbook:

```bash
ansible-playbook -i hosts playbook.yml
```

This installs required packages and configures autostart just as on
real hardware.

## Helper script
For repeated testing, the optional `scripts/start-emulator.sh` script
simplifies booting the VM. It defaults to the image in `runtime/`:

```bash
./scripts/start-emulator.sh
```

The script launches QEMU with sensible defaults and exposes SSH on
port 2222.

## Automated testing
An additional helper script can run the playbook against the emulator and verify that key packages are installed. It boots the VM, waits for SSH on port 2222, applies the playbook and then checks that Chromium launches correctly.

```bash
./scripts/test-emulator.sh
```

This provides a basic smoke test without requiring real Pi hardware.
