export function cardMovie(films, string) {
  const arr = films.filter((film) => {
    for (let key in film.genres[0]) {
      if (film.genres[0][key] === string) {
        return true;
      }
    }
  });

  const arrMovies = arr.map((film) => {
    const { posterUrl, nameRu, countries, kinopoiskId } = film;
    return `<div class="filmPageExceptHome"><img class="imgFilm" id='${kinopoiskId}' name="${nameRu}" country="${countries.map(
      (item) => {
        return item.country;
      }
    )}" src="${posterUrl}" alt=""></div>`;
  });
  return arrMovies.join("");
}

export function cardMovieHome(films, flipFlag) {
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

  if (flipFlag < 0 || flipFlag >= arrsOfAllMovies.length) {
    flipFlag = 0;
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
        return `<div class="filmHomePage"><img class="imgFilm" id='${kinopoiskId}' src="${posterUrl}" alt="${
          nameRu === null && nameEn === null
            ? nameOriginal
            : nameRu === null
            ? nameEn
            : nameRu
        }">
        <div class="description"><h2>${
          nameRu === null && nameEn === null
            ? nameOriginal
            : nameRu === null
            ? nameEn
            : nameRu
        }</h2><p>${countries.map((item) => {
          return item.country;
        })}</p><a href="/${kinopoiskId}">Подробнее...</a></div>
        </div>`;
      });
      return moviesForPage.join("");
    }
  } else {
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
        return `<div class="filmHomePage"><img class="imgFilm" id='${kinopoiskId}' src="${posterUrl}" alt="${
          nameRu === null && nameEn === null
            ? nameOriginal
            : nameRu === null
            ? nameEn
            : nameRu
        }">
        <div class="description"><h2>${
          nameRu === null && nameEn === null
            ? nameOriginal
            : nameRu === null
            ? nameEn
            : nameRu
        }</h2><p>${countries.map((item) => {
          return item.country;
        })}</p><a href="/${kinopoiskId}">Подробнее...</a></div>
        </div>`;
      });
      return moviesForPage.join("");
    }
  }
}
