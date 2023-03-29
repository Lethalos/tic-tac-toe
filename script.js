const gameManager = (() => {
  const player1 = "X";
  const player2 = "O";
  let currentPlayer = player1;

  let gameStatus = {
    isFinished: false,
  };

  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

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
    if (gameStatus.isFinished) {
      turnText.innerText = `Game finished!`;
      return;
    }
    turnText.innerText = `It's ${player}'s turn`;
  };

  const updateWinnerText = (player) => {
    let winnerText = document.querySelector(".winner-text");
    winnerText.innerText = `Player ${player} won!`;
  };

  return {
    gameStatus,
    setCurrentPlayer,
    getCurrentPlayer,
    changeCurrentPlayer,
    updateTurnText,
    updateWinnerText,
  };
})();

const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");

  const putX = (cell) => {
    cell.innerText = "X";
  };

  const putO = (cell) => {
    cell.innerText = "O";
  };

  const isGameFinished = () => {
    let currentPlayer = gameManager.getCurrentPlayer();

    if (
      cells[0].innerText === currentPlayer &&
      cells[1].innerText === currentPlayer &&
      cells[2].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[3].innerText === currentPlayer &&
      cells[4].innerText === currentPlayer &&
      cells[5].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[6].innerText === currentPlayer &&
      cells[7].innerText === currentPlayer &&
      cells[8].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[0].innerText === currentPlayer &&
      cells[3].innerText === currentPlayer &&
      cells[6].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[1].innerText === currentPlayer &&
      cells[4].innerText === currentPlayer &&
      cells[7].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[2].innerText === currentPlayer &&
      cells[5].innerText === currentPlayer &&
      cells[8].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[0].innerText === currentPlayer &&
      cells[4].innerText === currentPlayer &&
      cells[8].innerText === currentPlayer
    ) {
      return true;
    }
    if (
      cells[2].innerText === currentPlayer &&
      cells[4].innerText === currentPlayer &&
      cells[6].innerText === currentPlayer
    ) {
      return true;
    }

    return false;
  };

  const disableBoard = () => {
    console.log("game finished");
    cells.forEach((cell) => {
      cell.removeEventListener("click", cellHandler);
      cell.classList.toggle("disabled");
    });
  };

  const cellHandler = (event) => {
    let currentPlayer = gameManager.getCurrentPlayer();

    if (event.target.innerText === "" && currentPlayer === "X") {
      putX(event.target);

      if (isGameFinished()) {
        gameManager.updateWinnerText(currentPlayer);
        gameManager.gameStatus.isFinished = true;
        disableBoard();
      }

      gameManager.changeCurrentPlayer();
      currentPlayer = gameManager.getCurrentPlayer();
      gameManager.updateTurnText(currentPlayer);
    } else if (event.target.innerText === "" && currentPlayer === "O") {
      putO(event.target);

      if (isGameFinished()) {
        gameManager.updateWinnerText(currentPlayer);
        gameManager.gameStatus.isFinished = true;
        disableBoard();
      }

      gameManager.changeCurrentPlayer();
      currentPlayer = gameManager.getCurrentPlayer();
      gameManager.updateTurnText(currentPlayer);
    }
  };

  const initBoard = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", cellHandler);
      cell.classList.remove("disabled");
    });
  };

  return { initBoard };
})();

const playerButtons = [
  document.querySelector(".player-x"),
  document.querySelector(".player-o"),
];

playerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.disable = true;
    gameManager.setCurrentPlayer(button.innerText);
    gameManager.updateTurnText(gameManager.getCurrentPlayer());
  });
});

gameBoard.initBoard();
