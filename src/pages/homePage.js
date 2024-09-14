import { app } from "../vars";
import header from "../common/header";
import spinner from "../common/spinner";
import Kinopoisk from "../services/kinopoisk";

export default function homePage(auth) {
  spinner();
  Kinopoisk.getMovieHomePage().then((data) => {
    setTimeout(() => {
      renderHomePage(data, auth);
    }, 1000);
  });
}

function renderHomePage(data, auth) {
  app.innerHTML = ``;
  header(auth);
  let flipFlag = 0;
  app.insertAdjacentHTML(
    "beforeend",
    `<div class="container">
    <div class="containerPreviews home">
      <div class="trailers">
      <div class="flip"><button class="left"><img src="./images/left.png" alt="left" /></button><button class="right"><img src="./images/right.png" alt="right" /></button></div>
        <div class="episodes">
        ${cardMovieHome(data.items)}
        </div>
      </div>
    </div>
  </div>`
  );

  const search = document.querySelector(".inputSearch");
  const episodes = document.querySelector(".episodes");

  window.addEventListener("click", (event) => {
    if (event.target.matches(".searchImg")) {
      search.classList.remove("none");
    } else if (event.target.matches(".inputSearch")) {
      event.stopPropagation();
    } else if (!event.target.matches(".searchImg")) {
      search.classList.add("none");
    }
  });

  function searchFilm(string, arr, container) {
    const arrFilms = arr.filter((item) => {
      return item.nameRu.toLowerCase().includes(string.toLowerCase());
    });
    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", cardMovieHome(arrFilms));
  }

  let searchFlag = false;
  search.addEventListener("input", (event) => {
    if (event.target.value.length > 2) {
      searchFilm(event.target.value, data.items, episodes);
      console.log(event.target.value);
      searchFlag = true;
    } else if (searchFlag) {
      episodes.innerHTML = "";
      episodes.innerHTML = cardMovieHome(data.items);
      searchFlag = false;
    }
  });

  document.querySelector(".left").addEventListener("click", () => {
    flipFlag -= 1;
    episodes.innerHTML = "";
    episodes.innerHTML = cardMovieHome(data.items);
  });
  document.querySelector(".right").addEventListener("click", () => {
    flipFlag += 1;
    episodes.innerHTML = "";
    episodes.innerHTML = cardMovieHome(data.items);
  });

  function cardMovieHome(films) {
    const arrsOfAllMovies = [];
    let groupOfMovies = [];
    for (let i = 0; i < films.length; i++) {
      groupOfMovies.push(films[i]);
      if (groupOfMovies.length === 8) {
        arrsOfAllMovies.push(groupOfMovies);
        groupOfMovies = [];
      }
    }
    if (groupOfMovies.length < 8 && groupOfMovies.length > 0) {
      arrsOfAllMovies.push(groupOfMovies);
    }

    if (flipFlag < 0) {
      flipFlag = arrsOfAllMovies.length - 1;
    } else if (flipFlag === arrsOfAllMovies.length) {
      flipFlag = 0;
    }

    for (let i = flipFlag; i < arrsOfAllMovies.length; i++) {
      const moviesForPage = arrsOfAllMovies[i].map((film) => {
        const {
          posterUrl,
          nameRu,
          nameEn,
          nameOriginal,
          countries,
          kinopoiskId,
        } = film;

        const country = countries.map((item) => {
          return item.country;
        });
        const nameMovie =
          nameRu === null && nameEn === null
            ? nameOriginal
            : nameRu === null
            ? nameEn
            : nameRu;

        return `<div class="filmHomePage"><img class="imgFilm" id='${kinopoiskId}' src="${posterUrl}" alt="${nameMovie}">
        <a class="aboutMovieLink" href="/${kinopoiskId}">Подробнее...</a>
        <div class="description"><h2>${nameMovie}</h2><p>${country.join(
          ", "
        )}</p><a href="/${kinopoiskId}">Подробнее...</a></div>
          </div>`;
      });
      return moviesForPage.join("");
    }
  }
}
