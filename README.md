# Calendar Pi
Did you live your life near the turn of the century by a dry-erase 
calendar in the kitchen?  Do you long for more visibility into your 
Google Calendar (or perhaps other online calendar)?  Then look no 
further!  The solution is here.

![Photo of the finished product mounted on a wall near clipboards, dry-erase, and files.](photos/Overview.jpg)

## Ingredients
1. Raspberry Pi 3 B
2. 2.5 A USB power supply
3. Short HDMI cable - see [photo of the back](photos/Back.jpg)
4. 32" LCD TV with HDMI input (I got one on Craigslist for $5)
5. Wall-mount for the TV (eBay and Amazon have them cheap)
6. Cheap flat USB HUB - see [photo of a mounted hub](photos/USBHub.jpg)
7. 8GB+ SD card
8. Wi-Fi or ethernet where you want the calendar
9. USB or Bluetooth Keyboard and USB mouse to help with setup
10. Double-sided foam tape or something similar
11. Small cable ties (a.k.a. zip ties) 
12. Duct tape

## Steps
1. Get the [Raspberry Pi imager](https://www.raspberrypi.org/downloads/) for a computer near you with an SD card slot.
2. Download the [Raspbian Stretch image](https://downloads.raspberrypi.org/raspbian_full/images/raspbian_full-2019-04-09/). 
Buster has an unfortunate networking bug that causes it to drop wi-fi connection after a few minutes in my installation.
3. Use the imager to install the image to the SD card.
4. Put it all together: Connect the HDMI cable between the Pi and the TV, connect the USB hub to the Pi. 
Put the SD card in the Pi, connect the power supply to the Pi, but don't plug it in yet. 
At this point, you should be able to see where the Pi will fit against the back of the TV.  Use the double-sided tape to fix the
USB hub to a back corner of the TV. Secure the cables with duct tape and cable ties. Let the Pi float, but keep it still relative
to the TV. [It might look something like this](photos/Back.jpg).  Take a look at [all the photos](photos).  The most fragile
part of this arrangement is the micro USB power connector.  Be sure the pins on the Pi aren't touching metal.
5. Power it up, plug in the keyboard and mouse to the usb hub.
6. Do the basic setup for your Pi - select language, keyboard style, time zone, password, etc., and set up the network.  You'll
use the default user "pi" to run the calendar, and this user has sudo permission by default, which will be needed.
7. If you want to set the system up remotely (from another machine running Ansible), skip to step 11
8. `wget https://github.com/ke4roh/rpi-calendar/releases/download/r1/calendar-install-1.run`
9. `sh calendar-install-1.run`
10. skip to step 17
11. In Pi system preferences, enable SSH.
12. From the configuring machine, download or clone this repo
13. SSH into the Pi
14. ssh-copy-id to the pi (to make it oh so much easier to administer)
15. copy hosts-localhost to a new file "hosts", and edit it, replacing "localhost" with the name or IP of your Pi.
16. `ansible-playbook playbook.yml -i hosts -u pi`
17. `reboot` the pi
18. Log in to your Google account on the Pi
19. Put a bow on it. You're done!

## Adding a passive infra-red sensor
1. Get an HC-SR501 sensor module.  Set it's L/H option to "H", either with a jumper or a dot of solder.
2. Connect wires to pins 4,6, and 16 on the top row of connectors. With the connector at the top left of the board, 
the top leftmost pin is #2, and the top row is numbered by twos (the bottom row gets the ones). Pin 16 is GPIO 23.  
If you change the scripts, you can change the pin.  
3. With the HC-SR501 pins at the top and facing you, the leftmost pin is ground.  Connect that to the wire from pin 6 on the Pi.
4. Connect the rightmost pin on the HC-SR501 to pin 4 from the Pi.
5. Connect the center pin on the HC-SR501 to pin 16 from the Pi.
6. Monut the HC-SR501 to your monitor, but away from the power LED or anything else that might mess with detection.
7. When you run the playbook (either by `ansible-playbook` or `calendar-install.run`), add a parameter 'DPMS_TIMEOUT_MIN=20'.
(Set it to your favorite value.  I like 20 minutes.)  For `ansible-playbook` execution, you'll want to prefix that with `--extra-vars `
8. Watch it go 
