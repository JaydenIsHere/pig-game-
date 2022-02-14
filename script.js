'use strict';

//target the element

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
//a player current total score

const diceItself = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
//handle reset the game

const btnRoll = document.querySelector('.btn--roll');
//generate random number on dice

const btnHold = document.querySelector('.btn--hold');
//pull the dice score into player total score

//starting the condistion
let scores; //player 1 & player 2
let currentScore;
let currentUser;
let activePlayer; //keep track which player is active player
let playing;

const init = () => {
  scores = [0, 0]; //player 1 & player 2
  currentScore = 0;
  currentUser = 0;
  activePlayer = 0; //keep track which player is active player
  playing = true;
  //a hook that tell javascript stop the game !!
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceItself.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //make class flexible and set value back to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //retargeting element if current user is 0 then we change to 1
  currentScore = 0;
  //reset currentScore
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //toggle css current user effect
};

//User rolls dice

//1.press btn generate random number
btnRoll.addEventListener('click', () => {
  if (playing) {
    //only we are playing then can generate number
    diceItself.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceItself.src = `dice-${dice}.png`;
    //2.accumulating the dice score on current score
    if (dice !== 1) {
      currentScore += dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; //we set the logic on switchPlay function already
    } else {
      //3.if dice is 1 switch player
      switchPlayer();
    }
  }
});

//User holds score
btnHold.addEventListener('click', () => {
  if (playing) {
    //1.add the current score into player total score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Now I have ability to dynamically use activePlayer
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceItself.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //show the winner effect on the activePlayer
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //remove the active effect on activePlayer
    } else {
      //2.switch player
      switchPlayer();
    }
  }
});

//User resets game
btnNew.addEventListener('click', init);
