const map = document.querySelector("#map");
const changemap = document.querySelector("#change-map");
const noround = document.querySelector("#no-round");
const round1 = document.querySelector("#round1");
const round2 = document.querySelector("#round2");
const round3 = document.querySelector("#round3");
const match = document.querySelector("#match");
const info = document.querySelector("#info");
const timer = document.querySelector("#timer");
const randomizer = document.querySelector("#randomizer");

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

noround.addEventListener("click", async () => {
  fetch("set-round/0", { method: "POST" });
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
    body: JSON.stringify("randomizer"),
  });
});
