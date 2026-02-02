"use strict"

const url = "https://webbutveckling.miun.se/files/ramschema.json";

let allCourses = [];

async function fetchCourses(){
    console.log("fetchCourses startar");

    try{

    const response = await fetch(url);
    console.log("Respons:", response);

    const data = await response.json();
    console.log("JSON-data:", data);

    allCourses = data;
    console.log("Sparar data i allCourses:", allCourses);

    console.log("Kurskod:", allCourses[0].code);
    console.log("Kursnamn:", allCourses[0].coursename);
    console.log("Progression:", allCourses[0].progression);

    } catch (error) {
        console.log ("Något gick fel vid fetch");
        console.error(error);
    }

}

fetchCourses()