const url = 'https://api.themoviedb.org/3/search/movie?query=marvel&api_key=3fd2be6f0c70a2a598f084ddfb75487c';

async function getData() {
   const res = await fetch(url);
   const data = await res.json();
   console.log(data);
   createBlock(data);
}
getData();

const mainContent = document.querySelector('.main__content');



function createBlock(data) {
   const block = document.createElement('div');
   const img = document.createElement('img');
   img.src = `https://image.tmdb.org/t/p/w1280${data.results[3].backdrop_path}`;
   const title = document.createElement('h2');
   const description = document.createElement('p');
   const descriptionFull = document.createElement('p');
   block.classList.add('main__content-item');
   block.append(img, title, description, descriptionFull);
   mainContent.append(block);
}

