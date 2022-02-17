let cards = document.querySelectorAll('.mem-card');
let game = document.querySelector('.game');
let hasFlipedCard = false;
let firstCard, secondCard;
let locCard = false;
let timerOn = false;
let resetButton = document.querySelector('.reset');
let countAttemps = document.querySelector('.attemps-span');
let counterAttempsCur = 0;

function flipCard(el) {
   if (!timerOn) timer();
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
         countAttemps.textContent = ++counterAttempsCur;
         disableCard();
      } else {
         unflipCards();
         countAttemps.textContent = ++counterAttempsCur;
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

resetButton.addEventListener('click', () => {
   timerStop();
   counterAttempsCur = 0;
   countAttemps.textContent = counterAttempsCur;
   cards.forEach(card => card.classList.remove('flip'));
});


game.addEventListener('mousedown', (event) => {
   let card = event.target.closest('.mem-card');
   if (!card) return;
   flipCard(card);
})

shake();

/* Таймер */

let time = document.querySelector('time');
let sec = 0;
let min = 0;
let t;

function tick() {
   sec++;
   if (sec >= 60) {
      sec = 0;
      min++;
   }
}

function add() {
   tick();
   time.textContent = (min > 9 ? min : '0' + min)
      + ":" + (sec > 9 ? sec : '0' + sec);
   timer();
}

function timer() {
   timerOn = true;
   t = setTimeout(add, 1000);
}

function timerStop() {
   timerOn = false;
   clearTimeout(t);
   time.textContent = '00:00';
   sec = 0;
   mim = 0;
}
