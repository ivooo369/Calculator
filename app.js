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
const errorMessageDivisionByZero = document.querySelector("#error-message-division-by-zero");
errorMessageDivisionByZero.textContent = "You should know that division by 0 is impossible! Press 'Clear' and start over...";

window.addEventListener("keydown", handleKeyboardInput);
equalityButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearScreen);
backspaceButton.addEventListener("click", deleteNumber);
decimalPointButton.addEventListener("click", appendDecimalPoint);
signChangeButton.addEventListener("click", changeSign);
numberButtons.forEach((button) => button.addEventListener("click", () => appendNumber(button.value)));
operatorButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.value)));

function disableButtons() {
  numberButtons.forEach((button) => (button.disabled = true));
  operatorButtons.forEach((button) => (button.disabled = true));
  signChangeButton.disabled = true;
  decimalPointButton.disabled = true;
  backspaceButton.disabled = true;
  equalityButton.disabled = true;
}

function enableButtons() {
  numberButtons.forEach((button) => (button.disabled = false));
  operatorButtons.forEach((button) => (button.disabled = false));
  signChangeButton.disabled = false;
  decimalPointButton.disabled = false;
  backspaceButton.disabled = false;
  equalityButton.disabled = false;
}

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
  enableButtons();
  errorMessageDivisionByZero.style = "display: none;";
  mainScreen.textContent = 0;
  mainScreen.style = "color: #000000; text-align: end;";
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
  if (mainScreen.textContent !== "0") {
    mainScreen.textContent = mainScreen.textContent.toString().slice(0, -1);
  }
  if (mainScreen.textContent === "") {
    mainScreen.textContent = 0;
  }
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = mainScreen.textContent;
  currentOperation = operator;
  historyScreen.textContent = `${firstOperand} ${currentOperation}`;
  historyScreen.style = "text-align: start; color: #000000;";
  toResetScreen = true;
}

function evaluate() {
  if (currentOperation === "!") {
    if (firstOperand >= -170 && firstOperand <= 170) {
      mainScreen.textContent = roundResult(operate(currentOperation, firstOperand));
      historyScreen.textContent = `${firstOperand} ${currentOperation} =`;
      currentOperation = null;
      toResetScreen = false;
    } else if (firstOperand < -170 || firstOperand > 170) {
      historyScreen.style = "text-align: center; color: #ca1010;";
      historyScreen.textContent = "Range: from -170! to 170!";
      return;
    }
  }
  if (currentOperation === null || toResetScreen) return;
  if (currentOperation === "÷" && mainScreen.textContent === "0") {
    disableButtons();
    errorMessageDivisionByZero.style = "display: block; margin: auto;";
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
  if (e.key === ".") appendDecimalPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clearScreen();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%" || e.key === "^" || e.key === "!") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
  if (keyboardOperator === "%") return "%";
  if (keyboardOperator === "^") return "^";
  if (keyboardOperator === "!") return "!";
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
  let product = 1;
  if (num1 === 0) {
    return 1;
  }
  if (num1 > 0) {
    for (let i = num1; i > 0; i--) {
      product *= i;
    }
    return product;
  } else {
    for (let i = num1; i < 0; i++) {
      product *= i;
    }
    if (product > 0) {
      product *= -1;
    }
    return product;
  }
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (operator === "+") return add(num1, num2);
  else if (operator === "−") return subtract(num1, num2);
  else if (operator === "×") return multiply(num1, num2);
  else if (operator === "÷") return divide(num1, num2);
  else if (operator === "%") return remainder(num1, num2);
  else if (operator === "^") return exponentiate(num1, num2);
  else if (operator === "!") return factorial(num1);
}
