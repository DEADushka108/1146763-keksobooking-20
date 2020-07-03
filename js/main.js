'use strict';
(function () {
  var MAX_ADS = window.Constant.MAX_ADS;

  var MAP_DISABLED_CLASS = window.Constant.MAP_DISABLED_CLASS;

  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    SEND: 'https://javascript.pages.academy/keksobooking'
  };

  var MAIN_PIN_DEFAULT_POSITION = {
    TOP: '375px',
    LEFT: '570px'
  };

  var getData = window.data.get;
  var sendData = window.data.send;
  var onSuccessSend = window.modal.onSuccessSend;
  var onErrorSend = window.modal.onErrorSend;
  var form = window.form.element;
  var isFormActive = window.form.isFormActive;
  var toggleForm = window.form.toggle;
  var resetPreview = window.preview.resetPreview;
  var toggleFilter = window.filter.toggle;
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var onMouseDownMovePin = window.dragndrop.movePin;
  var setAddress = window.dragndrop.setAddress;
  var isMapActive = window.dragndrop.isMapActive;
  var isEnterPressed = window.utils.isEnterPressed;
  var removeActiveState = window.utils.removeActiveState;
  var addActiveState = window.utils.addActiveState;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  window.adverts = [];

  function setMainPinDefaultPosition() {
    mainPin.style.left = MAIN_PIN_DEFAULT_POSITION.LEFT;
    mainPin.style.top = MAIN_PIN_DEFAULT_POSITION.TOP;
  }

  function onError(message) {
    onErrorSend(message);
    addActiveState(map, MAP_DISABLED_CLASS);
    mainPin.addEventListener('keydown', onKeyPressActivatePage);
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
  }

  function onSuccess(data) {
    window.adverts = data;
    renderPins(window.adverts.slice(0, MAX_ADS));
    toggleForm();
    toggleFilter();
  }

  function setPageDisactive() {
    addActiveState(map, MAP_DISABLED_CLASS);
    toggleForm();
    toggleFilter();
    mainPin.addEventListener('keydown', onKeyPressActivatePage);
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
  }

  function onMainPinMouseDownActivatePage() {
    if (!isMapActive() && !isFormActive()) {
      getData(URL.GET, onSuccess, onError);
      removeActiveState(map, MAP_DISABLED_CLASS);
      mainPin.removeEventListener('mousedown', onMainPinMouseDownActivatePage);
      mainPin.removeEventListener('keydown', onKeyPressActivatePage);
    }
  }

  function clearPage() {
    window.adverts = [];
    removeCard();
    removePins();
    resetPreview();
    form.reset();
    setMainPinDefaultPosition();
    setPageDisactive();
    setAddress();
  }

  function onKeyPressActivatePage(evt) {
    if (isEnterPressed(evt)) {
      onMainPinMouseDownActivatePage();
    }
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    clearPage();
  }

  function onFormSubmit(evt) {
    sendData(URL.SEND, new FormData(form), onSuccessSend, onErrorSend);
    clearPage();
    evt.preventDefault();
  }

  setPageDisactive();
  setAddress();
  mainPin.addEventListener('mousedown', onMouseDownMovePin);
  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
})();
