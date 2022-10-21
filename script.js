"use strict";

// Global variables
const query = document.querySelector.bind(document);
const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
// Game controller
let turn = 0;
let maxRounds = 9;
let playerOneChoices = [];
let playerTwoChoices = [];
let AIChoices = [];

// Game objects
// Player one factory
const PlayerOne = {
  currentScore: 0,
  totalScore: 0,
  insertSymbol(e) {},
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
    turn = 0;
    e.target.insertAdjacentHTML("afterbegin", `<p class="mark-cross">✖</p>`);
  },
};

// Player or AI clicks
query(".game-field-container").addEventListener("click", (e) => {
  if (e.target.nodeName !== "DIV" || e.target.classList.contains("clicked"))
    return;
  e.target.classList.add("clicked");
  turn === 0 ? PlayerOne.insertSymbol(e) : AI.insertSymbol(e);
});

// Choice added to player or AI array - handled by player or AI object
PlayerOne.insertSymbol = (e) => {
  turn = 1;
  playerOneChoices.push(+e.target.id);
  e.target.insertAdjacentHTML(
    "afterbegin",
    `<p class="mark-circle clicked"></p>`
  );
};

// Check if player/AI array contains winning combination

// If player/AI wins announce winner and reset game

// If draw announce draw and reset game
