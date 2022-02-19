const cards = document.querySelectorAll('.mem-card');
const game = document.querySelector('.game');
const resetButton = document.querySelector('.reset');
const countAttemps = document.querySelector('.attemps-span');
const tableRows = document.querySelectorAll('.table-row');
const music = document.querySelector('.win');
const popUp = document.querySelector('.popup');
const popUpRes = document.querySelector('.popup__res');
const popUpButton = document.querySelector('.popup__close');
let hasFlipedCard = false;
let firstCard, secondCard;
let locCard = false;
let timerOn = false;
let counterAttempsCur = 0;
let openCards = 0;
let arrResults = [];




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
         openCards++;
         endGame();
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

function newGame() {
   timerStop();
   counterAttempsCur = 0;
   countAttemps.textContent = counterAttempsCur;
   cards.forEach(card => card.classList.remove('flip'));
}

resetButton.addEventListener('click', () => {
   newGame();
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
   min = 0;
}


/*End game */

function endGame() {
   if (openCards === 8) {
      writeRes();
      pushRes();
      showPopup();
      popUpRes.textContent = `Attemps: ${counterAttempsCur}\nTime: ${time.textContent}`;
      setTimeout(newGame, 2000);
      shake();
      openCards = 0;
      localStorage.setItem('results', JSON.stringify(arrResults));

   }
}

function writeRes() {
   arrResults.unshift(`Attemps: ${counterAttempsCur}\nTime: ${time.textContent}`);
}

function pushRes() {
   tableRows.forEach((row, i) => {
      row.textContent = arrResults[i] || '-------';
   })
}


function getLocalStorage() {
   if (localStorage.getItem('results')) {
      arrResults = JSON.parse(localStorage.getItem('results'));
      pushRes();
   }
}
window.addEventListener('load', getLocalStorage);

/* Popup */

function showPopup() {
   popUp.classList.add('open');
   music.play();

}
function hidePopup() {
   popUp.classList.remove('open');
   music.pause();
}
popUpButton.addEventListener('click', hidePopup);



