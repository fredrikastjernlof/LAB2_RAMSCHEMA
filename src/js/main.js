"use strict"

/* url till JSON-filen som innehåller ramschemat  */
const url = "https://webbutveckling.miun.se/files/ramschema.json";

/*Array som ska hålla alla kurser med tillhörande data från JSON-filen */
let allCourses = [];

/* Hämtar <tbody> från DOM */
const tbody = document.querySelector("#tbody");

/* Asynkron funktion som hämtar kursdata från servern */
async function fetchCourses() {

    try {
        /* Försöker hämta data från url:en */
        const response = await fetch(url);

        /* Gör om svaret från JSON till JavaScript-objekt */
        const data = await response.json();

        /* Hämtad data sparas i variabeln allCourses */
        allCourses = data;

        /* Rensar tabellen */
        tbody.innerHTML = "";

        /* Loopar genom alla kursen och lägger till dom i tabellen */
        allCourses.forEach((course) => {

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

        console.log("Alla kurser visas i tabellen");

        /* Fångar eventuella fel */
    } catch (error) {
        console.error("Något gick fel vid fetch", error);
    }
}

/* Anropar funktionen när sidan laddas */
fetchCourses()