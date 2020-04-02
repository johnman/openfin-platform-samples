
# platform-messaging

If you were using the InterApplicationBus to target specific windows in your application does this change when you move to platform? 

* Can you still have a window and send a message to it? 
* Can you target a view within a window?
* If you drag a view to another window will it still receive the messages you send to it?
* What happens if you capture a snapshot and restore it? Do the window/view names persist and still receive messages? 

_Sample Usage (from root folder one level up from this directory)_

```
npx http-server -p 5001 -c-1
openfin -l -c http://localhost:5001/platform-messaging/app.json
```

### Can you still have a window and send a message to it? 
![](1-platform-messaging.gif)

### Can you target a view within a window? 
![](2-platform-messaging.gif)

### If you drag a view to another window will it still receive the messages you send to it?
![](3-platform-messaging.gif)

### What happens if you capture a snapshot and restore it? Do the window/view names persist and still receive messages? 
![](4-platform-messaging.gif)

Just clone this repo, start the webserver and use the openfin cli to get started.

Most of the logic is in index.html and view-one and window-one have a small piece of code to listen to the InterApplicationBus and write out their name.
