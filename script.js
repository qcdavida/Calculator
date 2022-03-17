let calArray = [];
let previousAnswer = 0;

//Various functions to perfrom the math operations
const add = function(number1, number2) {
    return number1 + number2;
};
  
const subtract = function(number1, number2) {
    return number1 - number2;
};

const multiply = function(number1, number2) {
    return number1 * number2;
};

const divide = function(number1, number2){
    return number1 / number2;
}

//This function calls the appropriate math function above
const operate = function(number1, number2, operator){
    switch(operator) {
        case '+':
            console.log("Add: " + add(number1, number2));
            return add(number1, number2);
            break;
        case '-':
            console.log("Subtract: " + subtract(number1, number2));
            return subtract(number1, number2);
            break;
        case 'x':
            console.log("Multiply: " + multiply(number1, number2));
            return multiply(number1, number2);
            break;
        case '÷':
            console.log("Divide: " + divide(number1, number2));
            return divide(number1, number2);
            break;
        default:
            console.log("Something went wrong.");
            return 0;
    }
}

const divScreen = document.getElementsByClassName('calculator-screen');

function allEventsToAllButtons(){
    let buttons = document.querySelectorAll('.cal-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', updateDisplay);
    })
}

function updateDisplay(){
    // if(divScreen[0].textContent === '0'){
    //     divScreen[0].textContent = "";
    // }

    divScreen[0].textContent += this.textContent;
    calArray.push(this.textContent);

    if(this.textContent === '='){
        divScreen[0].textContent = "";
        previousAnswer = calculate(calArray);
        divScreen[0].textContent += previousAnswer;
    }
}

function calculate(array){
    let answer = 0;
    let number1 = "";
    let number2 = "";
    let operationsArray = getOperationsArray(array);
    let i = 0;
    let currentOperator = operationsArray[i];
    let nextOperator = operationsArray[i + 1];

    while(nextOperator != undefined){
        if(i == 0){
            number1 = array.slice(i, currentOperator);
            number1 = number1.toString().replace(/,/g,'');
        }
        else{
            number1 = answer;
        }

        number2 = array.slice((currentOperator + 1), nextOperator);
        number2 = number2.toString().replace(/,/g,'');

        answer = operate(parseInt(number1), parseInt(number2), array[operationsArray[i]]);

        i++;
        currentOperator = operationsArray[i];
        nextOperator = operationsArray[i + 1];
    }

    return answer;
}

//this function is used to place all of the operators into a single array for quick access
function getOperationsArray(array){
    let myArray = [];

    for(let i = 0; i < array.length; i++){
        if(array[i] === '+' || array[i] === '-' || array[i] === 'x' ||
            array[i] === '÷' || array[i] === '='){
                myArray.push(i);
            }
    }
    return myArray;
}

allEventsToAllButtons();