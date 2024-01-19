// main
const mapInp = document.querySelector("#mapInput")

// setings
const settingsBtn = document.querySelector("#settings");
const settingsDiv = document.querySelector("#settingsTab");

// telnet
const telnetTabElem = document.querySelector(".telnet-controls-div");
const telnetTabBtn = document.querySelector("#telnetBtn");
const telnetTabImg = document.querySelector("#telnetImg");

telnetTabBtn.innerText = "Telnet"

function switchTab(tabname) {
    tabname()
}

let telnetTimeoutDelay = 200

function telnet() {
    telnetTabBtn.setAttribute("onclick", "switchTab(main)")

    // tab elem styling
    showTelnetTab()

    hideSettingsTab()
    settingsBtn.setAttribute("onclick", "switchTab(settings)")

    // tab btn styling
    telnetTabBtn.style.opacity = "0";
    
    console.log("gaming")
}

function main() {
    telnetTabBtn.setAttribute("onclick", "switchTab(telnet)")

    // tab elem styling
    hideTelnetTab()
    settingsBtn.setAttribute("onclick", "switchTab(settings)")
    hideSettingsTab()

    // tab btn styling
    telnetTabBtn.style.opacity = "0";
}

function settings() {
    telnetTabBtn.setAttribute("onclick", "switchTab(telnet)")
    settingsBtn.setAttribute("onclick", "switchTab(main)")

    showSettingsTab()

    hideTelnetTab()
    hideMainTabBottom()
}
