//archer was here
async function main() {
    const infoJSON = await fetch("maps/info.json");
    const info = await infoJSON.json();

    // player names
    document.querySelector("#btnP1").innerText = info.player1;
    document.querySelector("#btnP2").innerText = info.player2;
}

function player1Click() {
    document.querySelector("#mainContainer").style.transform = "translate(-50%, -400%)";
    document.getElementById("P1Form").style.transform = "translate(-50%, -50%)";
}

function player2Click() {
    document.querySelector("#mainContainer").style.transform = "translate(-50%, -400%)";
    document.getElementById("P2Form").style.transform = "translate(-50%, -50%)";
}

document.querySelector("#btnP1").addEventListener('click', () => {
    player1Click();
});

document.querySelector("#btnP2").addEventListener('click', () => {
    player2Click();
});

main();