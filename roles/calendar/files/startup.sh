#!/bin/bash

# If booting without keyboard/mouse/ethernet, turn off USB power
# [ $(lsusb | wc -l) -lt 4 ] && echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind

# Start the browser using qutebrowser in fullscreen mode
qutebrowser ':open https://calendar.google.com/calendar/r/custom/7/d' ':fullscreen' &
