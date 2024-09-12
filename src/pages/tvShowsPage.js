import spinner from "../common/spinner";
import renderMainContent from "../common/renderMainContent.js";
import Kinopoisk from "../services/kinopoisk";

export default function getTVShowsPage(auth) {
  spinner();

  Kinopoisk.getTVShows().then((data) => {
    setTimeout(() => {
      renderMainContent(data, auth);
    }, 1000);
  });
}
