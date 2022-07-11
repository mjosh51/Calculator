// I plan to update non-functional keys of this app later


const CLICK = 'click';


const calculator = {
  inputText: '',
  firstOperand: null,
  preSecondOperand: false,
  operator: null
}

const getInput = (input) => {
  const { inputText, preSecondOperand } = calculator;
  if (preSecondOperand === true) {
    calculator.inputText = input;
    calculator.preSecondOperand = false;
  } else {
    calculator.inputText = inputText === '' ? input : inputText + input;
  }
  console.log(calculator);
}

const checkDecimal = (dot) => {
  if (!calculator.inputText.includes(dot)) {
    calculator.inputText += dot;
  }

  // Fix decimal bug
  if (calculator.preSecondOperand === true) {
    calculator.inputText = '0.';
    calculator.preSecondOperand = false;
    return;
  }
}

const handleOperator = (nextOperator) => {
  // Same as const firstOperand = calculator.firstOperand for each property -- it is called Destructuring
  const { firstOperand, inputText, operator } = calculator;
  // Convert inputText value to floating number(s)
  const inputValue = parseFloat(inputText);

  // Overriding previous operator after firstOperand
  if (operator && calculator.preSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = compute(firstOperand, inputValue, operator);
    calculator.inputText = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.preSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const compute = (firstOperand, secondOperand, operator) => {
  if (operator === '+') {
    return firstOperand + secondOperand;
  }
  else if (operator === '-') {
    return firstOperand - secondOperand;
  }
  else if (operator === '*') {
    return firstOperand * secondOperand;
  }
  else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

const clear = () => {
  calculator.inputText = '',
  calculator.firstOperand = null,
  calculator.preSecondOperand = false,
  calculator.operator = null
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector('.display-text-input');
  display.value = calculator.inputText;
}

updateDisplay();

const keys = document.querySelector('.calc-rows');
keys.addEventListener(CLICK, (event) => {
  const target = event.target;
  const value = target.value;

  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '/':
    case '*':
    case '-':
    case '+':
    case '=':
      handleOperator(value)
      break;
    case '.':
      checkDecimal(value)
      break;
    case 'clear-all':
      clear();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        getInput(value);
      }
  }
  updateDisplay();
});



