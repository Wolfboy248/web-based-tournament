const steamDiv = document.getElementById("steam-profile-div");
const steamLogin = document.getElementById("steam-login");
const steamPFP = document.getElementById("steam-pfp");
const steamName = document.getElementById("steam-profile-name");
const adminPanel = document.getElementById("admin-panel");
const steamLogout = document.getElementById("steam-logout");
const vetoesBtn = document.querySelector("#vetoesBtn");
const seperator = document.querySelector("#seperator");

async function main() {
  seperator.style.display = "none";
  const user = await (await fetch("/getuser")).json();
  if (user.error === "Not logged in") {
    steamLogin.style.display = "block";
    steamPFP.style.display = "none";
    adminPanel.style.display = "none";
    steamName.style.display = "none";
    steamLogout.style.display = "none";
    vetoesBtn.style.display = "none";
  } else {
    steamLogin.style.display = "none";
    steamPFP.style.display = "block";
    adminPanel.style.display = "none";
    steamName.style.display = "block";
    steamLogout.style.display = "block";

    //data
    steamName.innerHTML = "Welcome, " + user.personaname + "!";
    steamPFP.src = user.avatarfull;
    const settings = await (await fetch("./settings.json")).json();
    if (settings.admins.includes(user.personaname)) {
      adminPanel.style.display = "block";
      seperator.style.display = "block";
    }
  }

  document.body.style.display = "block";
}

main();
