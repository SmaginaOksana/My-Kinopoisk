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
    <div class="containerButton">
    <p class='name'></p>
    <p class='country'></p>
    <div>
    <img class='player' src="" alt="" />
    </div>
    </div>
    <div class="containerPreviews">

    <form name="genre">
    <select name="select" id="">
      <option value="Выберите жанр" hidden>Выберите жанр</option>
      ${genre(data)}
    </select>
  </form>
  
    <div class="trailers">
       <div class="episodes">
        
        </div>
      </div>
    </div>
  </div>`
  );

  const select = document.querySelector("select");
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

  select.addEventListener("change", () => {
    episodes.innerHTML = cardMovie(data.items, select.value);
  });
}
