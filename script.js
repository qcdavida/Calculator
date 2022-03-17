let calArray = [];
let previousAnswer = 0;
const divScreen = document.getElementsByClassName('calculator-screen');

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
    console.log("logic: " + number1 + " " + number2 + " " + operator)
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case 'x':
            return multiply(number1, number2);
        case '÷':
            if(number2 === 0){
                return 'infinity';
            }
            else{
                return divide(number1, number2);
            }
        default:
            console.log("Something went wrong.");
            return;
    }
}

function allEventsToAllButtons(){
    let buttons = document.querySelectorAll('.cal-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', updateDisplay);
    })
}

function updateDisplay(){
    
    if(divScreen[0].textContent === '0'){
        divScreen[0].textContent = "";
    }

    //if the user presses AC button, wipe the screen and the calArray to start fresh
    if(this.textContent === 'AC'){
        calArray = [];
        divScreen[0].textContent = "";
        divScreen[0].textContent = '0';
    }
    //if the user presses Delete button, delete the last thing the user entered
    else if(this.textContent === 'Delete'){
        let index = (calArray.length - 1);
        divScreen[0].textContent = divScreen[0].textContent.slice(0, index) + 
                                    divScreen[0].textContent.slice(index + 1);
        calArray.pop(); 
        index--;
    }
    //push the entry to the calArray and display the entered input onto the screen
    else{
        divScreen[0].textContent += this.textContent;
        calArray.push(this.textContent);
    }

    //if the user presses the equal sign, then call on the operate function to get the answer 
    //and display that answer
    if(this.textContent === '='){
        divScreen[0].textContent = "";
        previousAnswer = calculate(calArray);

        if(previousAnswer === 'infinity'){
            divScreen[0].textContent = "";
            divScreen[0].textContent = "Only secret members can know that answer...";
            calArray = [];
        }
        else if(isNaN(previousAnswer)){
            divScreen[0].textContent = "";
            divScreen[0].textContent = "MATH ERROR";
            calArray = [];
        }
        else{
            previousAnswerToString = previousAnswer.toString().split("");
            calArray = [];
            
            for(let i = 0; i < previousAnswerToString.length; i++){
                calArray.push(previousAnswerToString[i]);
                divScreen[0].textContent += previousAnswerToString[i];
            }
        }
    }
}//end of updateDisplay function


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