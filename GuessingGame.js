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
	if(num < 1 || num > 100 || typeof num !== "number") {
		throw "That is an invalid guess.";
	}
	this.playersGuess = num;
	return this.checkGuess();
};

Game.prototype.checkGuess = function() {
	if(this.playersGuess === this.winningNumber) {
		$("#hint-button, #submit-button").prop("disabled", true);
		$("#subtitle").text("You have defeated me, human. Wipe This Game From Memory to play again.");
		return "You win.";
	} else {
		if(this.pastGuesses.includes(this.playersGuess)) {
			return "You have already guessed that number.";
		} else {
			this.pastGuesses.push(this.playersGuess);
			// var guessClass = '".g' + this.pastGuesses.length + '"';
			// console.log(guessClass);
			// $(guessClass).text(this.playersGuess);
			$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
			if(this.pastGuesses.length === 5) {
				$("#hint-button, #submit-button").prop("disabled", true);
				$("#subtitle").text("Wipe This Game From Memory to start anew.")
				return "You have lost, human.";
			} else {
				var diff = this.difference();
				if(this.isLower()) {
					$("#subtitle").text("Aim your sights higher...");
				} else {
					$("#subtitle").text("Look below for the winning answer...");
				}
				if(diff < 10) {
					return "You are quite close!"
				} else if(diff < 25) {
					return "You are tepid."
				} else if(diff < 50) {
					return "You are a bit chilly."
				} else {
					return "You are ice cold!"
				}
			}
		}
	}

	



};

Game.prototype.provideHint = function() {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];

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
	$("#title").text(output);
}

$('document').ready(function() {
	var game = new Game();
	$('#submit-button').click(function(e) {
		guessSubmitted(game);
		$('#player-input').val('');
	});

	// $('#player-input').keypress(function(event) {
	// 	if (event.which == 13)
	// 		$('#player-input').val('');
	// 		guessSubmitted(game);
	// });

	$("#hint-button").click(function() {
		var hints = game.provideHint();
		$("#title").text("Test your luck with one of these perhaps: " + hints[0] + ", " + hints[1] + ", " + hints[2]);
	});

	$("#reset-button").click(function() {
		game = newGame();
		$("#title").text("The Great Roboto's Guessing Game");
    	$("#subtitle").text("The Great Roboto has a number in mind. Prevail by guessing the correct number between 1 and 100. Use your 5 guesses wisely, human.");
    	$(".guess").text("-");
    	$("#hint, #submit").prop("disabled",false);
	})
});