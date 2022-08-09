const titles = document.getElementsByTagName('h1'),
  submitButtons = document.getElementsByClassName('handler_btn'),
  addScreenButton = document.querySelector('.screen-btn'),
  otherItemsPercent = document.querySelectorAll('.other-items.percent'),
  otherItemsNumber = document.querySelectorAll('.other-items.number'),
  inputRange = document.querySelector('.rollback input[type="range"]'),
  rangeValue = document.querySelector('.rollback span.range-value'),
  totalInputs = document.getElementsByClassName('total-input');
let screens = document.querySelectorAll('.screen');

//1
for (let title of titles) {
  console.log(title);
}
//2
for (let button of submitButtons) {
  console.log(button);
}
//4
otherItemsPercent.forEach((el) => {
  console.log(el);
});

otherItemsNumber.forEach((el) => {
  console.log(el);
});

//7
for (let totalInput of totalInputs) {
  console.log(totalInput);
}

//8
screens.forEach((el) => {
  console.log(el);
});

//3
console.log('addScreenButton: ', addScreenButton);
//5
console.log('inputRange: ', inputRange);
//6
console.log('rangeValue: ', rangeValue);

