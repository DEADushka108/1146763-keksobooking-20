'use strict';
(function () {
  var TOTAL = 10;
  var DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
  var MAIN_PIN_DEAFULT_TOP = '375px';
  var MAIN_PIN_DEAFULT_LEFT = '570px';

  var getData = window.data.get;
  var toggleFilters = window.filter.toggle;

  var map = document.querySelector('.map');
  var mainContainer = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var form = window.form.element;
  // var leaseAds = window.mock.createAds(TOTAL);
  var resetButton = form.querySelector('.ad-form__reset');

  window.leaseAds = [];

  function onError(message) {
    var errorTemplate = document.querySelector('#error').textContent.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__masage').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', function () {
      errorElement.remove();
      getData(DATA_URL, onSuccess, onError);
    });

    window.appendElement(errorElement, mainContainer);
  }

  function onSuccess(data) {
    window.leaseAds = data;
    window.pin.render(window.leaseAds.slice(0, TOTAL));

    window.form.toggle();
    window.filter.toggle();
  }

  function isMapActive() {
    return !(map.classList.contains('map--faded'));
  }

  function isFormActive() {
    return !(form.classList.contains('ad-form--disabled'));
  }

  function setPageActive() {
    map.classList.remove('map--faded');
    // window.form.toggle();
    // window.filter.toggle();
  }

  function setPageDisactive() {
    map.classList.add('map--faded');
    window.form.toggle();
    window.filter.toggle();
  }

  function onMainPinMouseupActivatePage() {
    if (!isMapActive() && !isFormActive()) {
      setPageActive();
      window.data.get(DATA_URL, onSuccess, onError);
      mainPin.removeEventListener('mousedown', onMainPinMouseupActivatePage);
      mainPin.removeEventListener('keydown', onKeyPressActivatePage)
    }
  }

  function clearPage() {
    window.card.remove();
    window.pin.remove();
    mainPin.style.left = MAIN_PIN_DEAFULT_LEFT;
    mainPin.style.top = MAIN_PIN_DEAFULT_TOP;
    setPageDisactive();
  }

  function onKeyPressActivatePage(evt) {
    if (evt.key === 'Enter') {
      onMainPinMouseupActivatePage();
    }
  }

  // function initPage() {
  //   setPageDisactive();
  // }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
    clearPage();
    window.leaseAds = [];
    mainPin.addEventListener('mousedown', onMainPinMouseupActivatePage);
  }

  setPageDisactive();
  window.dragndrop.setAddress();
  mainPin.addEventListener('keydown', onKeyPressActivatePage);
  mainPin.addEventListener('mousedown', window.dragndrop.movePin);
  mainPin.addEventListener('mouseup', onMainPinMouseupActivatePage);
  resetButton.addEventListener('click', onResetButtonClick);
})();
