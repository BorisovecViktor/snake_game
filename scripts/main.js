'use strict';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const field = new Image();
const foodImg = new Image();

field.src = 'images/field.png';
foodImg.src = 'images/food.png';

const box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

const snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(e) {
  if (e.keyCode === 37 && dir !== 'right') {
    dir = 'left';
  } else if (e.keyCode === 38 && dir !== 'down') {
    dir = 'up';
  } else if (e.keyCode === 39 && dir !== 'left') {
    dir = 'right';
  } else if (e.keyCode === 40 && dir !== 'up') {
    dir = 'down';
  }
}

const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const overlay = document.querySelector('.overlay');

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game);

      modalText.innerHTML = `
      <p>You Loose :(</p>
      <span>Score: ${score}</span>
      `;
      modal.classList.add('modal--active');
      overlay.classList.add('overlay--active');
    }
  }
}

function drawSnake() {
  ctx.drawImage(field, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'rgb(2, 75, 2)' : 'rgb(4, 155, 4)';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score += 10;

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17
    || snakeY < box * 3 || snakeY > box * 17) {
    clearInterval(game);

    modalText.innerHTML = `
    <p>You Loose :(</p>
    <span>Score: ${score}</span>
    `;
    modal.classList.add('modal--active');
    overlay.classList.add('overlay--active');
  }

  switch (dir) {
    case 'left': snakeX -= box; break;
    case 'right': snakeX += box; break;
    case 'up': snakeY -= box; break;
    case 'down': snakeY += box;
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

const game = setInterval(drawSnake, 150);

const restartGame = document.querySelector('.modal__button');

restartGame.addEventListener('click', () => {
  location.reload();
});
