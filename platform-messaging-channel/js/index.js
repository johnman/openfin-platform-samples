const init = async () => {
  const version = document.getElementById("openfin-version");
  if (window.fin) {
    const runtimeVersion = await window.fin.System.getVersion();
    version.innerText = runtimeVersion;
  } else {
    version.innerText = "Not Applicable (you are running a browser)";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
