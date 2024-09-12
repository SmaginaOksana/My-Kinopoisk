import { app } from "../vars";
import header from "../common/header";
import spinner from "../common/spinner";
import { cardMovieHome } from "../common/cardMovie";
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
      <div class="flip"><button><img class="left" src="./images/left.png" alt="left" /></button><button><img class="right" src="./images/right.png" alt="right" /></button></div>
        <div class="episodes">
        ${cardMovieHome(data.items, flipFlag)}
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
      searchFlag = true;
    } else if (searchFlag) {
      episodes.innerHTML = "";
      episodes.innerHTML = cardMovieHome(data.items);
      searchFlag = false;
    }
  });

  document.querySelector(".left").addEventListener("click", () => {
    flipFlag += 1;
    episodes.innerHTML = "";
    episodes.innerHTML = cardMovieHome(data.items, flipFlag);
  });

  document.querySelector(".right").addEventListener("click", () => {
    flipFlag -= 1;
    episodes.innerHTML = "";
    episodes.innerHTML = cardMovieHome(data.items, flipFlag);
  });
}
