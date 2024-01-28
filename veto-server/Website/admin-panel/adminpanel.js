const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const playerchangeSubmit = document.getElementById("playerchangeSubmit");
const adminsList = document.getElementById("adminsList");

//set player names on load
fetch("/settings.json")
  .then((res) => res.json())
  .then((data) => {
    player1Name.placeholder = data.player1;
    player2Name.placeholder = data.player2;
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
