# eyegaze-browser
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
