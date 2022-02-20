var trial = rand = 0;
var dictSize = 3501;
var theWord;

function randWord() {
	rand = ((Math.floor(Math.random() * 4096)) % dictSize);
	theWord = dict[rand];
//	document.getElementById("gameArea").innerHTML += theWord + " " + rand + " ";
	leftGuess = 14;
	trial = 0;
	document.getElementById("noGuess").innerHTML = "Guesses left: " + leftGuess;
	document.getElementById("someGuess").focus();
}

function retryIt() {
	if(trial > 7)
		for(trial; trial > 7; trial--)
			document.getElementById("rTab").deleteRow(1);
	for(trial; trial > 0; trial--)
		document.getElementById("lTab").deleteRow(1);
	leftGuess = 14;
	trial = 0;
	document.getElementById("noGuess").innerHTML = "Guesses left: " + leftGuess;
	document.getElementById("someGuess").focus();
}

function playAgain() {
	if(trial > 7)
		for(trial; trial > 7; trial--)
			document.getElementById("rTab").deleteRow(1);
	for(trial; trial > 0; trial--)
		document.getElementById("lTab").deleteRow(1);
	randWord();
	document.getElementById("menu").style.visibility = "visible";
	document.getElementById("gameArea").style.visibility = "visible";
	document.getElementById("word").style.visibility = "hidden";
	document.getElementById("final").style.visibility = "hidden";
}


function giveUp() {
	if(trial > 7)
		for(trial; trial > 7; trial--)
			document.getElementById("rTab").deleteRow(1);
	for(trial; trial > 0; trial--)
		document.getElementById("lTab").deleteRow(1);
	gameLost();
}

function checkGuess() {
	document.getElementById("error1").style.visibility = "hidden";
	document.getElementById("error2").style.visibility = "hidden";
	var guessElement = document.getElementById("someGuess");
	var theGuess = someGuess.value;
	theGuess = theGuess.toUpperCase(theGuess);
	var splitGuess = theGuess.split("");
	var size = 4;

	if(checkRepeat() == 1) {
		document.getElementById("error1").style.visibility = "visible";
		document.getElementById("someGuess").value = "";
	}
	else if(compareGuess() == 1) {
		trial++;
		var bull = countBull();
		var cow = countCow() - bull;
		if(trial < 8) {
			var left = document.getElementById("lTab");
			var row = left.insertRow(trial);
			row.insertCell(0).innerHTML = theGuess;
			row.insertCell(1).innerHTML = cow;
			row.insertCell(2).innerHTML = bull;
		}
		if(trial > 7) {
			var right = document.getElementById("rTab");
			var row = right.insertRow(trial-7);
			row.insertCell(0).innerHTML = theGuess;
			row.insertCell(1).innerHTML = cow;
			row.insertCell(2).innerHTML = bull;
		}

		leftGuess--;
		document.getElementById("noGuess").innerHTML = "Guesses left: " + leftGuess;

		if(trial < 14 && bull == 4)
			gameWon();
		else if(trial >= 14)
			gameLost();

		document.getElementById("someGuess").focus();
		document.getElementById("someGuess").value = "";
	}

	else {
		document.getElementById("error2").style.visibility = "visible";
		document.getElementById("someGuess").value = "";
	}

	function createCell(cell, text) {
		var div = document.createElement('div');
		var txt = document.createTextNode(text);
		div.appendChild(txt);
		cell.appendChild(div);
	}


	function compareGuess() {
	 	if(dict.indexOf(theGuess) >= 0)
			return 1;
		return 0;	
	}

	function checkRepeat() {
		for (var i = 0; i < size; i++)
			for (var j = i+1; j < size; j++)
				if (theGuess[i] == theGuess[j])
					return 1;
		return 0;
	}

	function countBull() {
		var b = 0;
		for (var i = 0; i < size; i++)
			if(theGuess[i] == theWord[i])
				b++;
		return b;
	}

	function countCow() {
		var c = 0;
 		for (var i = 0; i < size; i++)
			for (var j = 0; j < size; j++)
				if (theGuess[i] == theWord[j])
					c++;
    		return c;
	}
}

function gameLost() {
	document.getElementById("menu").style.visibility = "hidden";
	document.getElementById("gameArea").style.visibility = "hidden";
	document.getElementById("final").style.visibility = "visible";
	document.getElementById("final").innerHTML = "<div id=\"word\"><\/div><div id=\"gameOver\"><\/div>" + "You could not guess!" + "</br>" + "The word was:";
	document.getElementById("final").innerHTML += "<input class=\"options\" type=\"button\" value=\"PLAY AGAIN\" onClick=\"playAgain(); return false;\">"
	document.getElementById("final").innerHTML += "</br></br></br>" + "Was this so tough?";
	document.getElementById("word").style.visibility = "visible";
	document.getElementById("word").innerHTML = "\"" + theWord + "\"";
}

function gameWon() {
	document.getElementById("menu").style.visibility = "hidden";
	document.getElementById("gameArea").style.visibility = "hidden";
	document.getElementById("final").style.visibility = "visible";
	document.getElementById("final").innerHTML = "<div id=\"word\"><\/div><div id=\"gameOver\">" + "You guessed it right!" + "</br>" + "The word is:";
	document.getElementById("final").innerHTML += "<input class=\"options\" type=\"button\" value=\"PLAY AGAIN\" onClick=\"playAgain(); return false;\">"
	document.getElementById("final").innerHTML += "</br></br>" + "Did you enjoy?";
	document.getElementById("word").style.visibility = "visible";
	document.getElementById("word").innerHTML = "\"" + theWord + "\"";
}