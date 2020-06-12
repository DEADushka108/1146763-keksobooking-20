'use strict';
(function () {
  var TOTAL = 8;
  var PIN_TIP_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var form = window.form.element;
  var leaseAds = window.mock.createAds(TOTAL);
  var resetButton = form.querySelector('.ad-form__reset');

  function setAddress() {
    var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT);

    addressField.value = pinLocationX + ', ' + pinLocationY;
    addressField.disabled = true;
  }

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
      setAddress();
      window.pin.render(leaseAds);
    }
  }

  function clearPage() {
    window.card.remove();
    window.pin.remove();
    initPage();
  }

  function initPage() {
    setPageDisactive();
    setAddress();
    mainPin.addEventListener('mouseup', onMainPinMouseupActivatePage);
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
    clearPage();
  }

  initPage();
  resetButton.addEventListener('click', onResetButtonClick);
})();
