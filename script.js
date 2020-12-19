'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
let currentPLayer0 = document.querySelector('#current--0');
let currentPlayer1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//==============================================================
// To activate them from init function
let scores, currentScore, activePlayer, game;

// initialization - Starting conditions
const init = function () {
  scores = [0, 0]; // Starting players scores
  currentScore = 0; // Starting current score
  activePlayer = 0; // Starting each player score
  game = true; // Is the game started

  score0El.textContent = 0; // PLAYER 1 - total score
  score1El.textContent = 0; // PLAYER 2 - total score
  currentPLayer0.textContent = 0; // PLAYER 1 - current score
  currentPlayer1.textContent = 0; // PLAYER 1 - current score

  diceEl.classList.add('hidden'); // Hide the dice picture, at start.

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // Starting from PLAYER 1 - active
  player1El.classList.remove('player--active');
};

init();

//==============================================================
// Reusable for Switching the player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Now its activePlayer = 1.
  currentScore = 0; // We start from score 0
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//==============================================================
// Rolling dice funcionality
function rollingDice() {
  if (game) {
    // Dice generator, number: 1 - 6.
    let dice = Math.trunc(Math.random() * 6) + 1;
    // Dice pictures visible and set picture to a number.
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}` // 0
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
}

//==============================================================
// Holding score funcionality
function holdingScore() {
  if (game) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      game = false; //Game is false -> buttons not going to execute
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
}

//==============================================================
// Game reset funcionality
function gameReset() {
  init();
}

//==============================================================
btnRoll.addEventListener('click', rollingDice);
btnHold.addEventListener('click', holdingScore);
btnNew.addEventListener('click', gameReset);
