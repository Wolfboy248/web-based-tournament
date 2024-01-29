async function createImgs() {
    const maplistfile = await fetch("./maplist.json");
    const maplist = await maplistfile.json();

    const mapKeys = Object.keys(maplist);
    console.log(mapKeys);

    const mapDisplay = document.getElementById("bgImgsAuto");
    if (mapDisplay == undefined) return;

    mapKeys.forEach((key) => {
        if (key == "sp") return;

        const map = maplist[key];

        const mapDiv = document.createElement("div");
        mapDiv.classList.add("bg");
        mapDiv.classList.add("bgImg");
        mapDiv.classList.add("fadeBG");
        mapDiv.style.backgroundImage = "url(" + `/maps/ch${map[1]}/${key}.jpg` + ")";
        mapDiv.id = key;
        mapDisplay.appendChild(mapDiv);
    })
}

createImgs();

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("bgImg");

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add("pleasework");
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.remove("pleasework");
    setTimeout(showSlides, 8000);
}
