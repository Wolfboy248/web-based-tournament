let maplist;

async function grabTime(player, map) {
  let data = await fetchFile("./data.json");
  const file = "https://board.portal2.sr/profile/" + player + "/json";
  console.log(file);
  const fileData = await fetchFile(file);
  let time = 0.0;
  let s = "";
  if (fileData.userData == null) {
    s = "Invalid Player";
    return s;
  }
  if (maplist[map] == undefined) {
    s = "Invalid Map";
    return s;
  }
  const maps = fileData.times.SP.chambers.chamberOrderedByDate;
  if (maps[maplist[map][2]].score != undefined) {
    time = maps[maplist[map][2]].score / 100;
  } else {
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
  let data = await fetchFile("./data.json");
  const file = "https://board.portal2.sr/chamber/" + maplist[map][2] + "/json";
  const fileData = await fetchFile(file);
  let time = 0.0;
  Object.keys(fileData).forEach((key) => {
    if (fileData[key].scoreData.playerRank == 1) {
      time = fileData[key].scoreData.score / 100;
    }
  });

  return convertToTime(time);
}

async function main() {
  maplist = await fetchFile("./maplist.json");
  //messages
  const socket = new WebSocket("ws://localhost:8080");

  socket.onmessage = function (event) {
    console.log(event.data);
    switch (event.data) {
      case "reload":
        location.reload();
        break;
      case "datachange":
        console.log("change");
        dataUpdate();
        break;
      case "statechange":
        stateUpdate();
        break;
      case "showtimer":
        timer();
        break;
      case "randomizer":
        randomize();
        break;
    }
  };

  //mapname and chapter
  dataUpdate();
  stateUpdate();
  vetos();
  let data = await fetchFile("./data.json");
  window.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      window.open(
        "http://localhost:3000/dashboard",
        "Popup Window",
        "height=450,width=600"
      );
    }

    if (event.key === "t") {
      lightModeToggle();
    }
  });
}

var lightModeToggled = false;
async function lightModeToggle() {
  if (!lightModeToggled) {
    lightModeToggled = true;

    LightMode();
  } else if (lightModeToggled) {
    lightModeToggled = false;

    DarkMode();
  }
}

// switching from loading screen thing to players screen thing

async function vetos() {
  let data = await fetchFile("./data.json");

  const vetoDiv = document.querySelector("#vetoDiv");
  if (data.vetos.p1vetos.length > 0) {
    vetoDiv.innerHTML += `<span class="veto-player">${data.match.player1} vetoed:</span>`;
  } else {
    vetoDiv.innerHTML += `<span class="veto-player">${data.match.player2} didn't submit any vetos</span>`;
  }
  data.vetos.p1vetos.forEach((map) => {
    vetoDiv.innerHTML += `<span class="veto-map">${maplist[map][0]}</span>`;
  });
  if (data.vetos.p2vetos.length > 0) {
    vetoDiv.innerHTML += `<span class="veto-player">${data.match.player2} vetoed:</span>`;
  } else {
    vetoDiv.innerHTML += `<span class="veto-player">${data.match.player2} didn't submit any vetos</span>`;
  }
  data.vetos.p2vetos.forEach((map) => {
    vetoDiv.innerHTML += `<span class="veto-map">${maplist[map][0]}</span>`;
  });
}

