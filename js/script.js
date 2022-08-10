const title = document.getElementsByTagName('h1')[0],
  calculateButton = document.getElementsByClassName('handler_btn')[0],
  resetButton = document.getElementsByClassName('handler_btn')[1],
  addScreenButton = document.querySelector('.screen-btn'),
  otherItemsPercent = document.querySelectorAll('.other-items.percent'),
  otherItemsNumber = document.querySelectorAll('.other-items.number'),
  inputRange = document.querySelector('.rollback input[type="range"]'),
  rangeValue = document.querySelector('.rollback span.range-value'),
  totalCostLayout = document.getElementsByClassName('total-input')[0],
  totalScreens = document.getElementsByClassName('total-input')[1],
  totalServices = document.getElementsByClassName('total-input')[2],
  totalFullPrice = document.getElementsByClassName('total-input')[3],
  totalPercentPrices = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: false,
  services: {},
  allServicePrices: 0,
  rollback: 50,
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getTitle();
    appData.getServicePercentPrices();
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      if (typeof appData[key] === 'function') {
        console.log('key: ', key);
      } else {
        console.log('key: ', key + ' appData: ', appData[key]);
      }
    }
    console.log(appData.title);
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
  asking: function () {
    do {
      appData.title = prompt(
        'Введите название Вашего проекта...',
        'Калькулятор верстки'
      );
    } while (!appData.isString(appData.title));

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    for (let i = 0; i < 3; i++) {
      let name;
      do {
        name = prompt(
          'Введите типы экранов для разработки',
          'Desktop, tablet, mobile'
        );
      } while (!appData.isString(name));
      let price = 0;

      do {
        price = prompt('Сколько будет стоить данная работа?', 15000);
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));
      name += '_' + appData.randoHash(4);

      do {
        price = prompt('Сколько это будет стоить?', '10000');
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }
  },
  randoHash: function (i) {
    let rnd = '';
    while (rnd.length < i) {
      rnd += Math.random().toString(36).substring(2);
    }
    return rnd.substring(0, i);
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((acc, screen) => {
      return +acc + +screen.price;
    }, 0);
  },
  isString: function (str) {
    return str.trim() && !appData.isNumber(str);
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num.trim() === num;
  },
  getAllServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Скидка 10%';
    } else if (price >= 15000) {
      return 'Скидка 5%';
    } else if (price >= 0) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },
};

// appData.start();

//4
otherItemsPercent.forEach((el) => {
  console.log(el);
});

otherItemsNumber.forEach((el) => {
  console.log(el);
});

//8
screens.forEach((el) => {
  console.log(el);
});

//1
console.log(title);
//2
console.log(calculateButton);
console.log(resetButton);
//3
console.log('addScreenButton: ', addScreenButton);
//5
console.log('inputRange: ', inputRange);
//6
console.log('rangeValue: ', rangeValue);
//7
console.log(totalCostLayout);
console.log(totalScreens);
console.log(totalServices);
console.log(totalFullPrice);
console.log(totalPercentPrices);