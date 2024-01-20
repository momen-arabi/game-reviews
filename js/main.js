import { GameCard } from "./ui.module.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9b9872e5a1mshbb340bb4a833e48p19a20ajsn8f396cd13e7e",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

const gameCont = document.querySelector("#games .row");

async function getGameData() {
  let url = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg", options);
  let res = await url.json();
  return res;
}

getGameData().then((res) => {
  let genreGames = "";
  res.forEach((game) => {
    let gameCard = new GameCard(game.id, game.title, game.thumbnail, game.short_description, game.genre, game.platform);
    genreGames += `
    <div class="col-lg-3">
    <div id=${gameCard.id} class="card bg-transparent text-light position-relative h-100">
      <div class="overlay bg-dark bg-gradient bg-opacity-10 position-absolute w-100 h-100 top-0 start-0 rounded-1"></div>
      <img src=${gameCard.thumb} class="card-img-top" alt="game-image" />
      <div class="card-body">
        <div class="title-cont d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title m-0 p-0">${gameCard.title}</h5>
          <span class="badge bg-primary py-2 px-3">Free</span>
        </div>
        <p class="card-text">${gameCard.desc}</p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <span class="badge bg-secondary py-1 px-2 category">${gameCard.genre}</span>
        <span class="badge bg-secondary py-1 px-2 platform">${gameCard.platform}</span>
      </div>
    </div>
  </div>
    `;
  });
  gameCont.innerHTML = genreGames;
});
