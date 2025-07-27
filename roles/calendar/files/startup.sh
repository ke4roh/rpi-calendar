#!/bin/bash

# If booting without keyboard/mouse/ethernet, turn off USB power
# [ $(lsusb | wc -l) -lt 4 ] && echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind

# Start the browser
nohup chromium-browser --app=https://calendar.google.com/calendar/r/custom/7/d --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201" --disable-infobars --disable-session-crashed-bubble --kiosk </dev/null 2>&1 >/dev/null  &

# The pir-monitor systemd service handles keeping the display awake when blanking is enabled