async function dataUpdate() {
  let data = await fetchFile("./data.json");
  //mapname and chapter
  document.querySelector("#mapname").innerText =
    maplist[data.match.current_map][0];
  document.querySelector("#chaptername").innerText =
    "Chapter " +
    maplist[data.match.current_map][1] +
    " - " +
    maplist.sp[maplist[data.match.current_map][1] - 1];

  //background
  const bg = document.querySelector("#bg");
  const bgImage =
    "./maps/ch" +
    maplist[data.match.current_map][1] +
    "/" +
    data.match.current_map +
    ".jpg";
  bg.style.backgroundImage = "url(" + bgImage + ")";

  //basic info
  document.querySelector("#player1").innerText = data.match.player1;
  document.querySelector("#player2").innerText = data.match.player2;
  document.querySelector("#player1R1").innerText = data.match.player1;
  document.querySelector("#player2R1").innerText = data.match.player2;
  document.querySelector("#player1R2").innerText = data.match.player1;
  document.querySelector("#player2R2").innerText = data.match.player2;
  document.querySelector("#player1R3").innerText = data.match.player1;
  document.querySelector("#player2R3").innerText = data.match.player2;
  document.querySelector("#playing1Name").innerText = data.match.player1;
  document.querySelector("#playing2Name").innerText = data.match.player2;

  // name of the thing
  document.querySelector("#logoText").innerText = data.match.name;

  //round pbs
  document.querySelector("#r1P1PB").innerText = convertToTime(
    data.match.round1P1PB
  );
  document.querySelector("#r1P2PB").innerText = convertToTime(
    data.match.round1P2PB
  );

  document.querySelector("#r2P1PB").innerText = convertToTime(
    data.match.round2P1PB
  );
  document.querySelector("#r2P2PB").innerText = convertToTime(
    data.match.round2P2PB
  );

  document.querySelector("#r3P1PB").innerText = convertToTime(
    data.match.round3P1PB
  );
  document.querySelector("#r3P2PB").innerText = convertToTime(
    data.match.round3P2PB
  );

  //live pb
  document.querySelector("#playing1Time").innerText = convertToTime(
    data.match["round" + data.settings.round + "P1PB"]
  );
  console.log(
    data.match["round" + data.settings.round + "P1PB"],
    "round" + data.settings.round + "P1PB"
  );
  document.querySelector("#playing2Time").innerText = convertToTime(
    data.match["round" + data.settings.round + "P2PB"]
  );

  //original pbs and wr
  grabTime(data.match.player1.replaceAll(" ", ""), data.match.current_map).then(
    (time) => {
      document.querySelector("#P1pb").innerText = convertToTime(time);
    }
  );
  grabTime(data.match.player2.replaceAll(" ", ""), data.match.current_map).then(
    (time) => {
      document.querySelector("#P2pb").innerText = convertToTime(time);
    }
  );
  grabWr(data.match.current_map).then((time) => {
    document.querySelector("#wrTime").innerText = convertToTime(time);
  });
}

async function stateUpdate() {
  let data = await fetchFile("./data.json");
  // reset all things
  console.log("round: " + data.settings.round);
  document.querySelector("#r1Div").style.opacity = "0";
  document.querySelector("#r2Div").style.opacity = "0";
  document.querySelector("#r3Div").style.opacity = "0";
  document.querySelector("#sep4").style.opacity = "0";
  document.querySelector("#sep5").style.opacity = "0";

  if (data.settings.round >= 2) {
    document.querySelector("#r1Div").style.opacity = "1";
  }

  if (data.settings.round >= 3) {
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

  if (data.settings.round >= 4) {
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
  if (data.settings.mode == 1) {
    console.log("info");
    showLoading();
  } else if (data.settings.mode == 2) {
    console.log("player");
    showPlayers();
  }
}

async function fetchFile(file) {
  const JSON = await fetch(file);
  const json = await JSON.json();
  return json;
}

function convertToTime(time) {
  if (time == 9999 || time == undefined) return "DNF";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = (time % 1).toFixed(2);

  if (minutes == 0) {
    console.log("test");
    return `${seconds.toString().padStart(1, "0")}.${milliseconds
      .toString()
      .slice(2)
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(1, "0")}.${milliseconds
    .toString()
    .slice(2)
    .padStart(2, "0")}`;
}

async function timer() {
  //setup
  let info = await fetchFile("./data.json");
  var timeleft = info.settings["timer-duration"];
  let minutes = Math.floor(timeleft / 60);
  let extraSeconds = timeleft % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  document.getElementById("countdown").innerText = minutes + ":" + extraSeconds;
  fetch("telnet-send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msg: "ghost_message Time Starts now" }),
  });

  //actual timer
  var Timer = setInterval(function () {
    let minutes = Math.floor((timeleft - 1) / 60);
    let extraSeconds = (timeleft - 1) % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    document.getElementById("countdown").innerText =
      minutes + ":" + extraSeconds;
    timeleft -= 1;
    if (timeleft <= 0) {
      clearInterval(Timer);

      fetch("telnet-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg: "ghost_message Time is up! Finish last run",
        }),
      });

      setTimeout(function () {
        document.getElementById("countdown").style.width = "350px";
        document.getElementById("countdown").style.color =
          "rgba(255, 255, 255, 0)";
      }, 400);
      setTimeout(function () {
        document.getElementById("countdown").innerText = "Times up!";
        document.getElementById("countdown").style.color =
          "rgba(255, 255, 255, 1)";
        setTimeout(() => {
          document.querySelector("#countdown").style.top = "-6%";
        }, 10000);
      }, 1000);
    }
  }, 1000);
  document.querySelector("#countdown").style.top = "4%";
}

main();
