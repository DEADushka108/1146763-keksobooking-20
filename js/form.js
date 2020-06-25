'use strict';
(function () {
  var MinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };

  var TitleLength = {
    min: 30,
    max: 100
  };

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var priceField = form.querySelector('#price');
  var checkinSelect = form.querySelector('#timein');
  var checkoutSelect = form.querySelector('#timeout');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var titleInput = form.querySelector('#title');

  function toggleForm() {
    form.classList.toggle('ad-form--disabled');
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isFormActive() {
    return !(form.classList.contains('ad-form--disabled'));
  }

  function setValidateForm() {
    if (isFormActive) {
      validateCapacity();
      validatePrice();
    }
  }

  function onTypeChange(evt) {
    priceField.placeholder = MinPrices[evt.target.value];
    priceField.min = MinPrices[evt.target.value];
  }

  function onCheckChange(evt) {
    var selectedIndex = evt.target.selectedIndex;

    if (evt.target === checkinSelect) {
      checkoutSelect.options[selectedIndex].selected = true;
    } else {
      checkinSelect.options[selectedIndex].selected = true;
    }
  }

  function onRoomsChange(evt) {
    var selectedIndex = evt.target.selectedIndex;
    capacitySelect.options[selectedIndex].selected = true;
    for (var i = 0; i < capacitySelect.options.length; i++) {
      capacitySelect.options[i].disabled = true;
      if (selectedIndex === capacitySelect.options.length - 1) {
        capacitySelect.options[selectedIndex].disabled = false;
      } else if (selectedIndex >= i) {
        capacitySelect.options[i].disabled = false;
      }
    }
  }

  function validateCapacity() {
    var selectedCapacity = parseInt(capacitySelect.value, 10);
    var selectedRooms = parseInt(roomsSelect.value, 10);
    var message = '';

    capacitySelect.setCustomValidity('');

    switch (selectedRooms) {
      case (1): {
        if (selectedCapacity !== 1) {
          message = 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя';
        }
        break;
      }
      case (2): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2) {
          message = 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей';
        }
        break;
      }
      case (3): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2 && selectedCapacity !== 3) {
          message = 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей, для 3 гостей';
        }
        break;
      }
      case (100): {
        if (selectedCapacity !== 0) {
          message = 'Для выбранного количества комнат можно выбрать количество гостей: не для гостей';
        }
        break;
      }
    }

    capacitySelect.setCustomValidity(message);
  }

  function isCorrectPrice(price) {
    return price < MinPrices[typeSelect.value] ? true : false;
  }

  function validatePrice() {
    var setPrice = parseInt(priceField.value, 10);
    var message = '';

    priceField.setCustomValidity('');

    switch (typeSelect.value) {
      case 'flat': {
        if (isCorrectPrice(setPrice)) {
          message = 'Для выбранного типа жилья рекомендуемая стоимость от 1000 рублей';
        }
        break;
      }
      case 'house': {
        if (isCorrectPrice(setPrice)) {
          message = 'Для выбранного типа жилья рекомендуемая стоимость от 5000 рублей';
        }
        break;
      }
      case 'palace': {
        if (isCorrectPrice(setPrice)) {
          message = 'Для выбранного типа жилья рекомендуемая стоимость от 100000 рублей';
        }
        break;
      }
    }

    priceField.setCustomValidity(message);
  }

  function onPriceFieldInput() {
    validatePrice();
  }

  function onCapacityChange() {
    validateCapacity();
  }

  function onTitleInput(evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < TitleLength.min) {
      titleInput.setCustomValidity('Ещё ' + (TitleLength.min - valueLength) + ' симв.');
    } else if (valueLength > TitleLength.max) {
      titleInput.setCustomValidity('Ваш заголовок больше рекомендуемого на ' + (valueLength - TitleLength.max) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function onFormReset() {
    var deafultType = typeSelect.querySelector('option[selected]').value;
    priceField.placeholder = MinPrices[deafultType];
    priceField.min = MinPrices[deafultType];
  }

  typeSelect.addEventListener('change', onTypeChange);
  priceField.addEventListener('input', onPriceFieldInput);
  checkinSelect.addEventListener('change', onCheckChange);
  checkoutSelect.addEventListener('change', onCheckChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  capacitySelect.addEventListener('change', onCapacityChange);
  titleInput.addEventListener('input', onTitleInput);
  form.addEventListener('reset', onFormReset);

  window.form = {
    setValidateForm: setValidateForm,
    isFormActive: isFormActive,
    toggle: toggleForm,
    element: form
  };
})();
