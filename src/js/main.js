"use strict"

/* url till JSON-filen som innehåller ramschemat  */
const url = "https://webbutveckling.miun.se/files/ramschema.json";

/*Array som ska hålla alla kurser med tillhörande data från JSON-filen */
let allCourses = [];

/* Asynkron funktion som hämtar kursdata från servern */
async function fetchCourses() {

    try {
        /* Försöker hämta data från url:en */
        const response = await fetch(url);

        /* Gör om svaret från JSON till JavaScript-objekt */
        const data = await response.json();

        /* Hämtad data sparas i variabeln allCourses */
        allCourses = data;

        /* Loopar igenom alla kurser */
        allCourses.forEach((course, index) => {
            console.log(`${index + 1}. ${course.code}| ${course.coursename} | ${course.progression}`);
        });

        /* Fångar eventuella fel */
    } catch (error) {
        console.error("Något gick fel vid fetch", error);
    }
}

/* Anropar funktionen när sidan laddas */
fetchCourses()