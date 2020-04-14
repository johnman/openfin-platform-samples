
# platform-messaging-channel

If you were using the InterApplicationBus Channel API and you wanted to know if it still worked the same then this is an example for you. 

* Will the same logic that worked in a windowed application work in a view (short answer: yes)? 

We include run the same logic as both a window application and platform application to show that it works.

_Sample Usage (from root folder one level up from this directory)_

```
npx http-server -p 5001 -c-1 or npm run local (after running npm install)
openfin -l -c http://localhost:5001/platform-messaging-channel/config/app.platform.local.fin.json
```

To run the window app:

```
npx http-server -p 5001 -c-1 or npm run local (after running npm install)
openfin -l -c http://localhost:5001/platform-messaging-channel/config/app.window.local.fin.json
```

### Using the Channel API from a window app? 
![](1-window-messaging.gif)

### Using the same Channel API code from a platform app? 
![](2-platform-messaging.gif)

Just clone this repo, start the webserver and use the openfin cli to get started.

The channel logic can be found in views/channel/channel.js and the client logic can be found in /views/view-one/view-one.js and /views/view-two/view-two.js. You can use the debugger to set break points and trigger actions via the buttons. We have added a basic console view to each view to make it easy to see what is happening.