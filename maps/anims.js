function showPlayers() {
  // loading screen stuff
  document.querySelector("#infoDiv").style.left = "115%";
  document.querySelector("#bg").style.opacity = "0";
  document.querySelector("#vetoDiv").style.left = "-15%";

  // playing screen stuff
  document.querySelector("#playingDiv").style.transitionDelay = "0.5s";
  document.querySelector("#playingDiv").style.opacity = "1";

  document.querySelector("#playing1BG").style.width = "100%";
  document.querySelector("#playing1BG").style.transitionDelay = "0.5s";
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
  document.querySelector("#playing2BG").style.transitionDelay = "0.5s";
  document.querySelector("#playing2Name").style.transform = "translateY(-100%)";
  document.querySelector("#playing2Time").style.transform = "translateY(-200%)";
  document.querySelector("#playing2Name").style.opacity = "1";
  document.querySelector("#playing2Time").style.opacity = "1";
  document.querySelector("#playing2Div").style.transitionDelay = "0.5s";
  document.querySelector("#playing2Name").style.transitionDelay = "1.3s";
  document.querySelector("#playing2Time").style.transitionDelay = "1.2s";

  // randomizer
  document.querySelector("#randomizer").style.left = "-20%";

  // obs animations
  document.querySelector("#obs-anim").style.opacity = "0";
  document.querySelector("#obs-anim").style.transitionDelay = "0.8s";
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
  document.querySelector("#obs-anim").style.opacity = "1";
}

function showRandomizer() {
  document.querySelector("#randomizer").style.left = "12%";
}

let lightBG = "rgba(166, 166, 166, 0.153)";
let darkBG = "rgba(0, 0, 0, 0.5)";
let darkBG2 = "rgba(0, 0, 0, 0.2)";
let darkestShadow = "black";

function LightMode() {
  document.querySelector("#infoDiv").style.backgroundColor = lightBG;
  document.querySelector("#vetoDiv").style.backgroundColor = lightBG;
  document.querySelector("#borderbox").style.backgroundColor = "rgba(166, 166, 166, 0.353)";

  document.querySelector("#infoDiv").style.boxShadow = "0px 0px 10px " + lightBG;
  document.querySelector("#vetoDiv").style.boxShadow = "0px 0px 10px " + lightBG;
  document.querySelector("#borderbox").style.boxShadow = "0px 0px 10px rgba(166, 166, 166, 0.253)";
}

function DarkMode() {
  document.querySelector("#infoDiv").style.backgroundColor = darkBG;
  document.querySelector("#vetoDiv").style.backgroundColor = darkBG;
  document.querySelector("#borderbox").style.backgroundColor = darkBG2;

  document.querySelector("#infoDiv").style.boxShadow = "0px 0px 10px " + darkestShadow;
  document.querySelector("#vetoDiv").style.boxShadow = "0px 0px 10px " + darkestShadow;
  document.querySelector("#borderbox").style.boxShadow = "0px 0px 10px " + darkestShadow;
}

DarkMode()