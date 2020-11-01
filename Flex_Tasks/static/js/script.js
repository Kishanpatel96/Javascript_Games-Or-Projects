// Challange 1
function ageInDays(){
	let birthYear = prompt('What year were you born... Good Friend?');
	let currentYear = new Date().getFullYear();
	let daysOfAge = (currentYear - birthYear) * 365;
	let resultH1 = document.createElement('h1');
	let textAnswer = document.createTextNode('You are ' + daysOfAge + ' days old!');
	resultH1.setAttribute('id', 'ageInDays');
	resultH1.appendChild(textAnswer);
	document.getElementById('flex-box-result').appendChild(resultH1);
}
function reset()
{
	document.getElementById('ageInDays').remove();
}

// Challange 2
function generateCat()
{
	const image = document.createElement('img');
	const div = document.getElementById('flex-cat-generator-div');
	image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
	div.appendChild(image);
}

// Challange 3
function rpsGame(yourChoice)
{
	let humanChoice, botChoice;
	humanChoice = yourChoice.id;
	botChoice = numberToChoice(randTORpsInt());
	results = decideWinner(humanChoice,botChoice);
	message = finalMessage(results);
	rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randTORpsInt()
{
	return Math.floor(Math.random() * 3);
}

function numberToChoice(number)
{
	return ["rock","paper","scissors"][number];
}

function decideWinner(yourChoice,computerChoice)
{
	let rpsDatabase = {
		'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
		'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
		'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
	}

	let yourScore = rpsDatabase[yourChoice][computerChoice];
	let computerScore = rpsDatabase[computerChoice][yourChoice];

	return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore])
{
	if( yourScore === 0 ){
		return { 'message' : 'You lost!', 'color': 'red'};
	}
	else if(yourScore === 0.5){
		return { 'message' : 'You tied!', 'color': 'yellow'};
	}
	else{
		return { 'message' : 'You won!', 'color': 'green'};
	}
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
	let imagesDatabase = {
		'rock': document.getElementById('rock').src,
		'paper': document.getElementById('paper').src,
		'scissors': document.getElementById('scissors').src,
	}

	// Remove All images
	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

	let humanDiv = document.createElement('div');
	let botDiv = document.createElement('div');
	let messageDiv = document.createElement('div');

	humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height = 150 width = 150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
	messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] + "</h1>";
	botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height = 150 width = 150 style='box-shadow: 0px 10px 50px rgba(240, 38, 24, 1)'>";


	document.getElementById('flex-box-rps-div').appendChild(humanDiv);
	document.getElementById('flex-box-rps-div').appendChild(messageDiv);
	document.getElementById('flex-box-rps-div').appendChild(botDiv);
	
}

// Challenge 4:
let all_buttons = document.getElementsByTagName('button');
let copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++)
{
	copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy)
{
	if (buttonThingy.value === 'red'){
		for(let i = 0; i < all_buttons.length; i++)
		{
			all_buttons[i].classList.remove(all_buttons[i].classList[1]);
			all_buttons[i].classList.add('btn-danger');
		}
	}

	if (buttonThingy.value === 'green'){
		for(let i = 0; i < all_buttons.length; i++)
		{
			all_buttons[i].classList.remove(all_buttons[i].classList[1]);
			all_buttons[i].classList.add('btn-success');
		}
	}

	if (buttonThingy.value === 'reset'){
		for(let i = 0; i < all_buttons.length; i++)
		{
			all_buttons[i].classList.remove(all_buttons[i].classList[1]);
			all_buttons[i].classList.add(copyAllButtons[i]);
		}
	}

	if (buttonThingy.value === 'random'){
		let choice = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

		for(let i = 0; i < all_buttons.length; i++)
		{
			let randomNumber = Math.floor(Math.random() * 4);
			all_buttons[i].classList.remove(all_buttons[i].classList[1]);
			all_buttons[i].classList.add(choice[randomNumber]);
		}
	}
}
