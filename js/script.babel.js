'use strict';

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

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;
var score = 0; // Initialize score
var timer = 60; // Set timer for 60 seconds
var timerInterval;

// Update score display
var scoreDisplay = document.getElementById('score');
scoreDisplay.textContent = 'Score: ' + score;

// Update timer display
var timerDisplay = document.getElementById('timer');
timerDisplay.textContent = 'Time: ' + timer;

// Start the timer function
function startTimer() {
  timerInterval = setInterval(function () {
    timer--;
    timerDisplay.textContent = 'Time: ' + timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Your score: ' + score);
      // Optionally, reset the game here
    }
  }, 1000);
}

// Add event listener to the "Got it!" button
var gotItButton = document.querySelector('.btn.btn-primary');
gotItButton.addEventListener('click', function() {
  startTimer(); // Start the timer when the button is clicked
});

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
  score++; // Increment score on match
  scoreDisplay.textContent = 'Score: ' + score; // Update score display
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList .add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
      if (firstGuess === secondGuess) {
        match();
        resetGuesses();
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
  }
});