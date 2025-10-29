// Import film data — must come first
import { films } from './films.js';

// Button and background setup
const btnRed = document.querySelector("#redImage");
const btnGreen = document.querySelector("#greenImage");
const pageBody = document.body;

// Toggle background colors
btnRed.addEventListener("click", () => {
  pageBody.classList.remove("paintGreen");
  pageBody.classList.add("paintRed");
});

btnGreen.addEventListener("click", () => {
  pageBody.classList.remove("paintRed");
  pageBody.classList.add("paintGreen");
});

// Target the container
const container = document.querySelector(".parent");

// Optional: sort films by episode number
films.sort((a, b) => a.episode_id - b.episode_id);

// Create a card for each film
films.forEach(film => {
  const card = document.createElement("section");
  card.classList.add("film-card");

  // Construct the poster URL dynamically
  const posterURL = `https://starwars.dgmuvu.com/films/${film.episode_id}.webp`;

  card.innerHTML = `
    <h2>${film.title}</h2>
    <img src="${posterURL}" alt="${film.title} poster">
    <p><strong>DIRECTOR:</strong> ${film.director}</p>
    <p><strong>PRODUCER:</strong> ${film.producer}</p>
    <p><strong>RELEASED:</strong> ${film.release_date}</p>
  `;

  container.appendChild(card);
});