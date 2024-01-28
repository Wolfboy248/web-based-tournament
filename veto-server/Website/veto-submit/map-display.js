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
        case "NOLOGIN":
          window.location.href = "/auth/login";
          break;
        case "NOTPLAYING":
          window.location.href = "/player";
          break;
        case "SUCCESS":
          canVeto = true;
        case "VETOED":
          canVeto = true;
      }
    });
    mapDisplay.appendChild(mapDiv);
  });
  canVeto = true;
}

main();
