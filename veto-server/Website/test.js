const username = document.getElementById("username");
const image = document.getElementById("steam-image");

fetch("/getuser", { method: "GET" })
  .then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.json();
    }
  })
  .then((data) => {
    if (data.error === "Not logged in") {
      console.log("Not logged in");
    } else {
      console.log(data);
      username.innerHTML = data.personaname;
      image.src = data.avatarmedium;
    }
  });
