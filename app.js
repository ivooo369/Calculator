let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let toResetScreen = false;

const display = document.querySelector("#display");
const mainScreen = document.querySelector("main-screen");
const historyScreen = document.querySelector("#history-screen");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equality = document.querySelector("#equality");
const decimalPoint = document.querySelector("#decimal-point");
const signChange = document.querySelector("#sign-change");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));

function appendNumber(num) {
  if (currentOperation.textContent === "0" || toResetScreen) {
    resetScreen();
  }
  mainScreen.textContent += num;
}

function resetScreen() {
  currentOperation.textContent = "";
  toResetScreen = false;
}

function clearScreen() {
  mainScreen.textContent = 0;
  historyScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendDecimalPoint() {
  if (toResetScreen) {
    resetScreen();
  }
  if (currentScreen.textContent === "") {
    currentScreen.textContent = "0";
  }
  if (currentScreen.textContent.includes(".")) {
    return;
  }
  currentScreen.textContent += ".";
}

function deleteNumber() {
  currentScreen.textContent = mainScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = mainScreen.textContent;
  currentOperation = operator;
  historyScreen.textContent = `${firstOperand} ${currentOperation}`;
  toResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || toResetScreen) return;
  if (currentOperation === "÷" && mainScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = mainScreen.textContent;
  mainScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  historyScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function remainder(num1, num2) {
  return num1 % num2;
}

function exponentiate(num1, num2) {
  return num1 ** num2;
}

function factorial(num1) {
  if (num1 === 0) {
    return 1;
  }
  let product = 1;
  for (let i = num1; i > 0; i--) {
    product *= i;
  }
  return product;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else if (operator === "%") {
    return remainder(num1, num2);
  } else if (operator === "^") {
    return exponentiate(num1, num2);
  } else if (operator === "!") {
    return factorial(num1);
  } else {
    return null;
  }
}
