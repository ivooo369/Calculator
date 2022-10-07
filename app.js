let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let toResetScreen = false;

const display = document.querySelector("#display");
const mainScreen = document.querySelector("#main-screen");
const historyScreen = document.querySelector("#history-screen");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalityButton = document.querySelector("#equality");
const decimalPointButton = document.querySelector("#decimal-point");
const signChangeButton = document.querySelector("#sign-change");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const errorMessage = document.querySelector("#error-message");
errorMessage.textContent = "You should know that division by 0 is impossible! Press 'Clear' and start over...";

window.addEventListener("keydown", handleKeyboardInput);
equalityButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearScreen);
backspaceButton.addEventListener("click", deleteNumber);
decimalPointButton.addEventListener("click", appendDecimalPoint);
signChangeButton.addEventListener("click", changeSign);
numberButtons.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));

function appendNumber(num) {
  if (mainScreen.textContent === "0" || toResetScreen) {
    resetScreen();
  }
  mainScreen.textContent += num;
}

function resetScreen() {
  mainScreen.textContent = "";
  toResetScreen = false;
}

function clearScreen() {
  errorMessage.style = "display: none;";
  mainScreen.textContent = 0;
  mainScreen.style = "color: #000000; font-size: 30px; text-align: end;";
  historyScreen.textContent = "";
  historyScreen.style = "display: visible;";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendDecimalPoint() {
  if (toResetScreen) resetScreen();
  if (mainScreen.textContent === "") {
    mainScreen.textContent = "0";
  }
  if (mainScreen.textContent.includes(".")) return;
  mainScreen.textContent += ".";
}

function changeSign() {
  if (mainScreen.textContent > 0) {
    mainScreen.textContent = "-" + mainScreen.textContent;
  } else {
    mainScreen.textContent = mainScreen.textContent * -1;
  }
}

function deleteNumber() {
  mainScreen.textContent = mainScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = mainScreen.textContent;
  currentOperation = operator;
  historyScreen.textContent = `${firstOperand} ${currentOperation}`;
  toResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || toResetScreen) return;
  if (currentOperation === "÷" && mainScreen.textContent === "0") {
    errorMessage.style = "display: block; margin: auto;";
    mainScreen.style = "display: none;";
    historyScreen.style = "display: none;";
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
  if (keyboardOperator === "-") return "-";
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
  if (num2 === 0) return null;
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

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "−":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    case "%":
      return remainder(num1, num2);
    case "^":
      return exponentiate(num1, num2);
    case "!":
      return factorial(num1);
    default:
      return null;
  }
}
