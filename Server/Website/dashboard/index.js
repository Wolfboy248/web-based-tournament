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
  fetch("/set-map/" + map.value, {
    method: "POST",
  });
});

round1.addEventListener("click", async () => {
  fetch("set-round/1", { method: "POST" });
});
round2.addEventListener("click", async () => {
  fetch("set-round/2", { method: "POST" });
});
round3.addEventListener("click", async () => {
  fetch("set-round/3", { method: "POST" });
});
rounddone.addEventListener("click", async () => {
  fetch("set-round/4", { method: "POST" });
});
info.addEventListener("click", async () => {
  fetch("set-mode/1", { method: "POST" });
});
match.addEventListener("click", async () => {
  fetch("set-mode/2", { method: "POST" });
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
  fetch("/change-player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      player1: player1NAME.value,
      player2: player2NAME.value,
    }),
  });
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
