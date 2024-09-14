export function cardMovie(films, string) {
  const arr = films.filter((film) => {
    for (let key in film.genres[0]) {
      if (film.genres[0][key] === string) {
        return true;
      }
    }
  });

  const arrMovies = arr.map((film) => {
    const { posterUrl, nameRu, nameEn, nameOriginal, countries, kinopoiskId } =
      film;

    const country = countries.map((item) => {
      return item.country;
    });
    const nameMovie =
      nameRu === null && nameEn === null
        ? nameOriginal
        : nameRu === null
        ? nameEn
        : nameRu;

    return `<div class="filmPageExceptHome"><img class="imgFilm" id='${kinopoiskId}' name="${nameMovie}" country="${country.join(
      ", "
    )}" src="${posterUrl}" alt=""></div>`;
  });
  return arrMovies.join("");
}
