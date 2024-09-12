import firebaseConfig from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import homePage from "./pages/homePage";
import moviesPage from "./pages/moviesPage";
import seriesPage from "./pages/seriesPage";
import tvShowsPage from "./pages/tvShowsPage";
import registrPage from "./pages/userPage/registrPage";
import authPage from "./pages/userPage/authPage";
import errorPage from "./pages/errorPage";
import profilePage from "./pages/userPage/profilePage";
import movieDescriptionPage from "./pages/movieDescriptionPage";

initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  validateUser(user);
  const arr = window.location.pathname.split("/");

  switch (window.location.pathname) {
    case "/":
      homePage(auth);
      break;
    case "/movies":
      moviesPage(auth);
      break;
    case "/series":
      seriesPage(auth);
      break;
    case "/tvShows":
      tvShowsPage(auth);
      break;
    case "/registrPage":
      registrPage(auth);
      break;
    case "/authPage":
      authPage(auth);
      break;
    case "/userProfile":
      profilePage(auth);
      break;
    case `/${arr[1]}`:
      movieDescriptionPage(auth, arr[1]);
      break;
    default:
      errorPage();
  }
});

const validateUser = (user) => {
  if (!user && window.location.pathname !== "/authPage") {
    if (!user && window.location.pathname !== "/registrPage") {
      window.location.pathname = "/authPage";
      return;
    }
    return;
  }
};
