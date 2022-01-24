console.log("Итог самопроверки: 110/110 \n -Верстка проходит тестирование на валидность +10 \n -Верстка семантическая, присутствуют все необходимые элементы +20 \n -Верстка соответствует макету в Pixel Perfect +48 \n -Все требования к CSS соблюденны +12 \n -Все требования интерактивности соблюденны +20");

const menu = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
const menuItem = document.querySelectorAll('.navigation-item');
const imgs = document.querySelectorAll('.portfolio__gallary-item');
const portfolioBtns = document.querySelectorAll('.portfolio__btns-item');


changeImagesAfterClick(imgs, portfolioBtns);

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

function changeImagesAfterClick(imgs, btns) {
   btns.forEach(el => {
      el.addEventListener('click', () => {
         btns.forEach(el => {
            el.classList.remove('chosen');
         })
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