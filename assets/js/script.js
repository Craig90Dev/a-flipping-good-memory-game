const cards = document.querySelectorAll ('.memory-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

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

function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;
  return;
}

function loseLife() {
  let oldLives = parseInt(document.getElementById('lives').innerText);
  document.getElementById('lives').innerText = --oldLives;
  return;
}

function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
