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
    let turn = 1;

    // const gridContainer = document.getElementById("grid-container");

    for (let rowNumber = 0; rowNumber <= 2; rowNumber++) {
      for (let colNumber = 0; colNumber <= 2; colNumber++) {
        const cell = document.createElement("div");
        cellRowNumber = rowNumber;
        cellColNumber = colNumber;
        cell.addEventListener("onmouseup", function () {
          cell.style.backgroundColor = "greenyellow";
        });
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
            Game.addToArray(turn, cellRowNumber, cellColNumber);
            Game.addVisualMarker(turn, cell);
            turn++;
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
  const start = function () {
    const turnIndicator = document.getElementById("turn-indicator");
    let playerX;
    let playerO;
    controlSection.style.display = "none";
    const playerXname = document.getElementById("player1").value;
    const playerOname = document.getElementById("player2").value;

    playerX = createPlayer(playerXname, "X");
    playerO = createPlayer(playerOname, "O");

    Gameboard.render();

    const playerXSpace = document.getElementById("x-name");
    const playerOSpace = document.getElementById("o-name");
    playerXSpace.innerHTML = playerXname;
    playerOSpace.innerHTML = playerOname;
    turnIndicator.style.visibility = "visible";
  };

  // Function to add markers to the backend array
  const addToArray = function (turn, firstIndex, secondIndex) {
    if (turn % 2 !== 0) {
      Gameboard.gameboard[firstIndex][secondIndex] = "X";
      console.log(Gameboard.gameboard);
    } else if (turn % 2 === 0) {
      Gameboard.gameboard[firstIndex][secondIndex] = "O";
      console.log(Gameboard.gameboard);
    }

    winner = checkWinner(Gameboard.gameboard);
    if (winner) {
      if (winner === "draw") {
        console.log("It is a draw!");
      } else {
        console.log("The winner is: " + winner);
      }
    } else {
      console.log("No winner yet");
    }
  };

  // Function to add marker to the front end board
  const addVisualMarker = function (turn, cell) {
    if (turn % 2 !== 0) {
      cell.classList.add("x");
    } else if (turn % 2 === 0) {
      cell.classList.add("circle");
    }
  };

  // Function to check for winner after each marker insertion
  const checkWinner = function (board) {
    // Checking for winning combination in the rows
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 2; col++) {
        if (
          board[row][0] === board[row][1] &&
          board[row][1] === board[row][2]
        ) {
          return board[row][0];
        }
      }
    }

    // Checking for winning condition in the columns
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 2; col++) {
        if (
          board[0][col] === board[1][col] &&
          board[1][col] === board[2][col]
        ) {
          return board[0][col];
        }
      }
    }

    // Checking for winning condition in both the diagonals
    if (
      (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      if (board[1][1] !== null) {
        return board[1][1];
      }
    }
  };

  return {
    start,
    addToArray,
    addVisualMarker,
    checkWinner,
  };
})();

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
  Game.start();
});
