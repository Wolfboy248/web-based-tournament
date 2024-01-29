adminsList = document.getElementById("admins");

fetch("settings.json")
  .then((res) => res.json())
  .then((data) => {
    data.admins.forEach((admin) => {
      adminsList.innerHTML += `<li>${admin}</li>`;
    });
  });
