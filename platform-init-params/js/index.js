const colorWell = document.getElementById('colorWell-init-params');
const links = document.getElementsByTagName("openfin-link");
let lastValue = "#FFFFFF";

const updateInitParam = (element, oldValue, newValue) => {
    let url = element.getAttribute('href');
    url = url.replace(oldValue, newValue);
    element.setAttribute('href', url);
};

colorWell.onchange = ()=> {
    let newValue = colorWell.value;
    console.log("New Color selected: " + newValue);
    for(let i = 0; i < links.length; i++) {
        updateInitParam(links[i], lastValue, newValue);        
    }
    lastValue = newValue;
};