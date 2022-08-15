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
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  rollback: 0,
  init: function () {
    appData.addTitle();
    calculateButton.addEventListener('click', appData.checkEmptyField);
    addScreenButton.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.logger();
    appData.showResult();
  },
  logger: function () {
    console.log(appData);
    console.log(appData.screens);
  },
  checkEmptyField: function () {
    let check = true;
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (input.value === '' || select.value === '') {
        check = false;
      }
    });
    if (check) {
      appData.start();
    }
  },
  showResult: function () {
    totalCostLayout.value = appData.screenPrice;
    totalServices.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullPrice.value = appData.fullPrice;
    totalPercentPrices.value = appData.servicePercentPrice;
    totalScreens.value = appData.screenCount;
  },
  addScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    const cloneInput = cloneScreen.querySelector('input');
    cloneInput.value = '';
    screens = document.querySelectorAll('.screen');
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type = text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type = text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addRollback: function () {
    appData.rollback = inputRange.value;
    rangeValue.textContent = inputRange.value + '%';
    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;
    totalPercentPrices.value = appData.servicePercentPrice;
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((acc, screen) => {
      return +acc + +screen.price;
    }, 0);

    appData.screenCount = appData.screens.reduce((acc, screen) => {
      return +acc + +screen.count;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        (appData.screenPrice * appData.servicesPercent[key]) / 100;
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;
  },
};

appData.init();
