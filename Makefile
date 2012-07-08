calculator.js: calculator.jison calculator-tail.js
	jison -m js calculator.jison -o Calculator.js
	cat calculator-tail.js >>Calculator.js
	mv Calculator.js calculator.js
