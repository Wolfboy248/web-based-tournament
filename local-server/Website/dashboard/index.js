const map = document.querySelector("#map");
const changemap = document.querySelector("#change-map");
const round1 = document.querySelector("#round1");
const round2 = document.querySelector("#round2");
const round3 = document.querySelector("#round3");
const rounddone = document.querySelector("#rounddone");
const match = document.querySelector("#match");
const info = document.querySelector("#info");
const timer = document.querySelector("#timer");
const randomizer = document.querySelector("#randomizer");
const reload = document.querySelector("#reload");
const telnetON = document.querySelector("#telnet-on");
const telnetOFF = document.querySelector("#telnet-off");
const telnetRESTART = document.querySelector("#telnet-restart");
const telnetSTATUS = document.querySelector("#telnet-status");
const player1NAME = document.querySelector("#player1NAME");
const player2NAME = document.querySelector("#player2NAME");
const changePlayer = document.querySelector("#change-player");
const resetData = document.querySelector("#resetData");
const timerInput = document.querySelector("#timerInput");
const changeTimer = document.querySelector("#changeTimer");
const commandTest = document.querySelector("#commandTest");
const commandInput = document.querySelector("#commandInput");
const commandDiv = document.querySelector("#commandDiv");
const msgInput = document.querySelector("#msgInput");
const ghostMsg = document.querySelector("#ghostMsg");
// const eventSource = new EventSource("/events");

// eventSource.addEventListener("tournamentStarted", (event) => {
//   console.log(event);
//   const eventData = JSON.parse(event.data);
//   console.log("tournament started: ", eventData);
// })

// eventSource.addEventListener("tournamentTimeSubmit", (e) => {
//   console.log("received")
//   const data = JSON.parse(e.data);
//   console.log(eventData + "HELLOOOOOOOOOOO");
//   data = data.replace(/[\r\n]/g, '');

//   let name = "";
//   let time = "";
//   const pairs = data.split(' ').filter(pair => pair.includes("="));
  
//   pairs.forEach(pair => {
//     const [key, value] = pair.split('=');
//     if (key === 'name') {
//       name = value;
//     } else if (key === 'time') {
//       time = value;
//     }
//   });
//   console.log(name);
//   console.log(time);
// })

async function send(msg) {
  fetch("/send-msg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });
}

async function setPlayerNames() {
  const data = await (await fetch("/data.json")).json();
  player1NAME.placeholder = data.match.player1;
  player2NAME.placeholder = data.match.player2;
  player1NAME.value = "";
  player2NAME.value = "";
}
setPlayerNames();

changemap.addEventListener("click", async () => {
  console.log(map.value);
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      match: {
        current_map: map.value,
      },
    }),
  });
});

round1.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        round: 1,
      },
    }),
  });
});
round2.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        round: 2,
      },
    }),
  });
});
round3.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        round: 3,
      },
    }),
  });
});
rounddone.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        round: 4,
      },
    }),
  });
});

info.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        mode: 1,
      },
    }),
  });
});
match.addEventListener("click", async () => {
  fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      settings: {
        mode: 2,
      },
    }),
  });
});

timer.addEventListener("click", async () => {
  fetch("/trigger-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "timer" }),
  });
});
randomizer.addEventListener("click", async () => {
  fetch("/trigger-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "randomizer" }),
  });
});

reload.addEventListener("click", () => {
  send("reload");
});

telnetON.addEventListener("click", () => {
  fetch("/telnet", { method: "POST" });
});
telnetOFF.addEventListener("click", () => {
  fetch("/telnet", { method: "DELETE" });
});
telnetRESTART.addEventListener("click", async () => {
  fetch("/telnet", { method: "DELETE" });
  setTimeout(() => {
    fetch("/telnet", { method: "POST" });
  }, 500);
});

changePlayer.addEventListener("click", async () => {
  await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      match: {
        player1: player1NAME.value,
        player2: player2NAME.value,
      },
    }),
  });
  setPlayerNames();
});

changeTimer.addEventListener("click", () => {
  if (
    timerInput.value != null &&
    timerInput.value != undefined &&
    timerInput.value > 0 &&
    parseInt(timerInput.value) != NaN
  ) {
    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        settings: {
          "timer-duration": parseInt(timerInput.value),
        },
      }),
    });
  }
});

commandTest.addEventListener("click", () => {
  console.log(commandInput.value);
  fetch("/telnet-send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msg: commandInput.value,
    }),
  });
  commandInput.value = "";
});

ghostMsg.addEventListener("click", () => {
  console.log(msgInput.value);
  fetch("/telnet-send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msg: "ghost_message " + msgInput.value,
    }),
  });
  msgInput.value = "";
});

commandInput.addEventListener("keyup", event => {
  if(event.key !== "Enter") return;
  commandTest.click();
  event.preventDefault();
});

msgInput.addEventListener("keyup", event => {
  if(event.key !== "Enter") return;
  ghostMsg.click();
  event.preventDefault();
});

resetData.addEventListener("click", () => {
  fetch("/data", { method: "DELETE" });
});

const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function (event) {
  let data = event.data;
  // console.log(event.data);

  if (data.includes("ffo_tourneyStart")) {
    console.log("tournament started!")
  }

  if (data.includes("ffo_newTime")) {
    data = data.replace(/[\r\n]/g, '');

    let name = "";
    let time = "";
    const pairs = data.split(' ').filter(pair => pair.includes("="));
    
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key === 'name') {
        name = value;
      } else if (key === 'time') {
        time = value;
      }
    });
    console.log(name);
    console.log(time);
  }

  switch (event.data) {
    case "telnet-connect":
      telnetSTATUS.style.backgroundColor = "green";
      commandDiv.style.display = "block";
      break;
    case "telnet-close":
      telnetSTATUS.style.backgroundColor = "red";
      commandDiv.style.display = "none";
      break;
    case "telnet-error":
      telnetSTATUS.style.backgroundColor = "red";
      commandDiv.style.display = "none";
      break;
    case "telnet-timeout":
      telnetSTATUS.style.backgroundColor = "red";
      commandDiv.style.display = "none";
      break;
  }
};
