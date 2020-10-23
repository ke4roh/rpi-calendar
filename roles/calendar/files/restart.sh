#!/bin/bash
export DISPLAY=:0.0

# Take a screenshot of the calendar before taking it away
scrot tmp.png
# Display the screenshot
feh --hide-pointer -x -q -D 5 -B black tmp.png &
sleep 1

# Note which window has the screenshot
FEH_WINDOW=$(wmctrl -l | grep feh | cut -f1 -d\ )

# Close the calendar window
wmctrl -ic $(wmctrl -l | grep -i "Google Calendar" | cut -f1 -d\ )
killall chromium-browser

# Restart the calendar window
./startup.sh

# Every quarter second for the next 15, bring feh to the front
for ((i=0;i<60;i++));
do 
   wmctrl -ia $FEH_WINDOW
   sleep 0.25 
done

# Close feh, remove screenshot
wmctrl -ic $FEH_WINDOW
rm tmp.png

# Make sure it's scrolled correctly
sudo ./refresh_cal
