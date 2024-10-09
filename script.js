let display = document.querySelector('.display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

document.querySelector('.digits').addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
    if (event.target.tagName !== 'BUTTON') return;
    
    const value = event.target.textContent;

    if ('0123456789.'.includes(value)) {
        appendNumber(value);
    } else if ('+-*/'.includes(value)) {
        setOperation(value);
    } else if (value === '=') {
        calculate();
    } else if (value === 'C') {
        clear();
    } else if (value === '%') {
        percent();
    } else if (value === '+/-') {
        negate();
    }

    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    currentInput += number;
}

function setOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;
}

function calculate() {
    if (operation === null || shouldResetScreen) return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
    }
    currentInput = result.toString();
    operation = null;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function negate() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}