window.addEventListener('DOMContentLoaded', async (event) => {
    const save = document.getElementById("save");
    const apply = document.getElementById("apply");
    const dataToSave = document.getElementById("data-to-save");
    const retrieved = document.getElementById("retrieved");
    const applyContainer = document.getElementById("apply-container");
    let snapShot;
    let data = await fin.me.getOptions();
    if(data.customData !== undefined) {
        retrieved.innerText = data.customData;
    }
    
    save.onclick = async ()=> {
        await fin.me.updateOptions({"customData":dataToSave.value});
        let platform = fin.Platform.getCurrentSync();
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