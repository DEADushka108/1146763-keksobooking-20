'use strict';
(function () {
  var TOTAL = 8;
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var PIN_TIP_HEIGHT = 22;
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var filtersContainer = document.querySelector('.map__filters-container');

  var leaseAds = window.createLeaseAdArray(TOTAL);
  // var card = window.createCard(leaseAds[0]);

  function setAddress() {
    var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT);

    addressField.value = pinLocationX + ', ' + pinLocationY;
  }

  function toggleForm() {
    form.classList.toggle('ad-form--disabled');
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isMapActive() {
    return !(map.classList.contains('map--faded'));
  }

  function isFormActive() {
    return !(form.classList.contains('ad-form--disabled'));
  }

  function setPageActive() {
    map.classList.remove('map--faded');
    toggleForm();
  }

  function setPageDisactive() {
    map.classList.add('map--faded');
    toggleForm();
  }

  function mapPinMouseDownHandler() {
    if (!isMapActive() && !isFormActive()) {
      setPageActive();
      setAddress();
      if (leaseAds === null) {
        leaseAds = window.createLeaseAdArray(TOTAL);
      }
      window.renderPins(leaseAds, pinsContainer);
      setPinClickHandler();
    }
  }

  // map.classList.toggle('map--faded');
  // window.renderCard(card, filtersContainer);
  // window.renderPins(leaseAds, pinsContainer);
})();

// function enabledForm() {
//   form.classList.remove('ad-form--disabled');
//   fieldsets.forEach(function(fieldset) {
//     fieldset.disabled = false;
//   });
// }

// function disabledForm() {
//   form.classList.add('ad-form--disabled');
//   fieldsets.forEach(function(fieldset) {
//     fieldset.disabled = true;
//   });
// }
