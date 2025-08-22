const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let lastOperator = null;
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');
    const action = button.getAttribute('data-action');

    if (number !== null) {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      // Prevent multiple dots
      if (number === '.' && currentInput.includes('.')) return;
      currentInput += number;
      updateDisplay(currentInput);
    } else if (action !== null) {
      handleAction(action);
    }
  });
});

function updateDisplay(text) {
  display.value = text;
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      currentInput = '';
      lastOperator = null;
      updateDisplay('');
      break;

    case 'backspace':
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
      break;

    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (lastOperator && !resetNext) {
        calculate();
      }
      lastOperator = action;
      currentInput += getOperatorSymbol(action);
      updateDisplay(currentInput);
      resetNext = false;
      break;

    case 'equals':
      calculate();
      lastOperator = null;
      resetNext = true;
      break;
  }
}

function getOperatorSymbol(action) {
  switch (action) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '*';
    case 'divide': return '/';
  }
}

function calculate() {
  try {
    // Evaluate the expression safely
    let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
    // Remove trailing operators
    expression = expression.replace(/[\+\-\*\/]$/, '');
    const result = eval(expression);
    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch (e) {
    updateDisplay('Error');
    currentInput = '';
  }
}