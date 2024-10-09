let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let operatorPressed = false;
let resultDisplayed = false;
let errorState = false;

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
            if (Number(secondNumber == 0)){
                return "Error: Division by 0";
            }
            return divide(Number(firstNumber), Number(secondNumber));
    }
}   

function getButtonText(e){
    return e.target.textContent
}

function changeDisplay(choice){
    if (errorState) {
        if (choice === "C"){
            display.textContent = "";
            currentNumber = "";
            previousNumber = "";
            currentOperator = "";
            operatorPressed = false;
            resultDisplayed = false;
            errorState = false; 
        } else {
            return;  
        }
    } else {
    if(!isNaN(choice)){
        if (operatorPressed || resultDisplayed){
            display.textContent = "";
            operatorPressed = false;
            resultDisplayed = false;
        }
        currentNumber += choice;
        display.textContent += choice;
    } else {
        switch (choice){
            case ".":
                if (!currentNumber.includes(".")){
                    if (currentNumber === ""){
                        currentNumber = "0.";
                    } else {
                        currentNumber += ".";
                    }
                    display.textContent = currentNumber;
                }
                break;
            case "+/-":
                if (currentNumber !== 0 && currentNumber !== ""){
                    currentNumber = (parseFloat(currentNumber) * -1).toString();
                    display.textContent = currentNumber;
                }
                break;
            case "%":
                if (previousNumber && currentOperator){
                    currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber / 100)).toString();
                    display.textContent = currentNumber;
                } else {
                    currentNumber = (parseFloat(currentNumber / 100)).toString();
                    display.textContent = currentNumber;
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (previousNumber && currentOperator){
                    if (!currentNumber){
                        currentOperator = choice;
                    } else {
                        previousNumber = operate(currentOperator, previousNumber, currentNumber);
                        display.textContent = previousNumber;
                        currentOperator = choice;
                        currentNumber = "";
                    }
                    
                } else {
                    previousNumber = currentNumber;
                    currentOperator = choice;
                    currentNumber = "";
                }
                operatorPressed = true;
                break;
            case "=":
                if (previousNumber && currentOperator){
                    let result = operate(currentOperator, previousNumber, currentNumber);
                    display.textContent = result;
                    previousNumber = result;
                    currentNumber = "";
                    currentOperator = "";
                    resultDisplayed = true;
                }
                break;
            case "C":
                display.textContent = "";
                currentNumber = "";
                previousNumber = "";
                currentOperator = "";
                operatorPressed = false;
                resultDisplayed = false;
                break;

            }
        }
    }
}


let display = document.querySelector(".display");

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e)=>{
        let choice = getButtonText(e);
        changeDisplay((choice));
    });
});


// add +/-, %, . functionality
