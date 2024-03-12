const cards = document.querySelectorAll ('.memory-card');

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.toggle('flip');
  if (!hasFlipped) {
    //First click
    hasFlipped = true;
    firstCard = this;

    return;
  } 
  
  //Second click
  hasFlipped = false;
  secondCard = this;
  //Do cards match?
  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }, 1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));
