const loadingScreen = document.querySelector("#loadingScreen");
const chapters = document.querySelector("#chapters");
const body = document.querySelector("#body");
const bg = document.querySelector("#bg");
const h1 = document.querySelector("#h1");

var currentMap

// my god this is a stupid way of doing this but i'm too tired to find a better way
// maybe someone can use the currentMap variable in info.js to know when to update player pbs and other data we may pull from
// board.portal2.sr. That way we don't have to copy and paste this shit over and over
document.querySelector("#intro3").addEventListener("click", () => {
    currentMap = "sp_a1_intro3";
    console.log(currentMap);
    body.style.backgroundColor = "black"
    loadingScreen.style.opacity = "1";
    loadingScreen.style.zIndex = "100";
    chapters.style.opacity = "0";
    chapters.style.zIndex = "0";
    loadingScreen.style.transitionDelay = "0.4s";

    // changing the loading screen
    bg.style.backgroundImage = "url(images/ch1/Map_sp_a1_intro3.jpg)";
    h1.innerText = "Portal Gun";
    // fetching correct json
    fetch("pGun.json")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.wr);
        document.querySelector("#wrTime").innerText = data.wr;
      });

    // fetching correct times
    grabTime("SlimeDiamond", "sp_a1_intro3", "#P1pb");
    grabTime2("AlexAdvDev", "sp_a1_intro3", "#P2pb");
});

document.querySelector("#intro4").addEventListener("click", () => {
    currentMap = "sp_a1_intro4";
    console.log(currentMap);
    body.style.backgroundColor = "black"
    loadingScreen.style.opacity = "1";
    loadingScreen.style.zIndex = "100";
    chapters.style.opacity = "0";
    chapters.style.zIndex = "0";
    loadingScreen.style.transitionDelay = "0.4s";

    // changing the loading screen
    bg.style.backgroundImage = "url(images/ch1/Map_sp_a1_intro4.jpg)";
    h1.innerText = "Smooth Jazz";
    // fetching correct json
    fetch("smoothJazz.json")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.wr);
        document.querySelector("#wrTime").innerText = data.wr;
      });
    // fetching correct times
    grabTime("SlimeDiamond", "sp_a1_intro4", "#P1pb");
    grabTime2("AlexAdvDev", "sp_a1_intro4", "#P2pb");
});