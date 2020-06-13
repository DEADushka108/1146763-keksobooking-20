'use strict';
(function () {
  var TOTAL = 8;
  var MAIN_PIN_DEAFULT_TOP = '375px';
  var MAIN_PIN_DEAFULT_LEFT = '570px';

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = window.form.element;
  var leaseAds = window.mock.createAds(TOTAL);
  var resetButton = form.querySelector('.ad-form__reset');

  function isMapActive() {
    return !(map.classList.contains('map--faded'));
  }

  function isFormActive() {
    return !(form.classList.contains('ad-form--disabled'));
  }

  function setPageActive() {
    map.classList.remove('map--faded');
    window.form.toggle();
  }

  function setPageDisactive() {
    map.classList.add('map--faded');
    window.form.toggle();
  }

  function onMainPinMouseupActivatePage() {
    if (!isMapActive() && !isFormActive()) {
      setPageActive();
      window.pin.render(leaseAds);
    }
  }

  function clearPage() {
    window.card.remove();
    window.pin.remove();
    mainPin.style.left = MAIN_PIN_DEAFULT_LEFT;
    mainPin.style.top = MAIN_PIN_DEAFULT_TOP;
    initPage();
  }

  function initPage() {
    setPageDisactive();
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
    clearPage();
  }

  initPage();
  mainPin.addEventListener('mousedown', window.dragndrop.movePin);
  mainPin.addEventListener('mouseup', onMainPinMouseupActivatePage);
  resetButton.addEventListener('click', onResetButtonClick);
})();
