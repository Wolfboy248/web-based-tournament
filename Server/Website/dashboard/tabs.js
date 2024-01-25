const main = document.querySelector("#mainControls");
const telnet = document.querySelector("#telnetControls");
const settings = document.querySelector("#settingsControls");

const mainBtn = document.querySelector("#mainBtn");
const telnetBtn = document.querySelector("#telnetBtn");
const settingsBtn = document.querySelector("#settingsBtn");

function switchTab(tab, tabBtn) {
    main.classList.add("hidden");
    telnet.classList.add("hidden");
    settings.classList.add("hidden");

    tab.classList.remove("hidden");

    mainBtn.classList.remove("selected");
    telnetBtn.classList.remove("selected");
    settingsBtn.classList.remove("selected");

    tabBtn.classList.add("selected");
}