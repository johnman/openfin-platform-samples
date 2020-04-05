async function launchView(name) {
    let rootUrl = location.href.replace(location.pathname,'');
    rootUrl = rootUrl.replace('#','');

    let viewName = "view-" + name + "-" + Date.now();
    let url = rootUrl + 
        "/platform-autoshow/views/view-" +
        name +
        ".html";

    console.log("Window with View " + viewName + " is created");
    const platform = fin.Platform.getCurrentSync();

    await platform.createWindow({
        contextMenu: true,
        autoShow: false,
        layout: {
            content: [
                {
                    type: "stack",
                    content: [
                        {
                            type: "component",
                            componentName: "view",
                            componentState: {
                                name: viewName,
                                url: url
                            }
                        }
                    ]
                }
            ]
        }
    });

    return viewName;
}

async function launchWindow(name) {
    let windowName = "window-" + name + "-" + Date.now();
    let rootUrl = location.href.replace(location.pathname,'');
    rootUrl = rootUrl.replace('#','');
    
    async function createWindow() {
        let url = rootUrl + 
            "/platform-autoshow/windows/window-" +
            name +
            ".html";

        return fin.Platform.getCurrentSync().applySnapshot({
            windows: [
                {
                    defaultWidth: 300,
                    defaultHeight: 300,
                    defaultLeft: 200,
                    defaultTop: 200,
                    name: windowName,
                    saveWindowState: false,
                    autoShow: false,
                    url: url,
                    contextMenu: true
                }
            ]
        });
    }

    await createWindow();
    return windowName;
}

async function show(name) {
    let identity = { uuid: fin.me.identity.uuid, name: name };
    let win;

    if (name.indexOf("window") === 0) {
        // it is a window
        win = fin.Window.wrapSync(identity);

    } else if (name.indexOf("view") === 0) {
        // it is a view
        const view = fin.View.wrapSync(identity);
        win = await view.getCurrentWindow();
    } else {
        console.log("Something has gone wrong as only views and windows should be requested.");
    }

    if (win !== undefined) {
        await win.show();
    }
}

//simulating some logic firing after a period of time
setTimeout(async () => {
    let viewName = await launchView('hidden-show');
    let windowName = await launchWindow('hidden-show');

    setTimeout(() => {
        // received data needed for the view
        show(viewName);
    }, 2000);

    setTimeout(() => {
        // received data needed for the window
        show(windowName);
    }, 4000);

    await launchView('self-show');
    await launchWindow('self-show');
}, 5000);

