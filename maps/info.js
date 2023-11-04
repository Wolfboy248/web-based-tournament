let maplist = {};
async function grabTime(player, map) {
  const file = "https://board.portal2.sr/profile/" + player + "/json";
  const response = await fetch(file);
  const data = await response.json();
  let time = 0.0;
  let s = "";
  console.log(data);
  if (data.userData == null) {
    s = "Invalid Player";
    return s;
  }
  if (maplist[map] == undefined) {
    s = "Invalid Map";
    return s;
  }
  const maps = data.times.SP.chambers.chamberOrderedByDate;
  console.log(maps);
  console.log(maplist[map][2]);
  console.log(maps[maplist[map][2]]);
  if (maps[maplist[map][2]].score != undefined) {
    time = maps[maplist[map][2]].score / 100;
  } else {
    console.log("No time");
    s = "No time";
    return s;
  }
  s = time;
  if (time / 60 >= 1) {
    s = Math.floor(time / 60) + ":" + Math.round((time % 60) * 100) / 100;
  }
  return s;
}
async function grabWr(map) {
  const file = "https://board.portal2.sr/chamber/" + maplist[map][2] + "/json";
  const response = await fetch(file);
  const data = await response.json();
  let time = 0.0;
  Object.keys(data).forEach((key) => {
    if (data[key].scoreData.playerRank == 1) {
      time = data[key].scoreData.score / 100;
    }
  });
  s = time;
  if (time / 60 >= 1) {
    s = Math.floor(time / 60) + ":" + Math.round((time % 60) * 100) / 100;
  }
  return s;
}
async function main() {
  const mapslistJSON = await fetch("./maplist.json");
  maplist = await mapslistJSON.json();

  // reset all things
  document.querySelector("#r1Div").style.opacity = "0";
  document.querySelector("#r2Div").style.opacity = "0";
  document.querySelector("#r3Div").style.opacity = "0";
  document.querySelector("#sep4").style.opacity = "0";
  document.querySelector("#sep5").style.opacity = "0";

  // enable shit
  document.querySelector("#r1Div").style.opacity = "1";

  const infoJSON = await fetch("info.json");
  const info = await infoJSON.json();

  //mapname and chapter
  document.querySelector("#mapname").innerText = maplist[info.current_map][0];
  document.querySelector("#chaptername").innerText =
    "Chapter " +
    maplist[info.current_map][1] +
    " - " +
    maplist.sp[maplist[info.current_map][1] - 1];

  //background
  const bg = document.querySelector("#bg");
  const bgImage =
    "./images/ch" +
    maplist[info.current_map][1] +
    "/" +
    info.current_map +
    ".jpg";
  console.log(bgImage);
  bg.style.backgroundImage = "url(" + bgImage + ")";

  // document.querySelector("#playerNames").innerText = info.player1 + " & " + info.player2; // old thing
  document.querySelector("#player1").innerText = info.player1;
  document.querySelector("#player2").innerText = info.player2;
  document.querySelector("#player1R1").innerText = info.player1;
  document.querySelector("#player2R1").innerText = info.player2;
  document.querySelector("#player1R2").innerText = info.player1;
  document.querySelector("#player2R2").innerText = info.player2;
  document.querySelector("#player1R3").innerText = info.player1;
  document.querySelector("#player2R3").innerText = info.player2;
  document.querySelector("#playing1Name").innerText = info.player1;
  document.querySelector("#playing2Name").innerText = info.player2;

  // actual pbs
  // document.querySelector("#pbsP1").innerText = info.player1; // more old stuff
  // document.querySelector("#pbsP2").innerText = info.player2;

  // round pbs

  Object.keys(info).forEach((element) => {
    if (info[element] == 9999) {
      info[element] = "N/A";
    }
  });

  document.querySelector("#r1P1PB").innerText = info.round1P1PB;
  document.querySelector("#r1P2PB").innerText = info.round1P2PB;

  document.querySelector("#r2P1PB").innerText = info.round2P1PB;
  document.querySelector("#r2P2PB").innerText = info.round2P2PB;

  document.querySelector("#r3P1PB").innerText = info.round3P1PB;
  document.querySelector("#r3P2PB").innerText = info.round3P2PB;

  // round pbs in player thingy playing thingy lmao
  document.querySelector("#playing1Time").innerText = info.round1P1PB;
  document.querySelector("#playing2Time").innerText = info.round1P2PB;

  // name of the thing
  document.querySelector("#logoText").innerText = info.name;

  //original pbs and wr
  document.querySelector("#P1pb").innerText = await grabTime(
    info.player1,
    info.current_map
  );
  document.querySelector("#P2pb").innerText = await grabTime(
    info.player2,
    info.current_map
  );
  document.querySelector("#wrTime").innerText = await grabWr(info.current_map);
  window.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      console.log("YIPPEEEEEE!!!");
      window.open("/index.html", "_self");
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

      // switching player round pbs in the thingythingthing
      document.querySelector("#playing1Time").innerText = info.round1P1PB;
      document.querySelector("#playing2Time").innerText = info.round1P2PB;
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

      // switching player round pbs in the thingythingthing
      document.querySelector("#playing1Time").innerText = info.round2P1PB;
      document.querySelector("#playing2Time").innerText = info.round2P2PB;
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

      // switching player round pbs in the thingythingthing
      document.querySelector("#playing1Time").innerText = info.round3P1PB;
      document.querySelector("#playing2Time").innerText = info.round3P2PB;
    }

    if (event.key === " ") {
      toggle();
    }
  });
}

