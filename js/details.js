"use strict";
import { Ui } from "./ui.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById("btnClose").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });

    this.getDetails(id);
  }

  async getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f0a08eefb1msh8623cbb46afe7ffp12b7d0jsn6f73a46bc92a",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
      options
    );
    const response = await api.json();
    this.ui.displayDetails(response);
    loading.classList.add("d-none");
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
