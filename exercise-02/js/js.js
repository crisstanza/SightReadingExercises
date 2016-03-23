(function() {

	var DELAY = 1000;

	var NOTES = ['C', 'B', 'A', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'G', 'F', 'E'];

	var SvgUtils = function() {

		this.SVG = document.getElementsByTagName('svg')[0];
		this.LINE = document.getElementById('line');
		this.CIRCLE = document.getElementById('circle');
		this.EXTRA_LINE = document.getElementById('extra-line');
		this.TEXT = document.getElementById('text');

		this.line = function(y) {
			var line = this.LINE.cloneNode(true);
			line.removeAttribute('id');
			this.incAttribute(line, 'y1', y);
			this.incAttribute(line, 'y2', y);
			return line;
		};

		this.circle = function(x, y) {
			var circle = this.CIRCLE.cloneNode(true);
			circle.removeAttribute('id');
			this.incAttribute(circle, 'cx', x);
			this.incAttribute(circle, 'cy', y);
			return circle;
		};

		this.extraLine = function(x, y) {
			var extraLine = this.EXTRA_LINE.cloneNode(true);
			extraLine.removeAttribute('id');
			this.incAttribute(extraLine, 'x1', x - 35);
			this.incAttribute(extraLine, 'x2', x + 35);
			this.incAttribute(extraLine, 'y1', y);
			this.incAttribute(extraLine, 'y2', y);
			return extraLine;
		};

		this.text = function(x, y) {
			var text = this.TEXT.cloneNode(true);
			text.removeAttribute('id');
			this.incAttribute(text, 'x', x);
			this.incAttribute(text, 'y', y);
			return text;
		};

		this.incAttribute = function(element, attributeName, newValue) {
			var currentValue = this.getAttribute(element, attributeName);
			var newValueInc = currentValue * 1 + newValue;
			setAttribute(element, attributeName, newValueInc);
		};

		this.getAttribute = function(element, attributeName) {
			return element.getAttribute(attributeName);
		};

		this.add = function(element) {
			this.SVG.appendChild(element);
		};

	};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var svgUtils = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function init() {
		svgUtils = new SvgUtils();
		addClickEventListener(document.getElementsByTagName('button')[0]);
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function addClickEventListener(button) {
		button.addEventListener('click', function(event) { return buttonOnClick(event, this); });
		button.focus();
	}

	function buttonOnClick(event, button) {
		clean();
		start();
		button.innerHTML = 'restart';
	}

	function clean() {
		var elements = document.getElementsByName('drawing');
		while(elements.length > 0) {
			var element = elements[elements.length - 1];
			element.parentNode.removeChild(element);
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function start() {
		drawLines();
		drawCircles();
		startCounter(document.getElementById('main-counter'));
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function drawLines() {
		for (var i = 1 ; i <= 5 ; i++) {
			var line = svgUtils.line(50 + i*50);
			svgUtils.add(line);
		}
	}

	function drawCircles() {
		for (var i = 1 ; i <= 8 ; i++) {
			var j = rand(1, 13);
			while (j%2 != 1) {
				j = rand(1, 13);
			}
			var circle = svgUtils.circle(i*83, 25 + j*25);
			if (j == 13 || j == 1) {
				drawExtraLine(circle.getAttribute('cx')*1, circle.getAttribute('cy')*1);
			}
			svgUtils.add(circle);
			drawText(circle.getAttribute('cx')*1, circle.getAttribute('cy')*1, j);
		}
	}

	function drawExtraLine(x, y) {
		var extraLine = svgUtils.extraLine(x, y);
		svgUtils.add(extraLine);
	}

	function drawText(x, y, j) {
		var text = svgUtils.text(x, y);
		text.innerHTML = NOTES[j - 1];
		svgUtils.add(text);
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function startCounter(counterDisplay) {
		setInnerHTML(counterDisplay, 8);
		setStyle(counterDisplay, 'visibility', 'visible');
		setTimeout(function() { decCounter(counterDisplay); }, DELAY);
	}
	
	function decCounter(counterDisplay) {
		var value = incInnerHTML(counterDisplay, -1);
		if (value > 0) {
			setTimeout(function() { decCounter(counterDisplay); }, DELAY);
		} else {
			showNotes();
			setStyle(counterDisplay, 'visibility', 'hidden');
		}
	}

	function showNotes() {
		var texts = document.getElementsByTagName('text');
		for (var i = 0 ; i < texts.length ; i++) {
			var text = texts[i];
			setAttribute(text, 'visibility', 'visible');
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function incInnerHTML(element, inc) {
		return (element.innerHTML = element.innerHTML * 1 + inc);
	}

	function setAttribute(element, attributeName, value) {
		element.setAttribute(attributeName, value);
	};

	function setStyle(element, ruleName, value) {
		element.style[ruleName] = value;
	};

	function setInnerHTML(element, value) {
		element.innerHTML = value;
	}

	function rand(inf, sup) {
		return Math.floor((Math.random() * sup) + inf);
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	window.addEventListener('load', function() { init(); });

})();
