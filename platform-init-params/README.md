
# platform-init-params

Your OpenFin application can receive init params (think querystring params). 

This information can be passed when the application is initially launched.

If you application is already running you can still receive these params.

The example shows this by letting you specify the background color of the application. It adds the color to the fin/fins links on the main page. If your application is already running you will see it picks up the new color when you launch it again via the fin/fins link.

* Will the same logic that worked in a windowed application work in a view/platform app (short answer: yes)? 

We include run the same logic as both a window application and platform application to show that it works.

_Sample Usage (from root folder one level up from this directory)_

```
npx http-server -p 5001 -c-1 or npm run local (after running npm install)
Visit http://localhost:5001/platform-init-params/ and use the links to launch the applications
```


### Using init params from a window app? 
![](1-window-init-params.gif)

### Using the same init params code from a platform app? 
![](2-platform-init-params.gif)

### Accessing the same init params data from a custom provider in a platform app? 
![](3-platform-provider-init-params.gif)

The main logic for listening to passed init params is in views/main/main.js. The method of passing params can be seen in the links in index.html ?$$name=value