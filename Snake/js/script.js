let lastRenderTime = 0
const SNAKE_SPEED = 5;
const snakeBody = [{x:11, y:11} ];
const gameBoard = document.getElementById('game-board');
let gameFinishModel = document.getElementById('resultModel');
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
let food = getRandomFoodPosition();
let newSegments = 0;
const EXPANSION_RATE = 5;
let gameOver = false;
let pause = false;

function main(currentTime){
	if (gameOver)
	{
		new Audio('sound/game_over.mp3').play();
		return gameFinishModel.style.display = "block";
	}
	window.requestAnimationFrame(main)
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if ( secondsSinceLastRender < 1 / SNAKE_SPEED) return

	lastRenderTime = currentTime;

	update()
	draw()
}

window.requestAnimationFrame(main)

function pauseGame(){
	pause = true;
}

function resumeGame(){
	pause = false;
}

function update(){
	updateSnake();
	updateFood();
	checkDeath();
}

function draw(){
	gameBoard.innerHTML = '';
	drawSnake();
	drawFood();
}

function checkDeath(){
	gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function getSnakeHead()
{
	return snakeBody[0];
}

function outsideGrid(position)
{
	return (position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21);
}

function snakeIntersection(){
	return onSnake(snakeBody[0], { ignoreHead: true })
}

function updateSnake()
{
	if (pause !== true){
	addSegments();
	const inputDirection = getInputDirection();
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] };
	}

	snakeBody[0].x += inputDirection.x;
	snakeBody[0].y += inputDirection.y;
	}
}

function drawSnake()
{
	snakeBody.forEach(segment => {
	    const snakeElement = document.createElement('div')
	    snakeElement.style.gridRowStart = segment.y
	    snakeElement.style.gridColumnStart = segment.x
	    snakeElement.classList.add('snake')
	    gameBoard.appendChild(snakeElement)
  })
}

function updateFood(){
	if (onSnake(food))
	{
		expandSnake(EXPANSION_RATE);
		food = getRandomFoodPosition();
	}
}

function expandSnake(amount)
{
	newSegments += amount;
}

function drawFood(){
	const foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}

function onSnake(position, {ignoreHead = false} = {})
{
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0) return false;
		return equalPositions(segment, position);
	})
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}


function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * 21) + 1,
    y: Math.floor(Math.random() * 21) + 1
  }
}

function outsideGrid(position) {
  return (
    position.x < 1 || position.x > 21 ||
    position.y < 1 || position.y > 21
  )
}