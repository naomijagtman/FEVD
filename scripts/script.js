// JavaScript Document

const contentbox = document.getElementById('contentbox');
const contentbutton = document.getElementById('contentbutton');
const favolijst = document.querySelector("section ul");

const url = 'https://random.dog/woof.json'

//Display de datum van vandaag
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; //In js begint maand bij 0 ipv 1
const day = currentDate.getDate();
const formattedDate = `${day}/${month}/${year}`;
const dateElement = document.getElementById('datumvanvandaag');

dateElement.textContent = formattedDate;

//Zodra je op de knop klikt komt er nieuwe content
contentbutton.addEventListener('click', nieuwecontent)

//Zodra je op enter klikt komt er nieuwe content 
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        nieuwecontent();
    }
});

//Functie content genereren en toevoegen zodra er op de knop wordt geklikt
function nieuwecontent() {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            //Zorgt ervoor dat de URL gesplit wordt waardoor de .jpg .mp4 .webm etc aan het einde van de functie aangesproken kan worden
            var deUrlArray = data.url.split(".");
            var extensie = deUrlArray[deUrlArray.length - 1];

            //Als de url eindigt op .mp4 of .webm opnieuw een url genereren (deze moeten eruit gefilterd worden aangezien ze niet werken op de site)
            if (extensie == "mp4" || extensie == "webm") {
                nieuwecontent();
            } else {
                //Zorgt ervoor dat de content wordt toegevoegd in plaats van vervangen en de onclick laat de foto verdwijnen
                contentbox.insertAdjacentHTML('afterbegin', `<li onclick="fotoverwijderen(this)"><img src="${data.url}"/></li>`);
            }

        })
}

//foto verwijderen, geluidje en animatie afspelen door te klikken
const audio = new Audio('sounds/huilhond.mp3');

function fotoverwijderen(element) {
    audio.play();
    element.classList.add('vliegweg')

    setTimeout(() => element.remove(), 2000)
}

//Toon de dropdown als er op de tekst geklikt wordt
const favobutton = document.getElementById('favobutton');
const favodropdown = document.querySelector("section");

favobutton.addEventListener('click', dropdown)

function dropdown() {
    favodropdown.style.visibility = "visible";
}

//Sluit de dropdown als er op de knop geklikt wordt
const hamburgersluiten = document.getElementById("hamburgersluiten")

hamburgersluiten.addEventListener('click', sluitdropdown);

function sluitdropdown() {
    favodropdown.style.visibility = "hidden";
}

//favorietenlijstje
new Sortable(favolijst, {
    group: {
        name: 'shared',
    },
    animation: 150
});

//contentlijstje
new Sortable(contentbox, {
    group: {
        name: 'shared',
        put: false
    },
    animation: 150
});