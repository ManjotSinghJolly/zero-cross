// To select between different game modes and change displays
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
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const render = function () {
    const body = document.body;
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    let cellRowNumber;
    let cellColNumber;

    // const gridContainer = document.getElementById("grid-container");

    for (let rowNumber = 0; rowNumber <= 2; rowNumber++) {
      for (let colNumber = 0; colNumber <= 2; colNumber++) {
        const cell = document.createElement("div");
        cellRowNumber = rowNumber;
        cellColNumber = colNumber;
        cell.addEventListener(
          "click",
          function () {
            cellRowNumber = cell.getAttribute("data-row");
            cellColNumber = cell.getAttribute("data-column");
            // Check for turn
            // Add marker to array
            // Add class to visual cell
            //check for winners
            // Game.addToArray(Gameboard.gameboard, cellRowNumber, cellColNumber);
            Game.addToArray(cellRowNumber, cellColNumber);
          },
          { once: true }
        );
        cell.setAttribute("data-row", rowNumber);
        cell.setAttribute("data-column", colNumber);
        cell.classList.add("cell");
        gridContainer.appendChild(cell);
      }
    }
    body.appendChild(gridContainer);
  };

  return {
    gameboard,
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

  const addToArray = function (firstIndex, secondIndex) {
    Gameboard.gameboard[firstIndex][secondIndex] = "Hello YOU";
    console.log(Gameboard.gameboard);
  };

  return {
    start,
    addToArray,
  };
})();

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
  Game.start();
});
