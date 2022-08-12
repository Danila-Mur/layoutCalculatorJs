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
    appData.checkEmptyField();
    calculateButton.addEventListener('click', appData.start);
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
    // appData.logger();
    if (!appData.screenPrice || !appData.screenCount) {
      console.log('Нет значений');
      return;
    }
    console.log(appData);
    appData.showResult();
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
  showResult: function () {
    totalCostLayout.value = appData.screenPrice;
    totalServices.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullPrice.value = appData.fullPrice;
    totalPercentPrices.value = appData.servicePercentPrice;
    totalScreens.value = appData.screenCount;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

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
