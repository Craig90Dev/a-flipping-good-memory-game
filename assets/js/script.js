const cards = document.querySelectorAll ('.memory-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

//Flip card function
function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlipped) {
    //First click
    hasFlipped = true;
    firstCard = this;

    return;
  } 
  //Second click
  secondCard = this;
  //Do cards match?
  checkForMatch();
}

//Check for match function
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//It's a match!
function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  incrementScore();
  resetBoard();
}

//It's not a match!
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    loseLife();
    resetBoard();
  }, 1000);
}

//Add score function
function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;
  return;
}

//Lose life function
function loseLife() {
  let oldLives = parseInt(document.getElementById('lives').innerText);
  document.getElementById('lives').innerText = --oldLives;

  if (oldLives === 0) {
    gameOver();
    unflipAllCards();
  } else {
    return;
  }
}

//Game over function
function gameOver() {
  cards.forEach(card => {
    cards.removeEventListener('click');
  })
  console.log('Game is over');
}
//Reset board function
function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Shuffle cards function. In brackets to exectute on game start
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();


