
# platform-autoshow

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


_Sample Usage (from root folder one level up from this directory)_

```
npx http-server -p 5001 -c-1 or npm run local (after running npm install)
openfin -l -c http://localhost:5001/platform-autoshow/app.local.json
```

###  Can you launch a window with autoshow false? / Can you launch a window with a view with autoshow is false? / Can a window decide it is ready to be shown? /Can a view decide it is ready for the window to be shown?
![](1-platform-autoshow.gif)

### Can you launch a window with autoshow false? / Can you launch a window with a view with autoshow false? / Can you tell a window to show itself? / Can you tell a window with a view to show itself? 
![](2-platform-autoshow.gif)

Just clone this repo, start the webserver and use the openfin cli to get started.

The logic is broken into a few main files:

* app.json this specifies a providerUrl which is found in platform/provider.html. This loads two js files. One which initialises the platform (platform.js needed if you have a custom provider) and controller.js
* platform/controller.js this is just some code to simulate an event triggering the launching of 2 windows and 2 windows with views. Two will autoshow themselves after loading and two are set visible through the controller.
* index.js/index.html this has the ability to launch windows and windows with views. By default these views are hidden. You can then select them from the drop down and make them visible with the show button.
* the other html files are very basic files with minimal JavaScript logic.