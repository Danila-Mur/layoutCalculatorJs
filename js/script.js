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
  fullPrice: 0,
  servicePercentPrice: 0,
  init: function () {
    this.addTitle();
    calculateButton.addEventListener('click', this.checkEmptyField);
    addScreenButton.addEventListener('click', this.addScreenBlock);
    resetButton.addEventListener('click', this.reset);
    inputRange.addEventListener('input', this.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.logger();
    this.showResult();
    this.blockInterface();
  },
  reset: function () {
    appData.removeScreens();
    appData.removeServices();
    appData.addPrices();
    appData.showResult();
    appData.unblockInterface();

    console.log(appData.screens);
    console.log(appData.servicesPercent);
    console.log(appData.servicesNumber);
  },
  logger: function () {
    console.log(this);
    console.log(this.screens);
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
    totalCostLayout.value = this.screenPrice;
    totalServices.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullPrice.value = this.fullPrice;
    totalPercentPrices.value = this.servicePercentPrice;
    totalScreens.value = this.screenCount;
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
    this.screenPrice = this.screens.reduce((acc, screen) => {
      return +acc + +screen.price;
    }, 0);

    this.screenCount = this.screens.reduce((acc, screen) => {
      return +acc + +screen.count;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        (this.screenPrice * this.servicesPercent[key]) / 100;
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice =
      this.fullPrice - (this.fullPrice * this.rollback) / 100;
  },
  blockInterface: function () {
    screens.forEach((item) => {
      const select = item.querySelector('select');
      const input = item.querySelector('input');

      input.disabled = true;
      select.disabled = true;
    });

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = true;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = true;
    });

    calculateButton.style.display = 'none';
    resetButton.style.display = 'block';
  },
  removeScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.value = '';
      input.value = '';

      if (index !== 0) {
        screen.remove();
      }
    });
    appData.screens = [];
  },
  removeServices: function () {
    appData.servicesPercent = {};
    appData.servicesNumber = {};
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
  },
  unblockInterface: function () {
    screens.forEach((item) => {
      const select = item.querySelector('select');
      const input = item.querySelector('input');

      input.disabled = false;
      select.disabled = false;
    });

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = false;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = false;
    });

    calculateButton.style.display = 'block';
    resetButton.style.display = 'none';
  },
};

appData.init();
