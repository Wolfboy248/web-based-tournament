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
    mapDiv.id = key;

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
      var vetostate = await (await fetch("/vetostate.json")).json();
      var settings = await (await fetch("/settings.json")).json();
      var user = await (await fetch("/getuser")).json();
      if (user.personaname == settings.player1) {
        if (vetostate[key] == 0) {
          console.log("Veto submitted:", map[0], key);
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
        } else if (vetostate[key] == 1) {
          console.log("Veto removed:", map[0], key);
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
        if (vetostate[key] == 0) {
          console.log("Veto submitted:", map[0], key);
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
        } else if (vetostate[key] == 2) {
          console.log("Veto removed:", map[0], key);
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
  const maps = document.getElementsByClassName("map");
  crossout();
  canVeto = true;
}

async function crossout() {
  const vetostate = await (await fetch("/vetostate.json")).json();
  const settings = await (await fetch("/settings.json")).json();
  const user = await (await fetch("/getuser")).json();
  const maps = document.getElementsByClassName("map");
  const usernumber = user.personaname == settings.player1 ? 1 : 2;
  console.log(usernumber);
  for (let i = 0; i < maps.length; i++) {
    const element = maps[i];
    const div = element.children[0];
    if (vetostate[element.id] != 0) {
      div.classList.add("crossed");
    }
    if (vetostate[element.id] != usernumber) {
      div.classList.add("other");
    }
    if (vetostate[element.id] == 0) {
      div.classList.remove("crossed");
      div.classList.remove("other");
    }
  }
}

main();

//websocket
const thingy = "wss://" + window.location.host + "/";
console.log(thingy);
const socket = new WebSocket(thingy);

socket.addEventListener("message", async (event) => {
  if (event.data == "change") {
    console.log("change");
    crossout();
  }
});
