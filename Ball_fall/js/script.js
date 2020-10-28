// Declare all variables
let character = document.getElementById("character");
let game = document.getElementById("game");
let interval;
let both = 0;
let counter = 0;
let currentBlocks = [];
let pause = true;

/*
* Start moving on keyup.
*/
document.addEventListener("keydown", event => {
	if ( both === 0){
		both++;
		if (event.key === "ArrowLeft")
		{
			interval = setInterval(moveLeft, 1);
		}
		if (event.key === "ArrowRight")
		{
			interval = setInterval(moveReight, 1);
		}
	}
});

/*
* Remove moving on keyup.
*/
document.addEventListener("keyup", event =>{
	clearInterval(interval);
	both = 0;
})

/*
* Move a character left.
*/
function moveLeft(){
	let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	if ( !pause && left > 0) {
		character.style.left = left - 5 + "px";
	}
}

/*
* Move a character right.
*/
function moveReight(){
	let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	if ( !pause && left < 1070){
		character.style.left = left + 5 + "px";
	}
}

/*
* Resume/Start a game.
*/
function resumeGame()
{
	pause = false;
}

/*
* Pause a game.
*/
function pauseGame()
{
	pause = true;
}

/*
* Create a first time block.
*/
function createFirstBlockAndHole(blockLastTop, holeLastTop)
{
	let firstTimeBlocks = document.createElement("div");
	let firstTimeHoles = document.createElement("div");
	let random = Math.floor(Math.random() * 700);
	firstTimeBlocks.setAttribute("class","block");
	firstTimeHoles.setAttribute("class","hole");
	firstTimeBlocks.setAttribute("id","block"+counter);
	firstTimeHoles.setAttribute("id","hole"+counter);
	firstTimeBlocks.style.top = blockLastTop + 100 + "px";
	firstTimeHoles.style.top = holeLastTop + 100 + "px";
	firstTimeHoles.style.left = random + "px";
	game.appendChild(firstTimeBlocks);
	game.appendChild(firstTimeHoles);
	currentBlocks.push(counter);
	counter++;
}

/*
* Create a continue blocks and hole.
*/
let blocks = setInterval(function(){
	let blockLast = document.getElementById("block"+(counter - 1));
	let holeLast = document.getElementById("hole"+(counter - 1));
	if ( counter > 0)
	{
		var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
		var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
	}

	if (blockLastTop < 750 || counter === 0){
		createFirstBlockAndHole(blockLastTop, holeLastTop);
	}
	let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	let drop = 0;
	// Checking character touched the top posistion.
	if (characterTop <= 0)
	{
		new Audio('sound/game_over.mp3').play();
		document.getElementById("totalScore").innerHTML = (counter-9);
		document.getElementById("resultModel").style.display = "block";
		clearInterval(blocks);
	}
	// Game is paused or not.
	if (!pause){
		for (let i = 0; i < currentBlocks.length; i++) {
			let current = currentBlocks[i];
			let continuosBlocks = document.getElementById("block"+current);
			let continuosholes = document.getElementById("hole"+current);
			let iblockTop = parseFloat(window.getComputedStyle(continuosBlocks).getPropertyValue("top"));
			let iholeLeft = parseFloat(window.getComputedStyle(continuosholes).getPropertyValue("left"));
			continuosBlocks.style.top = iblockTop - 1 + "px";
			continuosholes.style.top = iblockTop - 1 + "px";
			// Block goes out of game then remove it from memory.
			if (iblockTop < -20)
			{
				currentBlocks.shift();
				continuosBlocks.remove();
				continuosholes.remove();
			}
			if (iblockTop - 20 < characterTop && iblockTop > characterTop)
			{
				drop++;
				if ( iholeLeft <= characterLeft && iholeLeft + 80 >= characterLeft)
				{
					drop = 0;
				}
			}
		}
		// Fall below character from hole.
		if (drop === 0)
		{
			if (characterTop < 750){
				character.style.top = characterTop + 2 + "px";
			}
		}
		else
		{
			character.style.top = characterTop - 1 + "px";
		}
	}
},1);
