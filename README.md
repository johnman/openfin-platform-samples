# Platform Samples

This is a repo with a few mini examples related to platform that may answer some common questions.

_Requirements_

A localhost file server of choice on port 5001
The OpenFin CLI

_Sample Usage_

```
npx http-server -p 5001 -c-1
openfin -l -c http://localhost:5001/platform-messaging/app.json
```

## [platform-messaging](platform-messaging/README.md)

If you were using the InterApplicationBus to target specific windows in your application does this change when you move to platform? 

* Can you still have a window and send a message to it? 
* Can you target a view within a window?
* If you drag a view to another window will it still receive the messages you send to it?
* What happens if you capture a snapshot and restore it? Do the window/view names persist and still receive messages? 

[Click here to read more...](platform-messaging/README.md)
