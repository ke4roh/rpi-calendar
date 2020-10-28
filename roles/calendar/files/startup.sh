#!/bin/bash

# If booting without keyboard/mouse/ethernet, turn off USB power
# [ $(lsusb | wc -l) -lt 4 ] && echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind

# Start the browser
nohup chromium-browser --app=https://calendar.google.com/calendar/r/custom/7/d --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201" --disable-infobars --disable-session-crashed-bubble --kiosk </dev/null 2>&1 >/dev/null  &

# If blanking is requested, then run pirMonitor to make motion keep it from blanking
grep -q noblank /etc/xdg/lxsession/LXDE-pi/autostart || nohup /home/pi/pirMonitor </dev/null 2>&1 >/dev/null &
