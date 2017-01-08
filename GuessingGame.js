function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
};

Game.prototype.difference = function() {
	var diff = this.winningNumber - this.playersGuess;
	return diff > 0 ? diff : -diff;
};

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber; 
};

Game.prototype.playersGuessSubmission = function(num) {
	return this.checkGuess(num);
};

Game.prototype.checkGuess = function(num) {
	if(num < 1 || num > 100 || typeof num !== "number") {
		throw "That is an invalid guess.";
	} else if(num === this.winningNumber) {
		return "You Win!"
	} else if(this.pastGuesses.includes(num)) {
		return "You have already guessed that number."
	} else {
		this.playersGuess = num;
		this.pastGuesses.push(num);
	}

	var diff = this.difference();

	if(this.pastGuesses.length === 5) {
		return "You Lose."
	} else if(diff < 10) {
		return "You're burning up!"
	} else if(diff < 25) {
		return "You're lukewarm."
	} else if(diff < 50) {
		return "You're a bit chilly."
	} else {
		return "You're ice cold!"
	}

};

Game.prototype.provideHint = function() {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	// hintArray.push(this.winningNumber);
	// hintArray.push(generateWinningNumber());
	// hintArray.push(generateWinningNumber());

	shuffle(hintArray);

	return hintArray;
};

function newGame() {
	return new Game();
};

function generateWinningNumber() {
	var number = Math.ceil(Math.random() * 100);
	return number;
};

function shuffle(array) {
  var remaining = array.length, last, randomRemaining;

  while (remaining) {
    randomRemaining = Math.floor(Math.random() * remaining--);

    last = array[remaining];
    array[remaining] = array[randomRemaining];
    array[randomRemaining] = last;
  }
  return array;
};

function guessSubmitted(game) {
	var guess = $('#player-input').val();
	$('#player-input').val();
	var output = game.playersGuessSubmission(parseInt(guess, 10));
	console.log(output);
}

$('document').ready(function() {
	var game = new Game();
	$('#submit-button').click(function(e) {
		guessSubmitted(game);
	});
});