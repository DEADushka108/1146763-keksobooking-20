'use strict';
(function () {
  var MAX_ADS = 5;
  var LOAD_INTERVAL = 1000;
  var URL = {
    get: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking'
  };
  var MainPinPosition = {
    top: '375px',
    left: '570px'
  };

  var getData = window.data.get;
  var sendData = window.data.send;
  var onSuccessSend = window.modal.onSuccessSend;
  var onErrorSend = window.modal.onErrorSend;
  var form = window.form.element;
  var isFormActive = window.form.isFormActive;
  var toggleForm = window.form.toggle;
  var setValidateForm = window.form.setValidateForm;
  var toggleFilter = window.filter.toggle;
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var onMouseDownMovePin = window.dragndrop.movePin;
  var setAddress = window.dragndrop.setAddress;
  var isMapActive = window.dragndrop.isMapActive;
  // var appendElement = window.utils.appendElement;

  var map = document.querySelector('.map');
  // var mainContainer = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  window.adverts = [];

  function onError() {
    // var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    // var errorElement = errorTemplate.cloneNode(true);
    // errorElement.querySelector('.error__massage').textContent = message;
    // errorElement.querySelector('.error__button').addEventListener('click', function () {
    //   errorElement.remove();
    window.setTimeout(getData(URL.get, onSuccess, onError), LOAD_INTERVAL);
    // });

    // appendElement(errorElement, mainContainer);
  }

  function onSuccess(data) {
    window.adverts = data;
    renderPins(window.adverts.slice(0, MAX_ADS));
    toggleForm();
    setValidateForm();
    toggleFilter();
  }

  function setPageDisactive() {
    map.classList.add('map--faded');
    toggleForm();
    toggleFilter();
  }

  function onMainPinMouseupActivatePage() {
    if (!isMapActive() && !isFormActive()) {
      map.classList.remove('map--faded');
      getData(URL.get, onSuccess, onError);
      mainPin.removeEventListener('mousedown', onMainPinMouseupActivatePage);
      mainPin.removeEventListener('keydown', onKeyPressActivatePage);
    }
  }

  function clearPage() {
    removeCard();
    removePins();
    mainPin.style.left = MainPinPosition.left;
    mainPin.style.top = MainPinPosition.top;
    setPageDisactive();
  }

  function onKeyPressActivatePage(evt) {
    if (evt.key === 'Enter') {
      onMainPinMouseupActivatePage();
    }
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
    clearPage();
    window.adverts = [];
    setAddress();
    mainPin.addEventListener('mousedown', onMainPinMouseupActivatePage);
  }

  function onFormSubmit(evt) {
    sendData(URL.send, new FormData(form), onSuccessSend, onErrorSend);
    form.reset();
    clearPage();
    evt.preventDefault();
  }

  setPageDisactive();
  setAddress();
  mainPin.addEventListener('keydown', onKeyPressActivatePage);
  mainPin.addEventListener('mousedown', onMouseDownMovePin);
  mainPin.addEventListener('mouseup', onMainPinMouseupActivatePage);
  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
})();
