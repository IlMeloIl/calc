let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let operatorPressed = false;
let resultDisplayed = false;
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

function getButtonText(e){
    return e.target.textContent
}

function changeDisplay(choice){
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


let display = document.querySelector(".display");

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e)=>{
        let choice = getButtonText(e);
        changeDisplay((choice));
    });
});



