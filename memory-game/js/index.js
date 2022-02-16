let cards = document.querySelectorAll('.mem-card');
let game = document.querySelector('.game');
let hasFlipedCard = false;
let firstCard, secondCard;
let locCard = false;

function flipCard(el) {
   if (locCard) return;
   if (firstCard === el) return;
   el.classList.add('flip');
   if (!hasFlipedCard) {
      hasFlipedCard = true;
      firstCard = el;
      return;
   } else {
      secondCard = el;
      hasFlipedCard = false;
      if (firstCard.dataset.snoop === secondCard.dataset.snoop) {
         disableCard();
      } else {
         unflipCards();
      }
   }
}

function disableCard() {
   locCard = true;
   firstCard.removeEventListener('mousedown', flipCard);
   firstCard.removeEventListener('mousedown', flipCard);
   setTimeout(() => {
      newStep();
   }, 1500)
}

function unflipCards() {
   locCard = true;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      newStep();
   }, 1500)
}
function shake() {
   cards.forEach(card => {
      card.style.order = Math.floor(Math.random() * 12);
   });
}

function newStep() {
   hasFlipedCard = false;
   locCard = false;

   firstCard = null;
   secondCard = null;
}

game.addEventListener('mousedown', (event) => {
   let card = event.target.closest('.mem-card');
   if (!card) return;
   flipCard(card);
})

shake();