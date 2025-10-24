const cardsArray = [{
    'name': '1',
    'img': 'images/1.png',
  },
  {
    'name': '2',
    'img': 'images/2.png',
  },
  {
    'name': '3',
    'img': 'images/3.png',
  },
  {
    'name': '4',
    'img': 'images/4.png',
  },
  {
    'name': '5',
    'img': 'images/5.png',
  },
  {
    'name': '6',
    'img': 'images/6.png',
  },
  {
    'name': '7',
    'img': 'images/7.png',
  },
  {
    'name': '8',
    'img': 'images/8.png',
  },
  {
    'name': '9',
    'img': 'images/9.png',
  },
  {
    'name': '10',
    'img': 'images/10.png',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
