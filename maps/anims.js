function showPlayers() {
    // loading screen stuff
    document.querySelector("#infoDiv").style.left = "115%";
    document.querySelector("#bg").style.opacity = "0";
    document.querySelector("#vetoDiv").style.left = "-15%";

    // playing screen stuff
    document.querySelector("#playingDiv").style.transitionDelay = "0.5s";
    document.querySelector("#playingDiv").style.opacity = "1";
  
    document.querySelector("#playing1BG").style.width = "100%";
    document.querySelector("#playing1BG").style.transitionDelay = "0.5s"
    document.querySelector("#playing1Name").style.transform = "translateY(-100%)";
    document.querySelector("#playing1Time").style.transform = "translateY(-200%)";
    document.querySelector("#playing1Name").style.opacity = "1";
    document.querySelector("#playing1Time").style.opacity = "1";
    document.querySelector("#playing1Div").style.transitionDelay = "0.5s";
    document.querySelector("#playing1Name").style.transitionDelay = "1s";
    document.querySelector("#playing1Time").style.transitionDelay = "1.1s";
  
    // second player
    document.querySelector("#playing2Div").style.transitionDelay = "0.5s";
    document.querySelector("#playing2Div").style.opacity = "1";
  
    document.querySelector("#playing2BG").style.transform = "translateX(0%)";
    document.querySelector("#playing2BG").style.transitionDelay = "0.5s"
    document.querySelector("#playing2Name").style.transform = "translateY(-100%)";
    document.querySelector("#playing2Time").style.transform = "translateY(-200%)";
    document.querySelector("#playing2Name").style.opacity = "1";
    document.querySelector("#playing2Time").style.opacity = "1";
    document.querySelector("#playing2Div").style.transitionDelay = "0.5s";
    document.querySelector("#playing2Name").style.transitionDelay = "1.3s";
    document.querySelector("#playing2Time").style.transitionDelay = "1.2s";
}

function showLoading() {
    // loading screen stuff
    document.querySelector("#infoDiv").style.left = "86%";
    document.querySelector("#bg").style.opacity = "1";
    document.querySelector("#vetoDiv").style.left = "12%";

    // playing screen stuff
    document.querySelector("#playing1BG").style.width = "0%";
    document.querySelector("#playing1Name").style.transform = "translateY(-50%)";
    document.querySelector("#playing1Time").style.transform = "translateY(-150%)";
    document.querySelector("#playing1Name").style.opacity = "0";
    document.querySelector("#playing1Time").style.opacity = "0";

    // second player
    document.querySelector("#playing2BG").style.transform = "translateX(110%)";
    document.querySelector("#playing2Name").style.transform = "translateY(-50%)";
    document.querySelector("#playing2Time").style.transform = "translateY(-150%)";
    document.querySelector("#playing2Name").style.opacity = "0";
    document.querySelector("#playing2Time").style.opacity = "0";
}