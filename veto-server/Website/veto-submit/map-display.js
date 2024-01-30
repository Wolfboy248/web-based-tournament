let canVeto = false;

async function main() {
  const maplistfile = await fetch("./maplist.json");
  const maplist = await maplistfile.json();
  console.log(maplist);
  const mapDisplay = document.getElementById("map-display");
  if (mapDisplay == undefined) return;

  const mapKeys = Object.keys(maplist);
  console.log(mapKeys);
  mapKeys.forEach((key) => {
    if (key == "sp") return;
    const map = maplist[key];

    //mapdiv
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("map");
    mapDiv.id = key + "-veto";

    //mapdiv img
    const mapDivImg = document.createElement("img");
    mapDivImg.src = `./maps/ch${map[1]}/${key}.jpg`;
    mapDivImg.alt = map[0];

    //mapdiv img container
    const mapDivImgContainer = document.createElement("div");

    mapDivImgContainer.appendChild(mapDivImg);

    //mapdiv p
    const mapDivP = document.createElement("p");
    mapDivP.innerHTML = map[0];

    //append all to mapdiv
    mapDiv.appendChild(mapDivImgContainer);
    mapDiv.appendChild(mapDivP);
    mapDivImg.style.position = "relative";
    mapDivImgContainer.addEventListener("click", async () => {
      if (!canVeto) return;
      var vetos = await (await fetch("/vetos.json")).json();
      var settings = await (await fetch("/settings.json")).json();
      var user = await (await fetch("/getuser")).json();
      if (user.personaname == settings.player1) {
        if (
          !vetos.player1.includes(key) &&
          !vetos.player2.includes(key) &&
          vetos.player1.length < settings.vetoLimit
        ) {
          console.log("Veto submitted:", map[0], key);
          const crossDiv = document.getElementById(key + "-veto");
          crossDiv.children[0].classList.add("crossed");
          canVeto = false;
          var re = await fetch("/veto", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ map: key }),
          });
          var data = await re.json();
          switch (data.result) {
            case "SUCCESS":
              canVeto = true;
              break;
            default:
              window.href = "/player";
              break;
          }
        } else if (vetos.player1.includes(key)) {
          console.log("Veto removed:", map[0], key);
          const crossDiv = document.getElementById(key + "-veto");
          crossDiv.children[0].classList.remove("crossed");
          canVeto = false;
          var re = await fetch("/veto", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ map: key }),
          });
          var data = await re.json();
          switch (data.result) {
            case "SUCCESS":
              canVeto = true;
              break;
            default:
              window.href = "/player";
              break;
          }
        }
      } else if (user.personaname == settings.player2) {
        if (
          vetos.player2.length < settings.vetoLimit &&
          !vetos.player1.includes(key) &&
          !vetos.player2.includes(key)
        ) {
          console.log("Veto submitted:", map[0], key);
          const crossDiv = document.getElementById(key + "-veto");
          crossDiv.children[0].classList.add("crossed");
          canVeto = false;
          var re = await fetch("/veto", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ map: key }),
          });
          var data = await re.json();
          switch (data.result) {
            case "SUCCESS":
              canVeto = true;
              break;
            default:
              window.href = "/player";
              break;
          }
        } else if (vetos.player2.includes(key)) {
          console.log("Veto removed:", map[0], key);
          const crossDiv = document.getElementById(key + "-veto");
          crossDiv.children[0].classList.remove("crossed");
          canVeto = false;
          var re = await fetch("/veto", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ map: key }),
          });
          var data = await re.json();
          switch (data.result) {
            case "SUCCESS":
              canVeto = true;
              break;
            default:
              window.href = "/player";
              break;
          }
        }
      } else {
        window.location.href = "/player";
      }
    });
    mapDisplay.appendChild(mapDiv);
  });
  crossout();
  canVeto = true;
}

async function crossout() {
  const vetos = await (await fetch("/vetos.json")).json();
  const settings = await (await fetch("/settings.json")).json();
  const user = await (await fetch("/getuser")).json();
  const maps = document.getElementsByClassName("map");
  const usernumber = user.personaname == settings.player1 ? 1 : 2;
  console.log(usernumber);
  for (let i = 0; i < maps.length; i++) {
    const element = maps[i];
    const div = element.children[0];
    const veto = element.id.split("-veto")[0];
    console.log(veto);
    if (vetos.player1.includes(veto) || vetos.player2.includes(veto)) {
      console.log(veto, "crossed");
      div.classList.add("crossed");
    }
    if (vetos["player" + (3 - usernumber)].includes(veto)) {
      div.classList.add("other");
    }
    if (!vetos.player1.includes(veto) && !vetos.player2.includes(veto)) {
      div.classList.remove("crossed");
      setTimeout(() => {
        div.classList.remove("other");
      }, 10);
    }
  }
}

main();

//websocket
const thingy = "ws://" + window.location.host + "/";
console.log(thingy);
const socket = new WebSocket(thingy);

socket.addEventListener("message", async (event) => {
  if (event.data == "change") {
    console.log("change");
    crossout();
  }
});
