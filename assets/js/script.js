const cards = document.querySelectorAll ('.memory-card');

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.toggle('flip');
  if (!hasFlipped) {
    //First click
    hasFlipped = true;
    firstCard = this;
  } else {
    //Second click
    hasFlipped = false;
    secondCard = this;
    //Do cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      //It's a match!
      firstCard.removeEventListener('click', flipCard)
      secondCard.removeEventListener('click', flipCard)
    } else {
      //Not a match!
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
      }, 1000);
    }
}
}

cards.forEach(card => card.addEventListener('click', flipCard));
