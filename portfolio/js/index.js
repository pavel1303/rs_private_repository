import i18Obj from "./translite.js";
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------Выпадающее меню---------------------------------------*/
/*--------------------------------------------------------------------------------------*/
const menu = document.querySelector('.burger');
const nav = document.querySelector('.navigation');

menu.addEventListener('click', showMenu);
nav.addEventListener('click', showMenu)

function showMenu() {
   nav.classList.toggle('active');
   menu.classList.toggle('active');
}

/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*----------------------------Смена картинок в портфолио--------------------------------*/
/*--------------------------------------------------------------------------------------*/
const portfBtns = document.querySelector('.portfolio__btns');

portfBtns.addEventListener('click', (event) => {
   let btn = event.target.closest('button');
   let season = btn.dataset.season;

   if (!btn) return;

   if (!portfBtns.contains(btn)) return;

   if (btn.nodeName === 'BUTTON') {
      portfBtns.querySelectorAll('button').forEach(btn => btn.classList.remove('chosen'));
      btn.classList.add('chosen');
      changeImage(season);
   }
})

function changeImage(season) {
   let gallary = document.querySelectorAll('.portfolio__gallary-item');
   gallary.forEach((img, i) => {
      img.src = `assets/img/${season}/${i + 1}.jpg`;
   })
}
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------Preloader для картинок--------------------------------*/
/*--------------------------------------------------------------------------------------*/

const seasons = ['winter', 'spring', 'summer', 'autumn'];

preloaderImages(seasons);

function preloaderImages(arr) {
   arr.forEach(el => {
      for (let i = 1; i <= 6; i++) {
         const img = new Image();
         img.src = `assets/img/${el}/${i}.jpg`;
      }
   })
}

/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*-----------------------------------Мультиязычность------------------------------------*/
/*--------------------------------------------------------------------------------------*/

const languages = document.querySelector('.language');

languages.addEventListener('click', (event) => {
   let actualLang = event.target.textContent;
   localStorage.setItem('lang', actualLang);
   changeLanguage(actualLang);
})

function changeLanguage(lang) {
   let words = document.querySelectorAll('[data-i18n]');
   languages.querySelectorAll('a').forEach(a => {
      if (a.textContent === lang) {
         a.classList.add('checked');
      } else {
         a.classList.remove('checked');
      }
   })

   words.forEach(word => word.textContent = `${i18Obj[lang][word.dataset.i18n]}`);
}
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------Работа с LocalStorage---------------------------------*/
/*--------------------------------------------------------------------------------------*/
function getLocalStorage() {
   if (localStorage.getItem('lang')) {
      const curLang = localStorage.getItem('lang');
      changeLanguage(curLang);
   }
   if (localStorage.getItem('theme')) {
      const curTheme = localStorage.getItem('theme');
      changeTheme(curTheme);
   }
}
window.addEventListener('load', getLocalStorage)
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*---------------------------------------Смена темы-------------------------------------*/
/*--------------------------------------------------------------------------------------*/
const elemForChange = document.querySelectorAll('[data-theme]');
const themeToggle = document.querySelector('.theme');
let actualTheme = 'dark';


themeToggle.addEventListener('click', () => {
   let arrTheme = ['dark', 'light'];
   let newTheme = arrTheme.filter(el => el != actualTheme).join();
   changeTheme(newTheme);
})

function changeTheme(theme) {
   const themeBtn = themeToggle.querySelector('use');
   themeBtn.dataset.themeToggle = theme;
   themeBtn.href.baseVal = `assets/svg/sprite.svg#${theme}`
   actualTheme = theme;
   localStorage.setItem('theme', actualTheme);
   if (actualTheme === 'light') {
      elemForChange.forEach(el => el.classList.add('sun-theme'));
   } else {
      elemForChange.forEach(el => el.classList.remove('sun-theme'));
   }

}
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
/*---------------------------------------Видео плеер------------------------------------*/
/*--------------------------------------------------------------------------------------*/
const play = document.querySelector('.play-pause');
const volumeSlider = document.querySelector('.volume__slider');
const volumeFill = document.querySelector('.volume__slider-filled')
const volume = document.querySelector('.volume__button');
const video = document.querySelector('video');
const button = document.querySelector('.button__icon-player');
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled');
const videoPoster = document.querySelector('.video-player');
let acctualVol = 0;


function changeVolume() {
   let acctualVol = event.offsetX / volumeSlider.clientWidth;
   volumeFill.style.width = `${acctualVol * 100}%`
   video.volume = acctualVol > 0.08 ? acctualVol : 0;
   volume.childNodes[1].href.baseVal = acctualVol > 0.08 ? 'assets/svg/video/sprite.svg#volume' : 'assets/svg/video/sprite.svg#mute';
}
function skip(event) {
   let acctualTime = event.offsetX / (progress.clientWidth / 100);
   progressBar.style.width = `${acctualTime}%`;
   video.currentTime = video.duration / 100 * acctualTime;
}
function firstPlayVideo() {
   const videoPlayer = document.querySelector('.video-player-video');
   videoPoster.style.height = 'auto';
   videoPlayer.style.visibility = 'visible';
   button.style.display = 'none';
   play.childNodes[1].href.baseVal = 'assets/svg/video/sprite.svg#pause';
   play.classList.remove('toggle');
   video.play();
}
function playPauseToggle() {
   if (play.classList.contains('toggle')) {
      play.childNodes[1].href.baseVal = 'assets/svg/video/sprite.svg#pause';
      play.classList.remove('toggle');
      button.style.display = 'none';
      video.play();
   } else {
      play.childNodes[1].href.baseVal = 'assets/svg/video/sprite.svg#play';
      play.classList.add('toggle');
      button.style.display = 'block';
      video.pause();
   }
}
function muteVolumeToggle() {
   if (volume.classList.contains('toggle')) {
      volume.childNodes[1].href.baseVal = 'assets/svg/video/sprite.svg#mute';
      acctualVol = video.volume;
      video.volume = 0;
      volumeFill.style.width = `${video.volume * 100}%`
      volume.classList.remove('toggle')
   } else {
      volume.childNodes[1].href.baseVal = 'assets/svg/video/sprite.svg#volume';
      video.volume = acctualVol;
      volumeFill.style.width = `${video.volume * 100}%`
      volume.classList.add('toggle')
   }
}
volumeSlider.addEventListener('click', changeVolume);
video.addEventListener('timeupdate', () => {
   progressBar.style.width = `${100 / video.duration * video.currentTime}%`
})
progress.addEventListener('click', skip);
button.addEventListener('click', firstPlayVideo);
play.addEventListener('click', playPauseToggle);
volume.addEventListener('click', muteVolumeToggle);



