'use strict';
(function () {
  var MAX_ADS = 5;
  var URL = {
    get: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking'
  };
  var MAIN_PIN_POSITION = {
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
  var resetPhoto = window.preview.resetPhoto;
  var setValidateForm = window.form.setValidateForm;
  var toggleFilter = window.filter.toggle;
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var onMouseDownMovePin = window.dragndrop.movePin;
  var setAddress = window.dragndrop.setAddress;
  var isMapActive = window.dragndrop.isMapActive;
  var isEnterPressed = window.utils.isEnterPressed;
  var isMouseLeftButtonPressed = window.utils.isMouseLeftButtonPressed;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  window.adverts = [];

  function onError(message) {
    onErrorSend(message);
    map.classList.add('map--faded');
    mainPin.addEventListener('keydown', onKeyPressActivatePage);
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
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

  function onMainPinMouseDownActivatePage(evt) {
    if (isMouseLeftButtonPressed(evt)) {
      if (!isMapActive() && !isFormActive()) {
        getData(URL.get, onSuccess, onError);
        map.classList.remove('map--faded');
        mainPin.removeEventListener('mousedown', onMainPinMouseDownActivatePage);
        mainPin.removeEventListener('keydown', onKeyPressActivatePage);
      }
    }
  }

  function clearPage() {
    removeCard();
    removePins();
    resetPhoto();
    mainPin.style.left = MAIN_PIN_POSITION.left;
    mainPin.style.top = MAIN_PIN_POSITION.top;
    setPageDisactive();
  }

  function onKeyPressActivatePage(evt) {
    if (isEnterPressed(evt)) {
      onMainPinMouseDownActivatePage();
    }
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
    resetPhoto();
    clearPage();
    window.adverts = [];
    setAddress();
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
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
  mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
})();
