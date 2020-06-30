'use strict';
(function () {
  var MAX_ADS = 5;

  var MAP_DISABLED_CLASS = 'map--faded';

  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    SEND: 'https://javascript.pages.academy/keksobooking'
  };

  var MainPinPosition = {
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
    map.classList.add(MAP_DISABLED_CLASS);
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
    map.classList.add(MAP_DISABLED_CLASS);
    toggleForm();
    toggleFilter();
    mainPin.addEventListener('keydown', onKeyPressActivatePage);
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
  }

  function onMainPinMouseDownActivatePage(evt) {
    if (isMouseLeftButtonPressed(evt)) {
      if (!isMapActive() && !isFormActive()) {
        getData(URL.GET, onSuccess, onError);
        map.classList.remove(MAP_DISABLED_CLASS);
        mainPin.removeEventListener('mousedown', onMainPinMouseDownActivatePage);
        mainPin.removeEventListener('keydown', onKeyPressActivatePage);
      }
    }
  }

  function clearPage() {
    removeCard();
    removePins();
    resetPreview();
    mainPin.style.left = MainPinPosition.LEFT;
    mainPin.style.top = MainPinPosition.TOP;
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
    resetPreview();
    clearPage();
    window.adverts = [];
    setAddress();
    mainPin.addEventListener('mousedown', onMainPinMouseDownActivatePage);
  }

  function onFormSubmit(evt) {
    sendData(URL.SEND, new FormData(form), onSuccessSend, onErrorSend);
    form.reset();
    clearPage();
    evt.preventDefault();
  }

  setPageDisactive();
  setAddress();
  mainPin.addEventListener('mousedown', onMouseDownMovePin);
  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
})();
