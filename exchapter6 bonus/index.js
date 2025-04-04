const costInput = document.getElementById('cost');
const litersInput = document.getElementById('liters');
const calculateButton = document.getElementById('calculate');
const totalCostDisplay = document.getElementById('totalCost');

// Event listener for the Calculate button
calculateButton.addEventListener('click', () => {
  const cost = parseFloat(costInput.value);
  const liters = parseFloat(litersInput.value);
  const total = (cost * liters).toFixed(2);
  totalCostDisplay.textContent = `Total cost: $${total}`;
});

// RGB Game Logic
const rgbDisplay = document.getElementById('rgbDisplay');
const colorOptions = document.getElementById('colorOptions');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

let score = 0;
let lives = 3;
let correctColor = '';

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateGame() {
  colorOptions.innerHTML = '';
  feedback.textContent = '';
  restartButton.style.display = 'none';

  correctColor = randomRGB();
  rgbDisplay.textContent = correctColor;

  const correctIndex = Math.floor(Math.random() * 3);

  for (let i = 0; i < 3; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    const color = i === correctIndex ? correctColor : randomRGB();
    colorBox.style.backgroundColor = color;
    colorBox.addEventListener('click', () => handleGuess(color === correctColor));
    colorOptions.appendChild(colorBox);
  }
}

function handleGuess(isCorrect) {
  if (isCorrect) {
    score++;
    feedback.textContent = 'Correct!';
  } else {
    lives--;
    feedback.textContent = 'Wrong!';
  }
  updateScore();
  if (lives > 0) {
    setTimeout(generateGame, 1000);
  } else {
    feedback.textContent = 'Game Over!';
    restartButton.style.display = 'inline-block';
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} | Lives: ${lives}`;
}

// Restart the game
restartButton.addEventListener('click', () => {
  score = 0;
  lives = 3;
  updateScore();
  generateGame();
});

// Initialize game on page load
generateGame();
