function showTelnetTab() {
    const telnetTimeout = setInterval(telnetDel, telnetTimeoutDelay)
    function telnetDel() {
        telnetTabBtn.innerText = "Back"
        telnetTabBtn.style.opacity = "1";
        clearInterval(telnetTimeout)
    }

    telnetTabElem.style.left = "50%";
}

function hideTelnetTab() {
    const telnetTimeout = setInterval(telnetDel, telnetTimeoutDelay)
    function telnetDel() {
        telnetTabBtn.innerText = "Telnet"
        telnetTabBtn.style.opacity = "1";
        clearInterval(telnetTimeout)
    }

    telnetTabElem.style.left = "-50%";
}

function showSettingsTab() {
    settingsDiv.style.top = "240px";
}

function hideSettingsTab() {
    settingsDiv.style.top = "-50%";
}

function hideMainTabLeft() {
    mapInp.style.left = "-50%";
}