const gameManager = (() => {
  const player1 = "X";
  const player2 = "O";
  let currentPlayer = player1;

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const changeCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else if (currentPlayer === player2) {
      currentPlayer = player1;
    }
  };

  const updateTurnText = (player) => {
    let turnText = document.querySelector(".turn-text");
    turnText.innerText = `It's ${player}'s turn`;
  };

  return { getCurrentPlayer, changeCurrentPlayer, updateTurnText };
})();

const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");

  const initBoard = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let currentPlayer = gameManager.getCurrentPlayer();
        if (currentPlayer === "X") {
          putX(cell);
          gameManager.changeCurrentPlayer();
          currentPlayer = gameManager.getCurrentPlayer();
          gameManager.updateTurnText(currentPlayer);
        } else if (currentPlayer === "O") {
          putO(cell);
          gameManager.changeCurrentPlayer();
          currentPlayer = gameManager.getCurrentPlayer();
          gameManager.updateTurnText(currentPlayer);
        }
      });
    });
  };

  const putX = (cell) => {
    cell.innerText = "X";
  };

  const putO = (cell) => {
    cell.innerText = "O";
  };

  return { initBoard };
})();

gameManager.updateTurnText(gameManager.getCurrentPlayer());
gameBoard.initBoard();
