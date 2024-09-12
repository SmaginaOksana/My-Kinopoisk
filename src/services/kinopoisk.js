const baseUrl = "https://kinopoiskapiunofficial.tech";
const apiKey = "07c5b266-4763-44fa-8e81-7fb138be0674";

export default class Kinopoisk {
  static async getMovieHomePage() {
    try {
      const response = await fetch(
        `${baseUrl}/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMoviePopular() {
    try {
      const response = await fetch(
        `${baseUrl}/api/v2.2/films/premieres?year=2024&month=AUGUST`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSeries() {
    try {
      const response = await fetch(
        `${baseUrl}/api/v2.2/films/collections?type=POPULAR_SERIES&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getTVShows() {
    try {
      const response = await fetch(
        `${baseUrl}/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovieInfoById(id) {
    try {
      const response = await fetch(`${baseUrl}/api/v2.2/films/${id}`, {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
