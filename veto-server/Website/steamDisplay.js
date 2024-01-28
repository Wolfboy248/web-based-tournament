const steamDiv = document.getElementById("steam-profile-div");
const steamLogin = document.getElementById("steam-login");
const steamPFP = document.getElementById("steam-pfp");
const steamName = document.getElementById("steam-profile-name");
const adminPanel = document.getElementById("admin-panel");

async function main() {
  const user = await (await fetch("/getuser")).json();
  if (user.error === "Not logged in") {
    steamLogin.style.display = "block";
    steamPFP.style.display = "none";
    adminPanel.style.display = "none";
    steamName.style.display = "none";
  } else {
    steamLogin.style.display = "none";
    steamPFP.style.display = "block";
    adminPanel.style.display = "none";
    steamName.style.display = "block";

    //data
    steamName.innerHTML = user.personaname;
    steamPFP.src = user.avatarfull;
    const settings = await (await fetch("./settings.json")).json();
    if (settings.admins.includes(user.personaname)) {
      adminPanel.style.display = "block";
    }
  }

  document.body.style.display = "block";
}

main();
