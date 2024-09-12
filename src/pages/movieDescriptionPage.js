import { app } from "../vars";
import header from "../common/header";
import spinner from "../common/spinner";
import Kinopoisk from "../services/kinopoisk";

export default function movieDescriptionPage(auth, idMovie) {
  spinner();

  Kinopoisk.getMovieInfoById(idMovie).then((data) => {
    setTimeout(() => {
      renderInfoMovie(auth, data);
    }, 1000);
  });
}

const renderInfoMovie = (auth, data) => {
  app.innerHTML = ``;
  header(auth);

  const {
    posterUrl,
    nameRu,
    nameEn,
    description,
    genres,
    ratingKinopoisk,
    countries,
    nameOriginal,
  } = data;
  app.insertAdjacentHTML(
    "beforeend",
    `<div class="container movie">
    <div class="movieDescription">
      <h1>${
        nameRu === null && nameEn === null
          ? nameOriginal
          : nameRu === null
          ? nameEn
          : nameRu
      }</h1>
      <h2>Жанры: ${genres.map((item) => {
        return item.genre;
      })}</h2><h2>${description}</h2><h2>Страны: ${countries.map((item) => {
      return item.country;
    })}</h2><h2>Рейтинг Кинопоиска: ${
      ratingKinopoisk === null ? "-" : ratingKinopoisk
    }</h2></div>
      <div class="movieImage">
        <img class="" src="${posterUrl}" alt="" />
      </div>
    </div>`
  );
};
