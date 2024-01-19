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

async function send(msg) {
  fetch("/send-msg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });
}

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

changePlayer.addEventListener("click", () => {
  fetch("/data", {
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

resetData.addEventListener("click", () => {
  fetch("/data", { method: "DELETE" });
});

const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function (event) {
  console.log(event.data);
  switch (event.data) {
    case "telnet-connect":
      telnetSTATUS.style.backgroundColor = "green";
      break;
    case "telnet-close":
      telnetSTATUS.style.backgroundColor = "red";
      break;
    case "telnet-error":
      telnetSTATUS.style.backgroundColor = "red";
      break;
    case "telnet-timeout":
      telnetSTATUS.style.backgroundColor = "red";
      break;
  }
};
