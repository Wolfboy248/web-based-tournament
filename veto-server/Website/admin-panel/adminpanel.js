const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const playerchangeSubmit = document.getElementById("playerchangeSubmit");
const adminsList = document.getElementById("adminsList");
const adminSteamName = document.getElementById("adminSteamName");
const adminAdd = document.getElementById("adminAdd");
const vetoAmount = document.getElementById("vetoAmount");
const vetoAmountSubmit = document.getElementById("vetoAmountSubmit");
const vetoList = document.getElementById("vetoList");

//set data on load
fetch("/settings.json")
  .then((res) => res.json())
  .then((data) => {
    player1Name.placeholder = data.player1;
    player2Name.placeholder = data.player2;
    vetoAmount.placeholder = data.vetoLimit;
    document.getElementById("p1Name").innerHTML = data.player1;
    document.getElementById("p2Name").innerHTML = data.player2;
  });

//change player names
playerchangeSubmit.addEventListener("click", async () => {
  await fetch("/admin/playerchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player1Name: player1Name.value,
      player2Name: player2Name.value,
    }),
  });
  location.reload();
});
//list admins
fetch("settings.json")
  .then((res) => res.json())
  .then((data) => {
    data.admins.forEach((admin) => {
      adminsList.innerHTML += `<li>${admin}</li>`;
      if (admin != "Archer the real") {
        adminsList.innerHTML += `<button onclick="removeAdmin('${admin}')">Remove</button>`;
      }
    });
  });

//remove admin
async function removeAdmin(admin) {
  await fetch("/admin/adminchange", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      admin: admin,
    }),
  });
  location.reload();
}

//add admin
adminAdd.addEventListener("click", async () => {
  await fetch("/admin/adminchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      admin: adminSteamName.value,
    }),
  });
  location.reload();
});

//vetos
vetoAmountSubmit.addEventListener("click", async () => {
  await fetch("/admin/vetochange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: vetoAmount.value,
    }),
  });
  location.reload();
});

//list vetos
fetch("vetos.json")
  .then((res) => res.json())
  .then((data) => {
    data.player1.forEach((veto) => {
      vetoList.children[1].innerHTML += `<li>${veto}</li>`;
      vetoList.children[1].innerHTML += `<button onclick="removeVeto('${veto}')">Remove</button>`;
    });
    data.player2.forEach((veto) => {
      vetoList.children[3].innerHTML += `<li>${veto}</li>`;
      vetoList.children[3].innerHTML += `<button onclick="removeVeto('${veto}')">Remove</button>`;
    });
  });

//remove veto
async function removeVeto(veto) {
  await fetch("/admin/vetochange", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      veto: veto,
    }),
  });
  location.reload();
}
