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
            break;
        case '-':
            console.log("Subtract: " + subtract(number1, number2));
            break;
        case '*':
            console.log("Multiply: " + multiply(number1, number2));
            break;
        case '/':
            console.log("Divide: " + divide(number1, number2));
            break;
        default:
            console.log("Something went wrong.");
    }
}

operate(number1, number2, "/");