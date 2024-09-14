import { app } from "../vars";
import { cardMovie } from "./cardMovie";
import { genre } from "./genre";
import header from "../common/header";

export default function renderMoviesPage(data, auth) {
  app.innerHTML = ``;
  header(auth);
  document.querySelector(".search").classList.add("none");

  app.insertAdjacentHTML(
    "beforeend",
    `<div class="container">
  <div class="genreButtons">
    <h2>Для отображения фильмов выберите жанр</h2>
    <div>${genre(data)}</div>
  </div>
  <div class="wrapperPlayer">
    <div class="containerPlayer">
      <p class="name"></p>
      <p class="country"></p>
      <div class="divPlayer">
        <img class="player" src="" alt="" />
      </div>
    </div>
    <div class="containerPreviews">
      <div class="trailers">
        <div class="episodes"></div>
      </div>
    </div>
  </div>
</div>`
  );

  const genreButtons = document.querySelector(".genreButtons");
  const episodes = document.querySelector(".episodes");
  const player = document.querySelector(".player");
  const name = document.querySelector(".name");
  const country = document.querySelector(".country");
  const containerPreviews = document.querySelector(".containerPreviews");

  const selectVideo = (event) => {
    if (event.target.matches("img")) {
      let attributeSrc = event.target.getAttribute("src");
      let attributeName = event.target.getAttribute("name");
      let attributeCountry = event.target.getAttribute("country");
      player.setAttribute("src", attributeSrc);
      name.innerHTML = attributeName;
      country.innerHTML = `Страна: ${attributeCountry}`;
    }
  };
  containerPreviews.addEventListener("click", selectVideo);

  genreButtons.addEventListener("click", (event) => {
    if (event.target.classList.contains("genre")) {
      episodes.innerHTML = cardMovie(
        data.items,
        event.target.getAttribute("value")
      );
    }
  });
}
