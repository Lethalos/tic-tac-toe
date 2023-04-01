const gameManager = (() => {
  const player1 = "X";
  const player2 = "O";
  let currentPlayer = player1;

  let gameStatus = {
    isFinished: false,
  };

  const playerButtons = [
    document.querySelector(".player-x"),
    document.querySelector(".player-o"),
  ];

  const resetButton = document.querySelector(".reset-button");

  const startGame = () => {
    gameBoard.disableBoard();
    disableResetButton();
    playerButtons.forEach((button) => {
      button.addEventListener("click", initGame);
    });
  };

  const disablePlayerButtons = () => {
    playerButtons.forEach((button) => {
      button.disabled = true;
      button.removeEventListener("click", initGame);
    });
  };

  const enablePlayerButtons = () => {
    playerButtons.forEach((button) => {
      button.disabled = false;
      button.addEventListener("click", initGame);
    });
  };

  const disableResetButton = () => {
    resetButton.disabled = true;
    resetButton.removeEventListener("click", resetGame);
  };

  const enableResetButton = () => {
    resetButton.disabled = false;
    resetButton.addEventListener("click", resetGame);
  };

  const initGame = () => {
    gameStatus.isFinished = false;
    gameBoard.cleanBoard();
    gameBoard.enableBoard();
    setCurrentPlayer(player1);
    updateTurnText(getCurrentPlayer());
    updateWinnerText("-");
    enableResetButton();
    disablePlayerButtons();
  };

  const resetGame = () => {
    gameStatus.isFinished = false;
    gameBoard.cleanBoard();
    gameBoard.disableBoard();
    updateTurnText("-");
    updateWinnerText("-");
    disableResetButton();
    enablePlayerButtons();
  };

  const finishGame = () => {
    gameStatus.isFinished = true;
    gameBoard.disableBoard();
    updateWinnerText(currentPlayer);
    disableResetButton();
    enablePlayerButtons();
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
    startGame,
    finishGame,
    setCurrentPlayer,
    getCurrentPlayer,
    changeCurrentPlayer,
    updateTurnText,
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

  const cellHandler = (event) => {
    let currentPlayer = gameManager.getCurrentPlayer();

    if (event.target.innerText === "" && currentPlayer === "X") {
      putX(event.target);

      if (isGameFinished()) {
        gameManager.finishGame();
      }

      gameManager.changeCurrentPlayer();
      currentPlayer = gameManager.getCurrentPlayer();
      gameManager.updateTurnText(currentPlayer);
    } else if (event.target.innerText === "" && currentPlayer === "O") {
      putO(event.target);

      if (isGameFinished()) {
        gameManager.finishGame();
      }

      gameManager.changeCurrentPlayer();
      currentPlayer = gameManager.getCurrentPlayer();
      gameManager.updateTurnText(currentPlayer);
    }
  };

  const enableBoard = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", cellHandler);
      cell.classList.remove("disabled");
    });
  };

  const disableBoard = () => {
    cells.forEach((cell) => {
      cell.removeEventListener("click", cellHandler);
      cell.classList.toggle("disabled");
    });
  };

  const cleanBoard = () => {
    cells.forEach((cell) => {
      cell.innerText = "";
    });
  };

  return { enableBoard, disableBoard, cleanBoard };
})();

gameManager.startGame();
