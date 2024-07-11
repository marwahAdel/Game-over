"use strict";
import { Details } from "./details.js";
import { Ui } from "./ui.js";

export class Games {
  constructor() {
    this.ui = new Ui();
    this.details = new Details();
    this.getGames("mmorpg");
    const links = document.querySelectorAll(".menu a");

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    }
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f0a08eefb1msh8623cbb46afe7ffp12b7d0jsn6f73a46bc92a",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const response = await api.json();
    this.ui.displayGamesData(response);
    this.clickONCardGame();
    loading.classList.add("d-none");
  }

  clickONCardGame() {
    const items = document.querySelectorAll(".card");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", () => {
        const id = items[i].dataset.id;
        this.details.showDetails(id);
      });
    }
  }
}
