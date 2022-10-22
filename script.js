"use strict";

// === Global variables === //
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
const playerScore = query(".player-score-number");
const AIScore = query(".ai-score-number");

// === Game controller === //
// Init game variables
// let Game.turn, Game.hasWon, Game.maxRounds, Game.playerOneChoices: [], Game.playerTwoChoices, Game.AIchoices;
// Player or AI clicks

// Handle menu buttons
query(".lower-section").addEventListener("click", function menuButtons(e) {
  switch (e.target.classList[0]) {
    case "play-new-game":
      init();
      break;
    default:
      break;
  }
});

// === Game objects and functions === //
// Game factory
const Game = {
  turn: 0,
  hasWon: false,
  maxRounds: 9,
  playerOneChoices: [],
  playerTwoChoices: [],
  AIchoices: [],
};
// Player one factory
const PlayerOne = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    Game.playerOneChoices.push(+e.target.id);
    e.target.insertAdjacentHTML(
      "afterbegin",
      `<p class="mark-circle clicked"></p>`
    );
    checkForWin(Game.playerOneChoices);
    if (!Game.hasWon) {
      Game.turn = 1;
    }
  },
};
// Player two factory
const PlayerTwo = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    Game.turn = 0;
    e.target.insertAdjacentHTML("afterbegin", `<p class="mark-cross">✖</p>`);
  },
};
// AI factory
const AI = {
  currentScore: 0,
  totalScore: 0,

  insertSymbol(e) {
    Game.AIchoices.push(+e.target.id);
    e.target.insertAdjacentHTML("afterbegin", `<p class="mark-cross">✖</p>`);
    checkForWin(Game.AIchoices);
    if (!Game.hasWon) {
      Game.turn = 0;
    }
  },
};
// Initialize game
const init = () => {
  endGameView.innerHTML = playingBoard.innerHTML = "";
  playingBoard.style.visibility = "visible";
  endGameView.style.visibility = "hidden";
  Game.turn = 0;
  Game.hasWon = false;
  Game.maxRounds = 9;
  Game.playerOneChoices = [];
  Game.playerTwoChoices = [];
  Game.AIchoices = [];
  initGameField();
  query(".game-field-container").addEventListener("click", oneRound);
};
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
      Game.hasWon = true;
      return;
    }
  }
};
// Handle game end (win, draw, lose)
const renderWinner = () => {
  playingBoard.style.visibility = "hidden";
  endGameView.style.visibility = "visible";

  if (Game.hasWon) {
    // Handle playerOne win
    if (Game.turn === 0) {
      playerScore.textContent = PlayerOne.totalScore = ++PlayerOne.currentScore;
      endGameView.insertAdjacentHTML(
        "afterbegin",
        `
        <h1>You win :)</h1>
        <h3>Congratulations for the beautiful, challenging and exhausting game.</h3>
        <p>Start a new game or choose from the other options.</p>
        `
      );
      // Handle AI win
    } else {
      AIScore.textContent = AI.totalScore = ++AI.currentScore;
      endGameView.insertAdjacentHTML(
        "afterbegin",
        `
          <h1>AI wins :(</h1>
          <h3>Better luck next time!</h3>
          <p>Start a new game or choose from the other options.</p>
          `
      );
    }
    // Handle tie
  } else {
    endGameView.insertAdjacentHTML(
      "afterbegin",
      `
          <h1>Tie!</h1>
          <p>
          Start a new game or choose from the other
          options.
          </p>
          `
    );
  }
};
// Initialize game field
const initGameField = () => {
  for (let i = 1; i <= 9; i++) {
    playingBoard.insertAdjacentHTML(
      "afterbegin",
      `<div class="game-box" id="${i}"></div>`
    );
  }
};
// One round game logic
const oneRound = (e) => {
  // Check if the click is withing a game box which is not already marked
  if (
    !e.target.classList.contains("game-box") ||
    e.target.classList.contains("clicked")
  )
    return;
  e.target.classList.add("clicked");
  Game.turn === 0 ? PlayerOne.insertSymbol(e) : AI.insertSymbol(e);
  Game.maxRounds--;
  if (Game.maxRounds > 0) {
    if (Game.hasWon) {
      query(".game-field-container").removeEventListener("click", oneRound);
      setTimeout(renderWinner, 1000);
    }
  } else {
    setTimeout(renderWinner, 1000);
  }
};
init();

// MAKE AI

const AIbrain = () => {
  [...playingBoard.children].map((element) => console.log(element.id));
};

AIbrain();
