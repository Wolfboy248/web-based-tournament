fetch("smoothJazz.json")
.then(Response => Response.json())
.then(data => {
  console.log(data.wr)
  document.querySelector("#wrTime").innerText = data.wr
})