const centerDiv = document.querySelector("#centerDiv");
const cyclingDiv = document.querySelector("#cyclingDiv");

setInterval(newMsg, 500)

let msgs = [
    "msg1",
    "msg2",
    "msg3",
    "msg4",
    "msg5"
]

let currMsg = -1;
function newMsg() {
    currMsg++;
    let currentMsgStr;
    if (currMsg >= msgs.length) {
        currMsg = 0;
        currentMsgStr = msgs[currMsg]
    } else {
        currentMsgStr = msgs[currMsg];
    }
    
    setTimeout()
}
