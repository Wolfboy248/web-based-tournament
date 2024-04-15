const scoreboard = document.querySelector("#scoreboard");
const scoreboardTitle = document.querySelector("#scoreboardTitle");
const positionsDiv = document.querySelector("#positionsDiv");
const devBtnsDiv = document.querySelector("#devBtns");
const timeInp = document.querySelector("#timeInp");
const currMap = document.querySelector("#currMap");

const socket = new WebSocket("ws://localhost:8080");

function updateMap(map) {
    currMap.innerText = "Current map: " + map;
}

let arr = [
    "Wolfboy248",
    "turkey",
    "Player2",
    "DLSHHKFJKSFG",
    "fifthwit",
]

// dev buttons
arr.forEach((element) => {
    const btn = document.createElement("button");

    btn.innerText = "Advance " + element;
    btn.addEventListener("click", () => {
        let time = timeInp.value;
        // console.log(element + ` is now on map (5:34.325 -> ${time})`);
        fetch("/trigger-action", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "advance",
                msg: `${element} is now on map (5:34.325 -> ${time})`,
            }),
        });
    });

    devBtnsDiv.appendChild(btn);
});

// console scoreboard test
// show array in original thing
let topTHING = -22;
let totalPositions = 0;
let positionHeights = []
let spacing = 30;
let maxNameLength = 10;
arr.forEach((e) => {
    totalPositions++;
    const playerDiv = document.createElement("div");
    const playerName = document.createElement("span");
    const playerPosition = document.createElement("span");
    const playerDifference = document.createElement("span");

    playerDiv.setAttribute("time", "00:00.000");
    playerDiv.setAttribute("name", e);
    playerDiv.setAttribute("position", totalPositions);
    playerDiv.classList.add("player");
    playerDiv.id = e;

    if (e.length > maxNameLength) {
        playerName.innerText = e.substring(0, maxNameLength) + "...";
    } else {
        playerName.innerText = e;
    }

    playerPosition.innerText = totalPositions;
    playerPosition.classList.add("placement");

    if (arr[0] == e) {
        playerDifference.innerText = "Interval";
    } else {
        playerDifference.innerText = "0.000";
    }
    playerDifference.classList.add("diff");

    console.log(positionHeights);

    // initial positions
    topTHING += spacing;
    console.log(topTHING)
    playerDiv.style.marginTop = topTHING + "px";

    positionHeights.push({ position: totalPositions, height: playerDiv.style.marginTop });

    playerDiv.appendChild(playerName);
    playerDiv.appendChild(playerPosition);
    playerDiv.appendChild(playerDifference);
    positionsDiv.appendChild(playerDiv);
})

// console.log(positionHeights[0].height)

function getPosHeight(position) {
    let pos = position - 1;

    if (pos < 0) return null;

    return positionHeights[pos].height;
}

let players = document.querySelectorAll(".player");

console.log(window.getComputedStyle(scoreboardTitle).getPropertyValue("height"))
scoreboard.style.height = spacing * totalPositions + parseFloat(window.getComputedStyle(scoreboardTitle).getPropertyValue("height")) + parseFloat(window.getComputedStyle(scoreboardTitle).getPropertyValue("margin-top")) + parseFloat(window.getComputedStyle(scoreboardTitle).getPropertyValue("margin-bottom")) + 20 + "px";

players.forEach((e) => {
    console.log(get(e, "name") + ", " + get(e, "time"));
});

// Update player time
function updateTime(name, newTime) {

    // Set new time on player
    const player = document.getElementById(name);
    player.setAttribute('time', newTime);
  
    // Get all time attributes
    const times = document.querySelectorAll('[time]');
    const timeValues = Array.from(times).map(el => el.getAttribute('time'));
  
    // Convert times to seconds
    const timesInSeconds = timeValues.map(timeStr => {
        const parts = timeStr.split(':');
        let seconds = 0;
        let minutes = 1;
    
        for(let i = parts.length - 1; i >= 0; i--) {
            seconds += Number(parts[i]) * minutes;
            minutes *= 60;
        }
    
        return seconds;
    });
  
    // Handle 00:00.000 times
    const zeros = timesInSeconds.filter(sec => sec === 0);
    const nonZeros = timesInSeconds.filter(sec => sec !== 0);
  
    nonZeros.sort((a, b) => a - b);
  
    const sortedTimes = [...nonZeros, ...zeros];
  
    // Convert back to time strings
    const sortedTimeStrings = sortedTimes.map(seconds => {
      return secondsToTimeString(seconds);
    });

    console.log(sortedTimeStrings);

    let positionCounts = {};

    players.forEach((p) => {
        if (sortedTimeStrings.includes(get(p, "time"))) {
            p.setAttribute("position", sortedTimeStrings.indexOf(get(p, "time")) + 1);

            let pos = get(p, "position");
            p.style.marginTop = getPosHeight(pos);
            p.childNodes[1].innerText = pos;
        }
    });

    // childNodes things
    // 0 - name span
    // 1 - placement span
    // 2 - difference span
    player.childNodes[2].innerText = newTime;
};
  
// Convert seconds to time string
function secondsToTimeString(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    seconds = seconds.toFixed(3);
  
    return `${hours > 0 ? hours + ':' : ''}${hours > 0 ? "0" : (minutes > 10 ? "" : "")}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
}

function get(p, t) {
    return p.getAttribute(t);
}

socket.onmessage = (e) => {
    let data = e.data;

    if (data.includes("ffo_tourneyStart")) {
        console.log("tourney started")
    };

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

        updateTime(name, time);
    }

    if (data.includes("ffo_newMap")) {
        let map = data.split("ffo_newMap ");
        updateMap(map[1]);
    }
}
