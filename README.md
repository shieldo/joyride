About
-----

This is code produced in support of a hack called Joyride, which was produced during the [Culture Hack Scotland](http://www.welcometosync.com/hack/) event in Glasgow on 13-14 July 2013. The plan stemmed from the basic idea that it would be pretty cool if you could use a bicycle as a simple, leisurely interface by which you could navigate a series of data sets. The hack was partly appealing also because it was a physical hack but concerning a virtual space, being a path through the sky above Scotland.

High-level explanation
----------------------
The bicycle was a Raleigh mountain bike, mounted up in a frame that allowed it to be pedalled while stationary, and to be steered without allowing forward movement (using fixed perpendicular casters). A rider would get on the bike and start pedalling through a virtual cloudscape running in a web browser whose output was projected onto a screen. Turning left or right on the bicycle's handlebars would make the bicycle turn left or right within the virtual space. At certain points during the journey, images relating to artists within Scotland would come towards you through the clouds.

The intention was to allow the navigation of a set track through time and space within Scotland, and to provide "exit signs" that point to localised interfaces that are specific to individual data sets.

Lower-level explanation
-----------------------
The behaviour of the bike was picked up using two sensors.

Firstly, a laser beam was fired continuously through the back wheel at a photoresistor on the other side, and because of a large segment of cardboard inserted within the wheel's spokes, it was possible by taking readings every one quarter of a second from the photoresistor and averaging over three readings to work out whether the bike was moving or not.

Secondly, a [potentiometer](http://en.wikipedia.org/wiki/Potentiometer) was attached to the top of the steering column. This changes its electrical resistance depending on its level of rotation, and so could be used to measure to what degree the bike's handlebars were rotated.

These two sensors were attached to an [Arduino](http://www.arduino.cc/) dangling behind the bike's central column that was running a program written in C++ that runs continuously in a loop, taking readings from the laser/photoresistor every 0.25s and the potentiometer every 0.75s, and writing out to a serial interface using a simple text-based protocol (e.g. `POSIT:823` or `STEER:94`).

The Arduino was attached to a [Raspberry Pi](http://www.raspberrypi.org/) (a small, cheap Linux-based computer) over a USB cable. This was running a Python program in a loop which listened on the serial interface to the messages the Arduino was sending out (using the [pyserial](http://pyserial.sourceforge.net/) library), keeping a record of the status of the bike, and sending out HTTP requests (like a web browser makes to a web server) whenever it calculated that the status had changed.

The web server in question resided elsewhere on the wireless network on a Macbook Pro (actually, the same computer used to display the sky during the show and tell).  It was an application using [Meteor](http://meteor.com/), which is a web framework that allows you to write JavaScript that can work on both the server and within the web browser, and easily sync real-time changes between the server and any web browser connected to it (meaning that many people would be able to watch the rider's progress in their web browsers in real time).  Every time the web server received a request from the Raspberry Pi, it would save the new state into a MongoDB database and automatically sync the changes to a hidden web form within the browser, and fire custom JavaScript events there that would trigger movement in the clouds, whether forwards, stopping, left, centre or right.

The movement of the clouds uses a JavaScript library called [three.js](http://threejs.org/), which helps make 3D experiences within a web browser using [WebGL](http://en.wikipedia.org/wiki/WebGL) technology. (Not all browsers support WebGL yet, but support is coming!) The clouds were a modification of those within the intro sequence to [http://ro.me/](http://ro.me/).

Pictars
-------
![](https://lh4.googleusercontent.com/-2zW3I7bF5g8/UeWywkdSU1I/AAAAAAAABgU/7P6hK06FyqE/w924-h693-no/IMG_20130714_151659.jpg)
![](https://lh6.googleusercontent.com/-AytpRVRhTkw/UeWywhqywPI/AAAAAAAABgU/KoqA3s7rk7U/w924-h693-no/IMG_20130714_164308.jpg)
![](https://pbs.twimg.com/media/BPJfxAnCAAAa6Ax.jpg)

Credits
-------
The team who produced Joyride were: Nils Aksnes, Barry Conlon, Catriona Forrest, Douglas Greenshields, John Leatherbarrow and Ana Starhan Thomas.