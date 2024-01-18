// telnet
const telnetTabElem = document.querySelector(".telnet-controls-div");
const telnetTabBtn = document.querySelector("#telnetBtn");
const telnetTabImg = document.querySelector("#telnetImg");

telnetTabImg.style.position = "relative"
telnetTabImg.style.opacity = "1"

function switchTab(tab) {
    tab()
}

let telnetTimeoutDelay = 200

function telnet() {
    telnetTabBtn.setAttribute("onclick", "switchTab(main)")

    const telnetTimeout = setInterval(telnetDel, telnetTimeoutDelay)
    function telnetDel() {
        telnetTabBtn.innerText = ""
        telnetTabBtn.style.opacity = "1";
        telnetTabImg.style.opacity = "1";
        telnetTabImg.style.position = "relative";
        clearInterval(telnetTimeout)
    }

    // tab elem styling
    telnetTabElem.style.left = "50%";

    // tab btn styling
    telnetTabBtn.style.opacity = "0";
    
    console.log("gaming")
}

function main() {
    telnetTabBtn.setAttribute("onclick", "switchTab(telnet)")

    const telnetTimeout = setInterval(telnetDel, telnetTimeoutDelay)
    function telnetDel() {
        telnetTabBtn.innerText = "Telnet"
        telnetTabBtn.style.opacity = "1";
        telnetTabImg.style.opacity = "0";
        telnetTabImg.style.position = "absolute";
        clearInterval(telnetTimeout)
    }

    // tab elem styling
    telnetTabElem.style.left = "-50%";

    // tab btn styling
    telnetTabBtn.style.opacity = "0";
}