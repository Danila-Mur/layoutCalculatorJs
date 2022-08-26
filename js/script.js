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
  totalPercentPrices = document.getElementsByClassName('total-input')[4],
  cmsOpen = document.querySelector('#cms-open'),
  hiddenCmsVariants = document.querySelector('.hidden-cms-variants'),
  cmsSelect = document.querySelector('#cms-select'),
  percentCmsInput = hiddenCmsVariants.querySelector('.main-controls__input'),
  cmsOtherInput = document.querySelector('#cms-other-input');
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
  cmsPrice: 0,
  init: function () {
    this.addTitle();
    calculateButton.addEventListener('click', this.checkEmptyField.bind(this));
    addScreenButton.addEventListener('click', this.addScreenBlock);
    resetButton.addEventListener('click', this.reset.bind(this));
    inputRange.addEventListener('input', this.addRollback.bind(this));
    cmsOpen.addEventListener('click', this.showCms);
    cmsSelect.addEventListener('change', this.selectCms);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.selectCms();
    this.addPrices();
    this.logger();
    this.showResult();
    this.blockInterface();
  },
  reset: function () {
    this.removeScreens();
    this.removeServices();
    this.addPrices();
    this.removeRollback();
    this.showResult();
    this.logger();
    this.hiddenCms();
    this.unblockInterface();
  },
  logger: function () {
    // console.log(this);
    console.log(this);
  },
  checkEmptyField: function () {
    let check = true;
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (
        input.value <= 0 ||
        input.value === '' ||
        select.value === '' ||
        cmsOtherInput.value === '' ||
        cmsOtherInput.value <= 0
      ) {
        check = false;
        alert('Заполните поля');
      }
    });
    if (check) {
      this.start();
    }
  },
  showResult: function () {
    totalCostLayout.value = this.screenPrice;
    totalServices.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullPrice.value = this.cmsPrice;
    totalPercentPrices.value = this.servicePercentPrice;
    totalScreens.value = this.screenCount;
  },
  addScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type = text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addRollback: function () {
    this.rollback = inputRange.value;
    rangeValue.textContent = inputRange.value + '%';
    this.servicePercentPrice =
      this.cmsPrice - (this.cmsPrice * this.rollback) / 100;

    totalPercentPrices.value = this.servicePercentPrice;
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

    this.cmsPrice = this.fullPrice + (this.fullPrice * this.cmsPrice) / 100;

    this.servicePercentPrice =
      this.cmsPrice - (this.cmsPrice * this.rollback) / 100;
  },
  showCms: function () {
    if (cmsOpen.checked) {
      hiddenCmsVariants.style.display = 'flex';
    } else {
      hiddenCmsVariants.style.display = 'none';
      cmsSelect.value = '';
    }
  },
  selectCms: function () {
    if (cmsSelect.value === 'other') {
      percentCmsInput.style.display = 'flex';
      this.cmsPrice = cmsOtherInput.value;
    } else if (cmsSelect.value === '50') {
      this.cmsPrice = 50;
      percentCmsInput.style.display = 'none';
    }
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

    cmsOpen.disabled = true;
    cmsSelect.disabled = true;
    cmsOtherInput.disabled = true;
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

    this.screens = [];
  },
  removeServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
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

    cmsOpen.disabled = false;
    cmsSelect.disabled = false;
    cmsOpen.checked = false;
    cmsOtherInput.disabled = false;
  },
  removeRollback: function () {
    this.rollback = 0;
    rangeValue.textContent = 0 + '%';
    this.servicePercentPrice = 0;
    inputRange.value = -1;
  },
  hiddenCms: function () {
    this.cmsPrice = 0;
    cmsSelect.value = '';

    hiddenCmsVariants.style.display = 'none';
    percentCmsInput.style.display = 'none';
  },
};

appData.init();
