(function() {

	var sre, score, didFirstClick;

	var DELAY_ERROR = 225;
	var DELAY_SUCCESS = 175;
	var DELAY_AGAIN = 125;

	var KEY_A = 65;
	var KEY_G = 71;

	var ONE_MINUTE = 60;
	var CLASS_DISABLED = 'disabled';

	function again() {
		var body = document.body;
		body.className = 'again';
		initSre();
		enableAnswers();
		enableCleffs();
		didFirstClick = false;
		score.reset();
		setTimeout(normal, DELAY_AGAIN);
	}

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
		didFirstClick = true;
	}

	function answerClick(element) {
		if (!didFirstClick) {
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
					enableAnswers();
					normal();
				}, DELAY_SUCCESS
			);
		} else {
			element.disabled = true;
			element.checked = false;
			element.parentNode.className = CLASS_DISABLED;
			error();
		}
	}

	function enableAnswers() {
		var answers = allAnswers();
		for (var i = 0 ; i < answers.length ; i++) {
			var answer = answers[i];
			answer.checked = false;
			answer.disabled = false;
			answer.parentNode.className = '';
		}
	}

	function disableAnswers() {
		var answers = allAnswers();
		for (var i = 0 ; i < answers.length ; i++) {
			var answer = answers[i];
			answer.checked = false;
			answer.disabled = true;
			answer.parentNode.className = CLASS_DISABLED;
		}
	}

	function disableCleffs() {
		var cleffs = allCleffs();
		for (var i = 0 ; i < cleffs.length ; i++) {
			var currentCleff = cleffs[i];
			currentCleff.disabled = true;
			currentCleff.parentNode.className = CLASS_DISABLED;
		}
	}

	function enableCleffs() {
		var cleffs = allCleffs();
		for (var i = 0 ; i < cleffs.length ; i++) {
			var currentCleff = cleffs[i];
			currentCleff.disabled = false;
			currentCleff.parentNode.className = '';
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

	function end(time, total1, total2) {
		var buffer = [];
		buffer.push('Results:');
		buffer.push('');
		buffer.push('   Total time: '+time);
		buffer.push('');
		buffer.push('       Success: '+total1);
		buffer.push('       Errors: '+total2);
		buffer.push('');
		buffer.push('');
		buffer.push('Again?\n');
		var playAgain = confirm(buffer.join('\n'));
		if (playAgain) {
			again();
		} else {
			disableAnswers();
			disableCleffs();
		}
	}

	function initSre() {
		sre = new SightReadingExercises();
		sre.toString('staff');
	}

	function initSreLayout() {
		var answers = allAnswers();
		for (var i = 0 ; i < answers.length ; i++) {
			var answer = answers[i];
			answer.checked = false;
			answer.disabled = false;
			answer.addEventListener('click', function() { answerClick(this); } );
		}
		var cleffs = allCleffs();
		for (var i = 0 ; i < cleffs.length ; i++) {
			var cleff = cleffs[i];
			cleff.disabled = false;
			cleff.addEventListener('change', function() { cleffClick(this); } );
		}
	}

	function initScore() {
		score = new TimedScore('time', 'total-success', 'total-error');
		score.setLimit(ONE_MINUTE, end);
		window.addEventListener('keyup', function(event) { event = event || window.event; keyUp(event.keyCode ? event.keyCode : event.which); }, false);
	}

	function start() {
		initSre();
		initSreLayout();
		initScore();
	}

	window.addEventListener('load', start, false);

})();
