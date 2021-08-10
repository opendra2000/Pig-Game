'use strict';

//declaring variables for the classes and ids to make it easy to work with
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//variables for button elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, activePlayer, currentScore, playing;
//function for resetting the game when new game is pressed
const neww = function () {
  //starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //active player at first
  player1El.classList.remove('player--active');
};

neww();

//function for switiching the player//this is refactoring the code: reducing the repetition of code without changing the functionality of code
const switchh = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggling automatically deactivates the active one and acitvates the deactivated one
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//adding clck event for roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`; // displays dice image on basis of random roll
    diceEl.classList.remove('hidden'); //at the beginning of game the dice is hidden, once you click roll it should appear

    //add the score to current score until 1
    //the current score should be increase of the active player only
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    //switch player
    else {
      switchh();
    }
  }
});

//if the player wants to hold the score, the current score should be added to the total score of the player
//all current score should be reset after that
//dice should be hidden again
//active player should be toggled
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[`${activePlayer}`] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if the total score of any player goes greater or equal to 10 winner is declared
    if (scores[activePlayer] >= 20) {
      //changing the active player
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchh();
  }
});

//reset the game for new play
btnNew.addEventListener('click', neww); //no () is included becuase i want it to execute only when it is pressed
