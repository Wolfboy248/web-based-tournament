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
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("map");
    mapDiv.id = key;
    mapDiv.innerHTML = `
        <img src="./maps/ch${map[1]}/${key}.jpg" alt="${map[0]}" />
        <p>${map[0]}</p>
        `;
    mapDiv.addEventListener("click", async () => {
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
  canVeto = true;
}

main();
