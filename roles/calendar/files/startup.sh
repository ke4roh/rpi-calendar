#!/bin/bash

# If booting without keyboard/mouse/ethernet, turn off USB power
# [ $(lsusb | wc -l) -lt 4 ] && echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind

# Start the browser using Chromium with an updated user agent
chromium-browser --app=https://calendar.google.com/calendar/r/custom/7/d \
  --user-agent="Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" \
  --disable-infobars --disable-session-crashed-bubble --kiosk &
