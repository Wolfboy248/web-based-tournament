//archer was here
async function main() {
    const infoJSON = await fetch("maps/info.json");
    const info = await infoJSON.json();

    // player names
    document.querySelector("#btnP1").innerText = info.player1;
    document.querySelector("#btnP2").innerText = info.player2;
}

const Data = new P2Data()

function validate() {
    let valid = false; // Initialize valid as false

    for (let inputs = 0; inputs < 5; inputs++) {
        for (let maps = 0; maps < Data.maps.length; maps++) {
            try {
                if (document.getElementById(`P1map${inputs+1}INP`).value == Data.maps[maps].splitname) {
                    console.log(inputs)
                    valid = true;
                    break; // Exit the inner loop when a match is found
                }
            } catch (error) {
                console.log(error)
            }
            //console.log(maps, Data.maps[maps].splitname, document.getElementById(`P1map${inputs+1}INP`).value)
        }
        
        if (!valid) {
            alert(`You have an invalid vetoe on Map ${inputs+1}`);
            
            return false;
        }

    }

    return valid;
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

function player1submit() {
    if (validate()) {
        document.getElementById('form1').submit()
    }
}

function player2submit() {
    if (validate()) {
        document.getElementById('form2').submit();
    }

}


main();