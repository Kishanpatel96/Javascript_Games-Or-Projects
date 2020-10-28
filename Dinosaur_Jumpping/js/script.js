/*
Fetching all etlements.
*/
let character = document.getElementById("character");
let block = document.getElementById("block");
let pausedButton = document.getElementById("pausedButton");
let resumeButton = document.getElementById("resumeButton");
let playButton = document.getElementById("startGameButton");
let printScore = document.getElementById("printScore");
let totalScoreTag = document.getElementById("totalScore");
let resultModel = document.getElementById("resultModel");
// Assigning initial values.
block.classList.add("pause");
let grayBorderOfButton = "3px solid #e7e7e7";
let gameStart = false;
let total = 0;
let pause = false;

// Function call on space.
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
 		jump();
    }
}
// Function used to pause the game.
function pauseFunction()
{
	if(block.classList != "pause"){
		block.classList.remove("animate");
		block.classList.add("pause");
		changeButtonCSS(true, pausedButton, resumeButton);
	}
}
// Function used to resume the game.
function resumeFunction()
{
	if(block.classList != "animate"){
		block.classList.remove("pause");
		block.classList.add("animate");
		if (playButton.disabled !== "disabled")
		{
			playButton.style.border = grayBorderOfButton;
			playButton.disabled = true;
			gameStart = true;
		}
		changeButtonCSS(false, resumeButton, pausedButton);
	}
}
// Function used to change CSS of buttons
function changeButtonCSS(pauseValue, firstButton, secoundButton)
{
	if (gameStart !== false){
		pause = pauseValue;
		secoundButton.disabled = false;
		secoundButton.style.border = "3px solid #f44336";
		firstButton.disabled = true;
		firstButton.style.border = grayBorderOfButton;
	}
}
// Jumping the character.
function jump()
{
	if(character.classList != "animate" && pause !== true && gameStart !== false){
		character.classList.add("animate");
		new Audio('Sound/jump.wav').play();
		total += 1;
		printScore.innerHTML = "Score : " + total;
	}
	setTimeout(function(){
		character.classList.remove("animate");
	},500);
}
// Checking game over or not.
let checkDead = setInterval(function(){
	let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

	if (blockLeft < 225 && blockLeft > 175 && characterTop >= 400 )
	{
		new Audio('Sound/game_over.mp3').play();
		gameStart = false;
		block.style.animation = "none";
		block.style.display = "none";
		totalScoreTag.innerHTML = total;
		resultModel.style.display = "block";		
	}
},1);
