const cards = document.querySelectorAll ('.memory-card');

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.toggle('flip');
  if (!hasFlipped) {
    //first click
    hasFlipped = true;
    firstCard = this;
  } else {
    //second click
    hasFlipped = false;
    secondCard = this;
    //do cards match?

  }
}

cards.forEach(card => card.addEventListener('click', flipCard));
  
