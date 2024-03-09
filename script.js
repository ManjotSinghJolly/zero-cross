const modeChoice = document.getElementById("mode-choice");
const againstPlayer = document.getElementById("against-player");
const controlSection = document.getElementById("controls");

againstPlayer.addEventListener("click", function () {
  modeChoice.style.display = "none";
  controlSection.style.display = "block";
});

//Gameboard IIFE
const Gameboard = (function () {
  let gameboard = [
    ["", "", "hello YOU"],
    ["", "", ""],
    ["", "", ""],
  ];

  const render = function () {
    const body = document.body;
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // const gridContainer = document.getElementById("grid-container");

    for (let rowNumber = 0; rowNumber <= 2; rowNumber++) {
      for (let colNumber = 0; colNumber <= 2; colNumber++) {
        const cell = document.createElement("div");
        cell.setAttribute("row-number", rowNumber);
        cell.setAttribute("col-number", colNumber);
        cell.classList.add("cell", "circle");
        gridContainer.appendChild(cell);
      }
    }
    body.appendChild(gridContainer);
  };

  return {
    render,
  };
})();

//Factory function to make the player objects
const createPlayer = function (name, marker) {
  return {
    name,
    marker,
  };
};

//Game controller IIFE
const Game = (function () {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = function () {
    controlSection.style.display = "none";
    players = [
      createPlayer(
        document.getElementById("player1".value, "X"),
        createPlayer(document.getElementById("player2".value, "O"))
      ),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };
  return {
    start,
  };
})();

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
  Game.start();
});
