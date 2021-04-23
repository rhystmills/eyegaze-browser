# eyegaze-browser :eyes:
Browse the internet with your eyes via a chrome extension.

This is a proof-of-concept app made during [The Guardian](https://github.com/guardian)'s April 2021 Hack Day, using [WebGazer](https://webgazer.cs.brown.edu/).

Lots of websites don't work because their security policy won't allow:
- Camera access
- Placing the website inside an iframe

It seems possible to hack around this in a chrome extension but I haven't had time yet.

### How to use:
- Turn on developer mode in your chrome extensions folder.
- 'Add unpacked' the `dist` folder from this repo. This should add the extension.
- Open a compatible page (probably via trial and error).
- Click lots of times in cardinal directions and in the centre of the screen.
- Hit space to activate the interface

This app is totally hacked together, and tested exclusively with my face. The 'back button' is currently painted on.

### How does it work?
It replaces every page you visit with a React app that contains the eyegaze-browser interface. It then loads the page you are trying to visit in a iframe. It creates a list of all tabbable elements in the iframe (via [tabbable](https://github.com/focus-trap/tabbable)) - you can access everything in the iframe because it has the same domain as the page you're on (which is the same page according to the browser).

WebGazer adds the red dot, video, and click calibration. A button in the eyegaze-browser interface can be selected by the dot remaining inside its space for a certain duration - triggering a function specific to the button.

There were many sub-optimal choices made along the way due to the time limit.
