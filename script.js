'use strict';
//Selecting elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEL0 = document.getElementById('current--0');
const currentEL1 = document.getElementById('current--1');
const playerEL0 = document.querySelector('.player--0');
const playerEL1 = document.querySelector('.player--1');
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let player = true;
//Starting conditions

//function

//reset and switch to another player
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentEL0.textContent = 0;
  currentEL1.textContent = 0;

  diceEL.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playerEL0.classList.add('player--active');
  playerEL1.classList.remove('player--active');

  player = true;
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
};
const switchFunction = function () // no argument and parameter inside of it
{
  //setting up 0 for interface
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switching process
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEL0.classList.toggle('player--active');
  playerEL1.classList.toggle('player--active');
};

init();

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  if (player) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchFunction();
    }
  }
});
//Hold buttion
btnHold.addEventListener('click', function () {
  if (player) {
    //add current score to score of active player
    score[activePlayer] += currentScore;
    // if active play === 1, the current score is gonna be the score of player 1
    // display the score of player 1
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 10) {
      player = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
      player = false;
    } else {
      switchFunction();
    }
  }
});

// refresh the game
btnNew.addEventListener('click', init);
//set everything back to initial condition
