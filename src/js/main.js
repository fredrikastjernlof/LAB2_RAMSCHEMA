"use strict"

/* url till JSON-filen som innehåller ramschemat  */
const url = "https://webbutveckling.miun.se/files/ramschema.json";

/*Array som ska hålla alla kurser med tillhörande data från JSON-filen */
let allCourses = [];

/* Array som ska hålla alla synliga kurser efter sök och sortering */
let visibleCourses = [];

let currentSortKey = null; /* Håller koll på vilken kolumn vi sorterar på */
let currentSortDir = "asc"; /* Håller koll på riktning - "asc" eller "desc" */

/* Hämtar element från DOM */
const tbody = document.querySelector("#tbody");
const searchInput = document.querySelector("#search");
const statusText = document.querySelector("#status");

const sortButtons = document.querySelectorAll("button[data-sort]");



/* Asynkron funktion som hämtar kursdata från servern */
async function fetchCourses() {

    try {
        /* Försöker hämta data från url:en */
        const response = await fetch(url);

        /* Gör om svaret från JSON till JavaScript-objekt */
        const data = await response.json();

        /* Hämtad data sparas i variabeln allCourses */
        allCourses = data;

        /* Synliga kurser sätts initialt till alla hämtade kurser */
        visibleCourses = allCourses;

        /* Visar alla kurser i tabellen vid start */
        renderCourses(visibleCourses);

        /* Fångar eventuella fel */
    } catch (error) {
        console.error("Något gick fel vid fetch", error);
    }
}


/* Funktion som sorterar och styr riktning efter vald kolumn */
function sortCourses(courses, key, dir) {
    /* Skapar en kopia av arrayen eftersom .sort() annars ändrar orginal-arrayen */
    const copy = [...courses];

    /* Jämför två objekt i taget och bestämmer deras ordning */
    copy.sort((a, b) => {
        /* Plockar ut värdena som ska jämföras som text */
        const aValue = String(a[key]).toLowerCase();
        const bValue = String(b[key]).toLowerCase();

        /* Returnerar -1 eller 1 beroende på rikting (asc/desc) */
        if (aValue < bValue) return dir === "asc" ? -1 : 1;
        if (aValue > bValue) return dir === "asc" ? 1 : -1;
        /* Om värdena är lika - behåll ordning */
        return 0;
    });

    return copy;
}

/* Skapar en egen funktion för att lista kurser och skriva ut dem till DOM */
function renderCourses(courses) {

    /* Rensar tabellen */
    tbody.innerHTML = "";

    /* Loopar genom alla kurser och lägger till dom i tabellen */
    courses.forEach((course) => {

        /* Skapar en tabellrad */
        const tr = document.createElement("tr");

        /* Skapar tre celler till min tabell */
        const tdCode = document.createElement("td");
        tdCode.textContent = course.code;

        const tdName = document.createElement("td");
        tdName.textContent = course.coursename;

        const tdProgression = document.createElement("td");
        tdProgression.textContent = course.progression;

        /* Lägger cellerna i en rad */
        tr.appendChild(tdCode);
        tr.appendChild(tdName);
        tr.appendChild(tdProgression);

        /* Lägger raden i tabellens body */
        tbody.appendChild(tr);

    });

    statusText.textContent = `Visar ${courses.length} av ${allCourses.length} kurser.`;
}

/* Anropar funktionen när sidan laddas */
fetchCourses()


/* Eventlyssnare för sökfunktion, filtrerar tabellen medan användaren skriver */
searchInput.addEventListener("input", (event) => {
    /* Hämtar texten i inputfältet och gör den lättare att jämföra */
    const searchTerm = event.target.value.toLowerCase().trim();

    /* Skapar ny lista med kurser som matchar den inskrivna söktermen */
    const filteredCourses = allCourses.filter((course) => {
        return (
            course.code.toLowerCase().includes(searchTerm) ||
            course.coursename.toLowerCase().includes(searchTerm)
        );
    });

    /* Uppdaterar vilka kurser som visas baserat på sökresultat */
    visibleCourses = filteredCourses;

    /* Visar endast de kurser som matchar sökningen */
    renderCourses(visibleCourses);

});



/* Klick på knapp ovanför tabell sorterar tabellen */
sortButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        /* Läser vilken kolumn knappen representerar */
        const sortKey = event.target.dataset.sort;

        /* Om vi klickar på samma knapp en gång till så växlar vi riktning */
        if (currentSortKey === sortKey) {
            currentSortDir = currentSortDir === "asc" ? "desc" : "asc";
        } else {
            /* Ny kolumn - börja med "asc" */
            currentSortKey = sortKey;
            currentSortDir = "asc";
        }

        /* Sorterar endast de kurser som visas just nu */
        const sortedCourses = sortCourses(visibleCourses, currentSortKey, currentSortDir);

        /* Uppdaterar synliga kurser efter sortering */
        visibleCourses = sortedCourses;

        /* Visar den sorterade listan */
        renderCourses(visibleCourses);

    });
});