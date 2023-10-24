fetch("pGun.json")
.then(Response => Response.json())
.then(data => {
  console.log(data.wr)
  document.querySelector("#wrTime").innerText = data.wr
})

fetch("info.json")
.then(Response => Response.json())
.then(data => {
  document.querySelector("#player1").innerText = data.player1
  document.querySelector("#player2").innerText = data.player2
  document.querySelector("#player1R1").innerText = data.player1
  document.querySelector("#player2R1").innerText = data.player2
  
  // round pbs
  document.querySelector("#r1P1PB").innerText = data.round1P1PB
  document.querySelector("#r1P2PB").innerText = data.round1P2PB
})

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      console.log('YIPPEEEEEE!!!');
      window.open("/index.html", "_self");
    }

    if (event.key === 'ArrowRight') {
      fetch("pGun.json")
      .then(Response => Response.json())
      .then(data => {
        console.log(data.wr)
        document.querySelector("#wrTime").innerText = data.wr
      })

      fetch("info.json")
      .then(Response => Response.json())
      .then(data => {
        document.querySelector("#player1").innerText = data.player1
        document.querySelector("#player2").innerText = data.player2
        document.querySelector("#player1R1").innerText = data.player1
        document.querySelector("#player2R1").innerText = data.player2

        // round pbs
        document.querySelector("#r1P1PB").innerText = data.round1P1PB
        document.querySelector("#r1P2PB").innerText = data.round1P2PB
      })
    }
});