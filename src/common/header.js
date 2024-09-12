import { app } from "../vars";
import profilePage from "../pages/userPage/profilePage";

export default function header(auth) {
  const template = `<header>
  <div class="container">
    <div class="logo">
      <img src="./images/logoMain.png" alt="logo" />
    </div>
    <div class="links">
      <nav>
        <a href="/" class="home">home</a
        ><a href="/movies" class="movies">movies</a
        ><a href="/series" class="series">series</a
        ><a href="/tvShows" class="tvShows">TV-shows</a>
      </nav>
      <div class="search">
        <input
          type="text"
          placeholder="search any movies or series"
          class="inputSearch none"
        />
        <img src="./images/search.png" alt="search" class="searchImg"/>
      </div>
      <div class="userProfile">
        <a href="/userProfile"
          ><img src="./images/userLoggedIn.png" alt="userLoggedIn"
        /></a>
      </div>
    </div>
  </div>
</header>`;

  app.insertAdjacentHTML("beforebegin", template);
  const profile = document.querySelector(".userProfile");

  profile.addEventListener("click", () => {
    profilePage(auth);
  });

  const homeLink = document.querySelector(".home");
  const moviesLink = document.querySelector(".movies");
  const seriesLink = document.querySelector(".series");
  const tvShowsLink = document.querySelector(".tvShows");
  switch (window.location.pathname) {
    case "/":
      homeLink.style.cssText = `border: 0.5px solid rgb(217, 215, 215);
      border-radius: 10px`;
      break;
    case "/movies":
      moviesLink.style.cssText = `border: 0.5px solid rgb(217, 215, 215);
      border-radius: 10px`;
      break;
    case "/series":
      seriesLink.style.cssText = `border: 0.5px solid rgb(217, 215, 215);
      border-radius: 10px`;
      break;
    case "/tvShows":
      tvShowsLink.style.cssText = `border: 0.5px solid rgb(217, 215, 215);
      border-radius: 10px`;
      break;
  }
}
