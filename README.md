# Platform Samples

This is a repo with a few mini examples related to platform that may answer some common questions.

_Requirements_

A localhost file server of choice on port 5001
The OpenFin CLI

_Sample Usage_

```
npx http-server -p 5001 -c-1 or npm run local (after running npm install)
openfin -l -c http://localhost:5001/platform-messaging/app.local.json
```

## [platform-messaging](platform-messaging/README.md)

If you were using the InterApplicationBus to target specific windows in your application does this change when you move to platform? 

* Can you still have a window and send a message to it? 
* Can you target a view within a window?
* If you drag a view to another window will it still receive the messages you send to it?
* What happens if you capture a snapshot and restore it? Do the window/view names persist and still receive messages? 

[Click here to read more...](platform-messaging/README.md)

## [platform-messaging-channel](platform-messaging-channel/README.md)

If you were using the InterApplicationBus Channel API and you wanted to know if it still worked the same then this is an example for you. 

* Will the same logic that worked in a windowed application work in a view (short answer: yes)? 

We include a window based application and run the same logic by having those windows loaded as views.

[Click here to read more...](platform-messaging-channel/README.md)

## [platform-autoshow](platform-autoshow/README.md)

Can you hide windows/windows with views initially and then show them when they are ready?

# From a hidden window with control logic

* Can you launch a window with autoshow false?
* Can you launch a window with a view with autoshow is false?
* Can a window decide it is ready to be shown?
* Can a view decide it is ready for the window to be shown?
* Can the code that launched the window tell it to show?
* Can the code that launched the window with a view tell it to show?

# From a visible window 

* Can you launch a window with autoshow false?
* Can you launch a window with a view with autoshow false?
* Can you tell a window to show itself?
* Can you tell a window with a view to show itself?

[Click here to read more...](platform-autoshow/README.md)

## [platform-init-params](platform-init-params/README.md)

If you were using the ability to pass data to your application as launch params (regardless of whether or not it was already running) and you wanted to know if it still worked the same in platform apps then this is an example for you. 

* Will the same logic that worked in a windowed application work in a platform app (short answer: yes)? 

We include a window based application and run the same logic in the platform application.

[Click here to read more...](platform-init-params/README.md)

## [platform-save-context-data](platform-save-context-data/README.md)

This example shows how you can get and set window context data from a view. Additionally it shows how you can listen to changes made to the context (either from other views or the host window). The example also demonstrates setting a value in a text box, setting the context and capturing it in a snapshot. It then has a button to apply the snapshot so that you can see the view retrieving the stored value.

[Click here to read more...](platform-save-context-data/README.md)

## [platform-save-view-data](platform-save-view-data/README.md)

This example shows how you can get and set view custom data from a view. Additionally it shows how you can check for/get that data when the view loads. The example also demonstrates setting a value in a text box, setting the customData and capturing it in a snapshot. It then has a button to apply the snapshot so that you can see the view retrieving the stored value.

[Click here to read more...](platform-save-view-data/README.md)