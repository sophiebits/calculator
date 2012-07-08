calculator.js: calculator.jison calculator-tail.js
	jison -m js calculator.jison -o build/Calculator.js
	cat calculator-tail.js >>build/Calculator.js
	mv build/Calculator.js build/calculator.js
