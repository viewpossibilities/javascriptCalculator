const calculator={
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};

//updating displAY
function updateDisplay(){
	const display = document.querySelector('.calculator_display');
	display.value = calculator.displayValue;
}
updateDisplay();

// handling key presses
const keys = document.querySelector('.calculator_keys');
keys.addEventListener('click', (event) => {
	const { target } = event;
	if (!target.matches('button')){return;}
	if (target.classList.contains('operator')){
		console.log('operator', target.value);
		handleOperator(target.value);
		updateDisplay();
		return;
	}
	if (target.classList.contains('decimal')){
		console.log('decimal', target.value);
		inputDecimal(target.value);
	updateDisplay();
		return;
	}
	console.log('digit', target.value);
	inputDigit(target.value);
	updateDisplay();
});

const reset = document.querySelector('.wipeoff');
reset.addEventListener('click', (event) => {
	const target  = event.target;
	if (target.classList.contains('all-clear')){
		resetCalculation();
		updateDisplay();
	}
});

//input digit for the user to see
function inputDigit(digit){
	const {displayValue, waitingForSecondOperand }= calculator;
	
	if(waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand= false;
	}
	else{
	calculator.displayValue = displayValue ==='0'? digit : displayValue +digit;
	}
	console.log(calculator);
}


// inputting decimal point

function inputDecimal (dot){
	if (calculator.waitingForSecondOperand === true) return;
	if (!calculator.displayValue.includes(dot)){
		calculator.displayValue += dot;
	}
}

//handling operators like +,-,etc
function handleOperator(nextOperator){
	const { firstOperand, displayValue, operator} = calculator;
	const inputValue = parseFloat(displayValue);
	
	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		console.log(calculator);
		return;
	}
	
	if (firstOperand === null) {
		calculator.firstOperand = inputValue;
	}
	else if (operator){
		const currentValue = firstOperand || 0;
		const result = performCalculation[operator](firstOperand, inputValue);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}
	
	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
	console.log (calculator);
}

const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
	'=': (firstOperand, secondOperand) => firstOperand = secondOperand,
	
}

function resetCalculation () {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
	console.log(calculator);
}

