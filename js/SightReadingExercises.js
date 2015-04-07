/***************************************************************
 ********* LIBRARY: Sight Reading Exercises Vs. 1.2.1 **********
 ***************************************************************/

var SightReadingExercises = function() {
	this.note = 1;
};

(function() {

	var NOTE = '<b>\u25EF</b>';
	var DASH = '\u2015';
	var DASHES = 5;
	var SPCE = ' ';

	var NEW_LINE = '\n';
	var NEW_LINE_HTML = '<br />';
	var EMPTY_STRING = '';

	var ASCII_A = 65;
	var ASCII_B = 66;
	var ASCII_F = 70;
	var ASCII_G = 71;
	var SCALE_SIZE = 7;
	var MIN = 1
	var MAX = 21;

	function rand(inf, sup) {
		return Math.floor(Math.random()*sup + inf);
	}

	SightReadingExercises.noteName = function(note, cleff) {
		var code;
		if (cleff == 'f') {
			code = ASCII_A + (note%SCALE_SIZE - 1);
			if (code < ASCII_A) {
				code = ASCII_G + code - ASCII_A + 1;
			}
		} else {
			code = ASCII_F + (note%SCALE_SIZE - 1);
			if (code > ASCII_G) {
				code = ASCII_A + code - ASCII_G - 1;
			}
		}
		return String.fromCharCode(code);
	};

	SightReadingExercises.prototype.currentNote = function() {
		return this.note;
	};

	SightReadingExercises.prototype.currentNoteName = function(cleff) {
		return SightReadingExercises.noteName(this.note, cleff);
	};

	SightReadingExercises.prototype.nextNote = function() {
		var next = rand(MIN, MAX);
		while (next == this.note) {
			next = rand(MIN, MAX);
		}
		this.note = next;
		return this.note;
	};

	function dashes(out, lineOrEspace, note) {
		var buffer = [];
		for (var i = 0 ; i < DASHES ; i++) {
			if (out) {
				if (i == (DASHES - 1)) {
					buffer.push(DASH);
				} else {
					buffer.push(SPCE);
				}
			} else {
				buffer.push(DASH);
			}
		}
		if (out) {
			buffer.push(lineOrEspace == note ? NOTE : DASH);
		}
		for (var i = -1 ; i < DASHES ; i++) {
			if (out) {
				if (i < DASHES - 1) {
					if (i == -1) {
						buffer.push(DASH);
					} else {
						buffer.push(SPCE);
					}
				}
			} else {
				if (i == -1) {
					buffer.push(lineOrEspace == note ? NOTE : DASH);
				} else {
					buffer.push(DASH);
				}
			}
		}
		return buffer.join(EMPTY_STRING);
	}

	function spaces(lineOrEspace, note) {
		var buffer = [];
		for (var i = 0 ; i < DASHES ; i++) {
			buffer.push(SPCE);
		}
		buffer.push(lineOrEspace == note ? NOTE : SPCE);
		for (var i = -1 ; i < DASHES ; i++) {
			buffer.push(SPCE);
		}
		return buffer.join(EMPTY_STRING);
	}

	function createStaff(note) {
		var buffer = [];
		var max = MAX / 2;
		var lineOrEspace = MAX;
		for (var i = 0 ; i < max ; i++) {
			var out = i < 3 || i > 7;
			buffer.push((out ? SPCE : DASH) + dashes(out, lineOrEspace--, note) + (out ? SPCE : DASH));
			if (i < (max - 1)) {
				buffer.push(SPCE + spaces(lineOrEspace--, note));
			}
		}
		return buffer;
	}

	SightReadingExercises.prototype.toString = function(id) {
		var buffer = createStaff(this.note);
		if (id) {
			var display = document.getElementById(id);
			display.innerHTML = buffer.join(NEW_LINE_HTML);
			return null;
		} else {
			return buffer.join(NEW_LINE);
		}
	};

})();

/******************************************************************************************************
 ******************************************************************************************************/
 