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
   The script installs QEMU, Ansible, and helper utilities, downloads a Pi OS image,
   resizes it to 8 GiB for QEMU, and extracts the kernel and DTB into
   `./runtime`. It also writes a `.env` file describing the runtime paths
   which the helper scripts automatically load.
2. Boot the VM using the provided helper script:

   ```bash
   ./scripts/start-emulator.sh
   ```

  The script launches an emulated Pi 3B with 1 GiB of RAM using the
  kernel and DTB extracted to `runtime/` and forwards SSH to port `2222`
  on the host.
  You may see occasional `Slirp: Failed to send packet` warnings from QEMU;
  these are harmless and can be ignored.

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
The `scripts/start-emulator.sh` script used above encapsulates the QEMU
options and forwards SSH to port 2222. Invoke it whenever you need to
launch the VM for testing.

### Makefile shortcuts
`make configure` runs the setup script only if `.env` does not already
exist. `make test` boots the emulator and applies the playbook using the
helper script, while `make clean` removes the generated runtime files
and environment.

## Automated testing
An additional helper script can run the playbook against the emulator and verify that key packages are installed. It boots the VM, waits for SSH on port 2222, applies the playbook and then checks that Chromium launches correctly.

```bash
./scripts/test-emulator.sh
```

The script prefixes emulator output with `[qemu]` and Ansible output with `[ansible]` so it is clear which component produces each log line.

This provides a basic smoke test without requiring real Pi hardware.
