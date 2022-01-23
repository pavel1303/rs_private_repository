console.log("Итог самопроверки: 110/110 \n -Верстка проходит тестирование на валидность +10 \n -Верстка семантическая, присутствуют все необходимые элементы +20 \n -Верстка соответствует макету в Pixel Perfect +48 \n -Все требования к CSS соблюденны +12 \n -Все требования интерактивности соблюденны +20");

const menu = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
menu.addEventListener('click', () => {
   nav.classList.toggle('active');
   menu.classList.toggle('active');
})

const menuItem = document.querySelectorAll('.navigation-item');

menuItem.forEach(el => {
   el.addEventListener('click', () => {
      nav.classList.remove('active');
      menu.classList.remove('active');
   })
})
