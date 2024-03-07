//Gameboard IIFE
const Gameboard = (function () {
  let gameboard = [
    ["", "", "hello YOU"],
    ["", "", ""],
    ["", "", ""],
  ];

  const render = function () {
    const body = document.body;
    const gridContainer = document.getElementById("grid-container");

    for (let rowNumber = 0; rowNumber <= 2; rowNumber++) {
      for (let colNumber = 0; colNumber <= 2; colNumber++) {
        const cell = document.createElement("div");
        cell.setAttribute("row-number", rowNumber);
        cell.setAttribute("col-number", colNumber);
        cell.classList.add("cell");
        gridContainer.appendChild(cell);
      }
    }
    body.appendChild(gridContainer);
  };

  return {
    render,
  };
})();

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
  Gameboard.render();
});
