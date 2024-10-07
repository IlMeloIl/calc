function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, firstNumber, secondNumber){
    switch(operator) {
        case "+": 
            return add(Number(firstNumber), Number(secondNumber));
        case "-":
            return subtract(Number(firstNumber), Number(secondNumber));
        case "*":
            return multiply(Number(firstNumber), Number(secondNumber));
        case "/":
            return divide(Number(firstNumber), Number(secondNumber));
    }
}   

let firstNumber = prompt("Input first number of operation");
let operation = prompt("Input your operation. +, -, *, /");
let secondNumber = prompt("Input second number of operation");
alert(operate(operation, firstNumber, secondNumber));