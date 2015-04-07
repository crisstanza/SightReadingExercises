var sre;

(function() {

	var sre, score;

	var DELAY_ERROR = 225;
	var DELAY_SUCCESS = 175;

	var KEY_A = 65;
	var KEY_G = 71;

	function success() {
		var body = document.body;
		body.className = 'success';
		score.add1();
	}

	function error() {
		var body = document.body;
		body.className = 'error';
		setTimeout(normal, DELAY_ERROR);
		score.add2();
	}

	function normal() {
		var body = document.body;
		body.className = '';
	}

	function allAnswers() {
		return document.querySelectorAll('div.answer input[type=radio]');
	}

	function allCleffs() {
		return document.querySelectorAll('div.cleff input');
	}

	function newTurn() {
		sre.nextNote();
		sre.toString('staff');
	}

	function cleff() {
		var cleffs = allCleffs();
		for (var i = 0 ; i < cleffs.length ; i++) {
			var currentCleff = cleffs[i];
			if (currentCleff.checked) {
				return currentCleff.value;
			}
		}
	}

	function firstClick() {
		score.start();
		firstClick = undefined;
	}

	function answerClick(element) {
		if (firstClick) {
			firstClick();
		}
		if (element.value == sre.currentNoteName(cleff())) {
			success();
			var answers = allAnswers();
			for (var i = 0 ; i < answers.length ; i++) {
				var answer = answers[i];
				answer.disabled = true;
			}
			setTimeout(
				function() {
					newTurn();
					var answers = allAnswers();
					for (var i = 0 ; i < answers.length ; i++) {
						var answer = answers[i];
						answer.checked = false;
						answer.disabled = false;
						answer.parentNode.className = '';
					}
					normal();
				}, DELAY_SUCCESS
			);
		} else {
			element.disabled = true;
			element.checked = false;
			element.parentNode.className = 'disabled';
			error();
		}
	}

	function cleffClick(element) {
		var answers = allAnswers();
		for (var i = 0 ; i < answers.length ; i++) {
			var answer = answers[i];
			answer.checked = false;
			answer.disabled = false;
			answer.parentNode.className = '';
		}
	}

	function keyUp(key) {
		if (key >= KEY_A && key <= KEY_G) {
			var char = String.fromCharCode(key);
			var answer = document.querySelector('div.answer input[type=radio][value='+char+']');
			if (answer && !answer.disabled) {
				answer.click(answer);
			}
		}
	}

	function start() {
		sre = new SightReadingExercises();
		sre.toString('staff');
		var answers = allAnswers();
		for (var i = 0 ; i < answers.length ; i++) {
			var answer = answers[i];
			answer.addEventListener('click', function() { answerClick(this); } );
		}
		var cleffs = allCleffs();
		for (var i = 0 ; i < cleffs.length ; i++) {
			var cleff = cleffs[i];
			cleff.addEventListener('change', function() { cleffClick(this); } );
		}
		score = new TimedScore('time', 'total-success', 'total-error');
		window.addEventListener('keyup', function(event) { event = event || window.event; keyUp(event.keyCode ? event.keyCode : event.which); }, false);
	}

	window.addEventListener('load', start, false);

})();
