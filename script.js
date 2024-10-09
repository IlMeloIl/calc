let display = document.querySelector('.display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

document.querySelector('.digits').addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
    if (event.target.tagName !== 'BUTTON') return;
    
    const value = event.target.textContent;

    if ('0123456789'.includes(value)) {
        appendNumber(value);
    } else if (value === '.') {
        appendDecimal();
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
    } else if (value === '←') {
        backspace();
    }

    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
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
        case '/': result = current !== 0 ? prev / current : 'Error'; break;
    }
    currentInput = result.toString();
    operation = null;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function negate() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

updateDisplay();