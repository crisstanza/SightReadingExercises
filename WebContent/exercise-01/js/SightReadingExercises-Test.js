function SightReadingExercisesTest() {
	this.sre = new SightReadingExercises();
}

// SightReadingExercisesTest.beforeClass = function() {};
// SightReadingExercisesTest.afterClass = function() {};
// SightReadingExercisesTest.prototype.before = function() {};
// SightReadingExercisesTest.prototype.after = function() {};

SightReadingExercisesTest.prototype.testCurrent = function() {
	this.sre.note = 1;
	var expected = 1;
	var current = this.sre.currentNote();
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testRangeCurrent = function() {
	var expected = { min: 1, max: 21 };
	var current = this.sre.currentNote();
	JSUS.assertBetween(expected.min, current, expected.max);
};

SightReadingExercisesTest.prototype.testRangeNext = function() {
	var expected = { min: 1, max: 21 };
	var current = this.sre.nextNote();
	JSUS.assertBetween(expected.min, current, expected.max);
};

SightReadingExercisesTest.prototype.testName1 = function() {
	var note = 1;
	var expected = 'F';
	var current = SightReadingExercises.noteName(note);
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testName2 = function() {
	var note = 2;
	var expected = 'G';
	var current = SightReadingExercises.noteName(note);
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testName3 = function() {
	var note = 3;
	var expected = 'A';
	var current = SightReadingExercises.noteName(note);
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testName8 = function() {
	var note = 8;
	var expected = 'F';
	var current = SightReadingExercises.noteName(note);
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testName21 = function() {
	var note = 21;
	var expected = 'E';
	var current = SightReadingExercises.noteName(note);
	JSUS.assertEquals(expected, current);
};

SightReadingExercisesTest.prototype.testToString = function() {
	var current = this.sre.toString();
	JSUS.assertNotNull(current);
};

(function() {
	function start() {
		if (typeof JSUS != 'undefined') {
			var jsus = new JSUS(SightReadingExercisesTest);
			// jsus.start('display');
			jsus.start();
			jsus.end();
		}
	}
	window.addEventListener('load', start, false);
})();
