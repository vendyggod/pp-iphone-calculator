'use strict';

const btnNumber = document.querySelectorAll('.btn--number');
const number = document.querySelector('.number');
const numberContainer = document.querySelector('.number--container');
const currentNumber = document.querySelector('.number');
const btnMain = document.querySelectorAll('.btn--main');
const buttonsMain = document.querySelector('.btn--main');
const result = document.querySelector('.result');
const operatorArr = ['/', 'x', '-', '+'];
let currentOperator = [];
let firstNum = [];
let secondNum = [];
const clear = document.querySelector('.clear');

const activeRemove = function () {
  for (const button of btnMain) {
    button.classList.remove('operator--active');
  }
};

function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const init = function () {
  number.textContent = 0;
  firstNum = [];
  secondNum = [];
  currentOperator = [];
  activeRemove();
};

init();
clear.addEventListener('click', init);

btnNumber.forEach(function (btnNumber) {
  btnNumber.addEventListener('click', function () {
    if (currentOperator.length === 0) {
      firstNum.push(btnNumber.textContent);
      currentNumber.textContent = formatNumberWithSpaces(firstNum.join('')); // ПОЧЕМУ НАХУЙ НЕ РАБОАТЕТ
      console.log(firstNum);
    } else {
      secondNum.push(btnNumber.textContent);
      currentNumber.textContent = formatNumberWithSpaces(secondNum.join(''));
      console.log(secondNum);
    }

    secondNum && activeRemove();
  });
});

btnMain.forEach(function (button) {
  button.addEventListener('click', function () {
    const operator = button.textContent;
    currentOperator.unshift(operator);
    console.log(currentOperator);
    activeRemove();
    button.classList.add('operator--active');
  });
});

// Result
result.addEventListener('click', function () {
  const num1 = parseFloat(firstNum.join('').replace(',', '.'));
  const num2 = parseFloat(secondNum.join('').replace(',', '.'));
  console.log(num1, num2)

  let result = 0;
  if (firstNum.length > 0 && secondNum.length === 0) {
    result = num1;
  } else {
    switch (currentOperator[0]) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      case 'x':
        result =
          num2 !== 0 ? (result = num1 * num2) : 'Error: Division by zero';
        break;
      default:
        result = 'Выберите действие';
        break;
    }
  }

  currentNumber.textContent = formatNumberWithSpaces(String(result).replace('.', ','));
  console.log(result);
});
