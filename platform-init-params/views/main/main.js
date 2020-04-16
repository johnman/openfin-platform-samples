const initOpenFinParamListener = () => {
    const updateBackground = (options)=> {
        console.log("Received the following: " + JSON.stringify(options));
        if(options.backgroundColor !== undefined) {
            document.body.style.backgroundColor = options.backgroundColor;
        }
    };

    fin.desktop.main(userAppConfigArgs => {
     updateBackground(userAppConfigArgs);
    });
  
    let app = fin.Application.getCurrentSync();
    // If app is already running parameters are passed through the “run-requested” event
    app.addListener("run-requested", function(event) {
      if (event.userAppConfigArgs) {
        updateBackground(event.userAppConfigArgs);
      }
    });
  };

  window.addEventListener("DOMContentLoaded", event => {
    initOpenFinParamListener();
  });
  