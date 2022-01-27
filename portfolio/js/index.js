import i18Obj from "./translite.js";


const menu = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
const menuItem = document.querySelectorAll('.navigation-item');
const imgs = document.querySelectorAll('.portfolio__gallary-item');
const portfolioBtns = document.querySelectorAll('.portfolio__btns-item');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const lang = document.querySelector('.language').querySelectorAll('a');


changeImagesAfterClick(imgs, portfolioBtns);

preloaderImages(seasons);

menu.addEventListener('click', () => {
   nav.classList.toggle('active');
   menu.classList.toggle('active');
})

menuItem.forEach(el => {
   el.addEventListener('click', () => {
      nav.classList.remove('active');
      menu.classList.remove('active');
   })
})

lang.forEach(el => {
   el.addEventListener('click', () => {
      lang.forEach(el => el.classList.remove('checked'));
      el.classList.add('checked');
      changeLanguage(el.textContent);
   })
})

function changeImagesAfterClick(imgs, btns) {
   btns.forEach(el => {
      el.addEventListener('click', () => {
         btns.forEach(el => el.classList.remove('chosen'));
         el.classList.add('chosen');
         let value = el.dataset.season;
         changeImages(imgs, value);
      })
   })
};

function changeImages(imgs, value) {
   imgs.forEach((el, index) => {
      el.src = `assets/img/${value}/${index + 1}.jpg`
   })
}

function preloaderImages(arr) {
   seasons.forEach(el => {
      for (let i = 1; i <= 6; i++) {
         const img = new Image();
         img.src = `assets/img/${el}/${i}.jpg`;
      }
   })
}

function changeLanguage(lang) {
   const words = document.body.querySelectorAll('[data-i18n]');
   words.forEach(el => {
      el.textContent = i18Obj[lang][el.dataset.i18n];
   })
}



