import spinner from "../common/spinner";
import renderMainContent from "../common/renderMainContent.js";
import Kinopoisk from "../services/kinopoisk";

export default function seriesPage(auth) {
  spinner();

  Kinopoisk.getSeries().then((data) => {
    setTimeout(() => {
      renderMainContent(data, auth);
    }, 1000);
  });
}
