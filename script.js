"use strict";

// Global variables
const query = document.querySelector.bind(document);
const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const endGameView = query(".end-game-view");
const playingBoard = query(".playing-board");

// Game controller
let turn, hasWon, maxRounds, playerOneChoices, playerTwoChoices, AIChoices;

// Initialize or reset game
const init = () => {
  turn = 0;
  hasWon = false;
  maxRounds = 9;
  playerOneChoices = [];
  playerTwoChoices = [];
  AIChoices = [];
};

init();

//// Game objects
// Player one factory
const PlayerOne = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    playerOneChoices.push(+e.target.id);
    e.target.insertAdjacentHTML(
      "afterbegin",
      `<p class="mark-circle clicked"></p>`
    );
    checkForWin(playerOneChoices);
    if (!hasWon) {
      turn = 1;
    }
  },
};
// Player two factory
const PlayerTwo = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    turn = 0;
    e.target.insertAdjacentHTML("afterbegin", `<p class="mark-cross">✖</p>`);
  },
};
// AI factory
const AI = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    AIChoices.push(+e.target.id);
    e.target.insertAdjacentHTML("afterbegin", `<p class="mark-cross">✖</p>`);
    checkForWin(AIChoices);
    if (!hasWon) {
      turn = 0;
    }
  },
};

// Player or AI clicks
query(".game-field-container").addEventListener("click", function oneRound(e) {
  --maxRounds;
  if (maxRounds === 0) setTimeout(renderWinner, 1000);
  if (
    !e.target.classList.contains("game-box") ||
    e.target.classList.contains("clicked")
  )
    return;
  e.target.classList.add("clicked");
  turn === 0 ? PlayerOne.insertSymbol(e) : AI.insertSymbol(e);

  //Check if we have a winner during the current round
  if (hasWon) {
    query(".game-field-container").removeEventListener("click", oneRound);
    setTimeout(renderWinner, 1000);
  }
});

// Check if the player or AI won after the current round
const checkForWin = (playerArray) => {
  for (const combo of winCombinations) {
    let currentCombo = combo.slice();
    playerArray.map((num) => {
      const currentIndex = currentCombo.indexOf(num);
      if (currentIndex === -1) return;
      currentCombo.splice(currentIndex, 1);
    });
    if (currentCombo.length === 0) {
      hasWon = true;
      return;
    }
  }
};
// Handle game end (win, draw, lose)
const renderWinner = () => {
  playingBoard.style.visibility = "hidden";
  endGameView.style.visibility = "visible";

  if (hasWon) {
    endGameView.insertAdjacentHTML(
      "afterbegin",
      `
  <h1>${turn === 0 ? "You win :)" : "AI wins :("}</h1>
  <h3 class>
    ${
      turn === 0
        ? "Congratulations for the beautiful, challenging and exhausting game."
        : "Better luck next time!"
    }
  </h3>
  <p>
    Start a new game or choose from the other
    options.
  </p>
`
    );
  } else {
    endGameView.insertAdjacentHTML(
      "afterbegin",
      `
  <h1>Draw!</h1>
  <p>
    Start a new game or choose from the other
    options.
  </p>
`
    );
  }
};
