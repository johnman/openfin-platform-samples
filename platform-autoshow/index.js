window.addEventListener("DOMContentLoaded", event => {
    const send = document.getElementById("send-message");
    const show = document.getElementById("show");
    const launchWindowOne = document.getElementById("launch-window-one");
    const launchViewOne = document.getElementById("launch-view-one");
    const windowSelect = document.getElementById("launched-windows-select");
    const shownWindows = {};
    let rootUrl = location.href.replace(location.pathname,'');
    rootUrl = rootUrl.replace('#','');
    
    function updateWindowSelect(name) {
        windowSelect.options[windowSelect.options.length] = new Option(
            name,
            name
        );
        if (send.disabled) {
            send.disabled = false;
        }
        let selected = windowSelect.options[windowSelect.selectedIndex].value;

        show.disabled = shownWindows[selected] !== undefined;
    }

    async function launchView(name) {
        let viewName = "view-" + name + "-" + Date.now();
        let url = rootUrl +
            "/platform-autoshow/views/view-" +
            name +
            ".html";

        console.log("Window with View " + viewName + "  created");
        updateWindowSelect(viewName);
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
    }

    function launchWindow(name) {
        let windowName = "window-" + name + "-" + Date.now();

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

        createWindow()
            .then(() => {
                console.log("Window " + windowName + " is created");
                updateWindowSelect(windowName);
            })
            .catch(err => console.log(err));
    }

    send.onclick = () => {
        if (windowSelect.options.length > 0) {
            let name = windowSelect.options[windowSelect.selectedIndex].value;
            let identity = { uuid: fin.me.identity.uuid, name: name };
            console.log("Sending message to: " + JSON.stringify(identity));
            fin.InterApplicationBus.send(
                identity,
                "sample-topic",
                "From Main Window: " + Date.now()
            )
                .then(() => console.log("Message sent"))
                .catch(err => console.log(err));
        }
    };

    show.onclick = async () => {
        let name = windowSelect.options[windowSelect.selectedIndex].value;
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
            console.log("Something has gone wrong as only views and windows should be listed.");
        }

        if (win !== undefined) {
            await win.show();
            show.disabled = true;
            shownWindows[name] = true;
        }
    };

    launchWindowOne.onclick = event => {
        event.preventDefault();
        launchWindow("one");
    };

    launchViewOne.onclick = async event => {
        event.preventDefault();
        launchView("one");
    };

    windowSelect.addEventListener("change", ev => {
        ev.preventDefault();
        let id = ev.currentTarget.value;
        show.disabled = shownWindows[id] !== undefined;
    });
});