// switching from loading screen thing to players screen thing
var toggled = false;
async function toggle() {
  if (!toggled) {
    toggled = true;
    const infoJSON = await fetch("info.json");
    const info = await infoJSON.json();
    Object.keys(info).forEach((element) => {
      if (info[element] == 9999) {
        info[element] = "N/A";
      }
    });

    showPlayers();
  } else if (toggled) {
    toggled = false;

    const infoJSON = await fetch("info.json");
    const info = await infoJSON.json();
    Object.keys(info).forEach((element) => {
      if (info[element] == 9999) {
        info[element] = "N/A";
      }
    });
    document.querySelector("#r1P1PB").innerText = info.round1P1PB;
    document.querySelector("#r1P2PB").innerText = info.round1P2PB;

    document.querySelector("#r2P1PB").innerText = info.round2P1PB;
    document.querySelector("#r2P2PB").innerText = info.round2P2PB;

    document.querySelector("#r3P1PB").innerText = info.round3P1PB;
    document.querySelector("#r3P2PB").innerText = info.round3P2PB;

    // round pbs in player thingy playing thingy lmao
    document.querySelector("#playing1Time").innerText = info.round1P1PB;
    document.querySelector("#playing2Time").innerText = info.round1P2PB;
    showLoading();
  }

  while (toggled) {
    await new Promise((r) => setTimeout(r, 5000));
    console.log("refresh");
    const infoJSON = await fetch("info.json");
    const info = await infoJSON.json();
    Object.keys(info).forEach((element) => {
      if (info[element] == 9999) {
        info[element] = "N/A";
      }
    });
    document.querySelector("#playing1Time").innerText = info.round1P1PB;
    document.querySelector("#playing2Time").innerText = info.round1P2PB;
  }
}

async function vetos() {
  const mapslistJSON = await fetch("./maplist.json");
  maplist = await mapslistJSON.json();

  const vetoDiv = document.querySelector("#vetoDiv");
  const vetosJSON = await fetch("vetos.json");
  const vetos = await vetosJSON.json();
  vetos.p1vetos.forEach((map) => {
    vetoDiv.innerHTML += `<span class="veto-map">${maplist[map][0]}</span>`;
  });
  vetos.p2vetos.forEach((map) => {
    console.log(map);
    vetoDiv.innerHTML += `<span class="veto-map">${maplist[map][0]}</span>`;
  });
}

main();
vetos();
