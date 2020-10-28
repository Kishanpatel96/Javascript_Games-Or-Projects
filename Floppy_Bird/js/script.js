var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
let playButton = document.getElementById("startGameButton");
let totalScoreTag = document.getElementById("totalScore");
let resultModel = document.getElementById("resultModel");
var jumpping = 0;
var counter = 0;
var gameStart = false;
let grayBorderOfButton = "3px solid #e7e7e7";
block.classList.add("pause");
hole.classList.add("pause");
playButton.addEventListener("click", startGameFunction);

hole.addEventListener('animationiteration',() => {
	var random = -((Math.random()*300)+600);
	hole.style.top = random + "px";
	counter++;
	printScore.innerHTML = "Score : " + counter;
});

setInterval(function(){
	if (gameStart){
	var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	if ( jumpping == 0 ){
		character.style.top = (characterTop + 3) + "px";
	}

	var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
	var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
	var cTop = -(900 - characterTop);
		if((characterTop > 835) || ((blockLeft < 66)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+110))))
		{
			new Audio('Sound/game_over.mp3').play();
			gameStart = false;
			block.style.animation = "none";
			block.style.display = "none";
			hole.style.animation = "none";
			hole.style.display = "none";
			totalScoreTag.innerHTML = counter;
			resultModel.style.display = "block";
			counter = 0;
		}
	}
},10);

// Function call on space.
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
 		jump();
    }
}

function jump(){
	if (gameStart){
	jumpping = 1;
	let jumpCount = 0;
	var jumpInterval = setInterval(function(){
		var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
		if ((characterTop > 6) && (jumpCount < 15))
		{
			character.style.top = (characterTop - 10) + "px";
		}
		if(jumpCount > 20)
		{
			clearInterval(jumpInterval);
			jumpping = 0;
			jumpCount = 0;
		}
		jumpCount++;
	},10);
	}
}

// Function used to resume the game.
function startGameFunction()
{
	if(block.classList != "animate" && hole.classList != "animate"){
		block.classList.remove("pause");
		hole.classList.remove("pause");
		block.classList.add("animate");
		hole.classList.add("animate");
		gameStart = true;
		if (playButton.disabled !== "disabled")
		{
			playButton.style.border = grayBorderOfButton;
			playButton.disabled = true;
			gameStart = true;
		}
		changeButtonCSS(resumeButton, pausedButton);
	}
}
// Function used to change CSS of buttons
function changeButtonCSS(firstButton, secoundButton)
{
	if (gameStart !== false){
		secoundButton.disabled = false;
		secoundButton.style.border = "3px solid #f44336";
		firstButton.disabled = true;
		firstButton.style.border = grayBorderOfButton;
	}
}