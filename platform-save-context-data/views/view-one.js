window.addEventListener('DOMContentLoaded', async (event) => {
    const save = document.getElementById("save");
    const apply = document.getElementById("apply");
    const dataToSave = document.getElementById("data-to-save");
    const retrieved = document.getElementById("retrieved");
    const applyContainer = document.getElementById("apply-container");
    let snapShot;

    await fin.me.on('host-context-changed', data => {
        console.log("Host context changed", data);
    });
    let platform = fin.Platform.getCurrentSync();
    let context = await platform.getWindowContext();

    if(context !== undefined && context !== null && context.dataToSave !== undefined) {
        retrieved.innerText = context.dataToSave;
    }
    
    save.onclick = async ()=> {
        let platform = fin.Platform.getCurrentSync();
        await platform.setWindowContext({ dataToSave:dataToSave.value });
        snapShot = await platform.getSnapshot();
        applyContainer.style.display = "unset";
    };

    apply.onclick = async ()=> {
        if(snapShot !== undefined) {
            let platform = fin.Platform.getCurrentSync();
            await platform.applySnapshot(snapShot, {closeExistingWindows: true});
        }
    }
});