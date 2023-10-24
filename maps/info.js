// reset all things
document.querySelector("#r1Div").style.opacity = "0";
document.querySelector("#r2Div").style.opacity = "0";
document.querySelector("#r3Div").style.opacity = "0";
document.querySelector("#sep4").style.opacity = "0";
document.querySelector("#sep5").style.opacity = "0";

// enable shit
document.querySelector("#r1Div").style.opacity = "1";

fetch("info.json")
  .then((Response) => Response.json())
  .then((data) => {
    document.querySelector("#player1").innerText = data.player1;
    document.querySelector("#player2").innerText = data.player2;
    document.querySelector("#player1R1").innerText = data.player1;
    document.querySelector("#player2R1").innerText = data.player2;
    document.querySelector("#player1R2").innerText = data.player1;
    document.querySelector("#player2R2").innerText = data.player2;
    document.querySelector("#player1R3").innerText = data.player1;
    document.querySelector("#player2R3").innerText = data.player2;

    // actual pbs
    document.querySelector("#pbsP1").innerText = data.player1;
    document.querySelector("#pbsP2").innerText = data.player2;

    // round pbs
    document.querySelector("#r1P1PB").innerText = data.round1P1PB;
    document.querySelector("#r1P2PB").innerText = data.round1P2PB;

    document.querySelector("#r2P1PB").innerText = data.round2P1PB;
    document.querySelector("#r2P2PB").innerText = data.round2P2PB;

    document.querySelector("#r3P1PB").innerText = data.round3P1PB;
    document.querySelector("#r3P2PB").innerText = data.round3P2PB;

    // name of the thing
    document.querySelector("#logoText").innerText = data.name;
  });
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    console.log("YIPPEEEEEE!!!");
    window.open("/index.html", "_self");
  }

  if (event.key === "ArrowRight") {
    fetch("pGun.json")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.wr);
        document.querySelector("#wrTime").innerText = data.wr;
      });

    fetch("info.json")
      .then((Response) => Response.json())
      .then((data) => {
        document.querySelector("#player1").innerText = data.player1;
        document.querySelector("#player2").innerText = data.player2;
        document.querySelector("#player1R1").innerText = data.player1;
        document.querySelector("#player2R1").innerText = data.player2;
        document.querySelector("#player1R2").innerText = data.player1;
        document.querySelector("#player2R2").innerText = data.player2;
        document.querySelector("#player1R3").innerText = data.player1;
        document.querySelector("#player2R3").innerText = data.player2;

        // round pbs
        document.querySelector("#r1P1PB").innerText = data.round1P1PB;
        document.querySelector("#r1P2PB").innerText = data.round1P2PB;

        document.querySelector("#r2P1PB").innerText = data.round2P1PB;
        document.querySelector("#r2P2PB").innerText = data.round2P2PB;

        document.querySelector("#r3P1PB").innerText = data.round3P1PB;
        document.querySelector("#r3P2PB").innerText = data.round3P2PB;
      });
  }

  if (event.key === "1") {
    // reset all things
    document.querySelector("#r1Div").style.opacity = "0";
    document.querySelector("#r2Div").style.opacity = "0";
    document.querySelector("#r3Div").style.opacity = "0";
    document.querySelector("#sep4").style.opacity = "0";
    document.querySelector("#sep5").style.opacity = "0";

    // enable shit
    document.querySelector("#r1Div").style.opacity = "1";
  }

  if (event.key === "2") {
    // reset all things
    document.querySelector("#r1Div").style.opacity = "0";
    document.querySelector("#r2Div").style.opacity = "0";
    document.querySelector("#r3Div").style.opacity = "0";
    document.querySelector("#sep4").style.opacity = "0";
    document.querySelector("#sep5").style.opacity = "0";

    // enable shit
    document.querySelector("#r1Div").style.opacity = "1";
    document.querySelector("#sep4").style.opacity = "1";
    document.querySelector("#r2Div").style.opacity = "1";
  }

  if (event.key === "3") {
    // reset all things
    document.querySelector("#r1Div").style.opacity = "0";
    document.querySelector("#r2Div").style.opacity = "0";
    document.querySelector("#r3Div").style.opacity = "0";
    document.querySelector("#sep4").style.opacity = "0";
    document.querySelector("#sep5").style.opacity = "0";

    // enable shit
    document.querySelector("#r1Div").style.opacity = "1";
    document.querySelector("#r2Div").style.opacity = "1";
    document.querySelector("#r3Div").style.opacity = "1";
    document.querySelector("#sep4").style.opacity = "1";
    document.querySelector("#sep5").style.opacity = "1";
  }
});
