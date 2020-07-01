'use strict';
(function () {
  var TitleLength = {
    MIN: 30,
    MAX: 100
  };

  var FormSelector = {
    FORM: '.ad-form',
    DISABLED: 'ad-form--disabled',
    FIELDSET: 'fieldset',
    TITLE: '#title',
    TYPE: '#type',
    PRICE: '#price',
    CHECKIN: '#timein',
    CHECKOUT: '#timeout',
    ROOM: '#room_number',
    CAPACITY: '#capacity'
  };

  var typeInfo = {
    'bungalo': {
      minPrice: 0,
      message: null
    },
    'flat': {
      minPrice: 1000,
      message: 'Для выбранного типа жилья рекомендуемая стоимость от 1000 рублей'
    },
    'house': {
      minPrice: 5000,
      message: 'Для выбранного типа жилья рекомендуемая стоимость от 5000 рублей'
    },
    'palace': {
      minPrice: 100000,
      message: 'Для выбранного типа жилья рекомендуемая стоимость от 100000 рублей'
    }
  };

  var roomOption = {
    firstOption: {
      rooms: 1,
      message: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя'
    },
    secondOption: {
      rooms: 2,
      message: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей'
    },
    thirdOption: {
      rooms: 3,
      message: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей, для 3 гостей'
    },
    fourthOption: {
      rooms: 100,
      message: 'Для выбранного количества комнат можно выбрать количество гостей: не для гостей'
    }
  };

  var form = document.querySelector(FormSelector.FORM);
  var fieldsets = form.querySelectorAll(FormSelector.FIELDSET);
  var titleInput = form.querySelector(FormSelector.TITLE);
  var typeSelect = form.querySelector(FormSelector.TYPE);
  var priceField = form.querySelector(FormSelector.PRICE);
  var checkinSelect = form.querySelector(FormSelector.CHECKIN);
  var checkoutSelect = form.querySelector(FormSelector.CHECKOUT);
  var roomsSelect = form.querySelector(FormSelector.ROOM);
  var capacitySelect = form.querySelector(FormSelector.CAPACITY);

  function toggleForm() {
    form.classList.toggle(FormSelector.DISABLED);
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isFormActive() {
    return !(form.classList.contains(FormSelector.DISABLED));
  }

  function setValidateForm() {
    if (isFormActive) {
      validateCapacity();
      validatePrice();
    }
  }

  function onTypeChange(evt) {
    priceField.placeholder = typeInfo[evt.target.value].minPrice;
    priceField.min = typeInfo[evt.target.value].minPrice;
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
      case (roomOption.firstOption.rooms): {
        if (selectedCapacity !== 1) {
          message = roomOption.firstOption.message;
        }
        break;
      }
      case (roomOption.secondOption.rooms): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2) {
          message = roomOption.secondOption.message;
        }
        break;
      }
      case (roomOption.thirdOption.rooms): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2 && selectedCapacity !== 3) {
          message = roomOption.thirdOption.message;
        }
        break;
      }
      case (roomOption.fourthOption.rooms): {
        if (selectedCapacity !== 0) {
          message = roomOption.fourthOption.message;
        }
        break;
      }
    }

    capacitySelect.setCustomValidity(message);
  }

  function setMessage(price, message) {
    if (price < typeInfo[typeSelect.value].minPrice) {
      message = typeInfo[typeSelect.value].message;
    }
    return message;
  }

  function validatePrice() {
    var currentPrice = parseInt(priceField.value, 10);
    var message = '';

    priceField.setCustomValidity('');

    switch (typeSelect.value) {
      case 'flat': {
        message = setMessage(currentPrice, message);
        break;
      }
      case 'house': {
        message = setMessage(currentPrice, message);
        break;
      }
      case 'palace': {
        message = setMessage(currentPrice, message);
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

    if (valueLength < TitleLength.MIN) {
      titleInput.setCustomValidity('Ещё ' + (TitleLength.MIN - valueLength) + ' симв.');
    } else if (valueLength > TitleLength.MAX) {
      titleInput.setCustomValidity('Ваш заголовок больше рекомендуемого на ' + (valueLength - TitleLength.MAX) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  typeSelect.addEventListener('change', onTypeChange);
  priceField.addEventListener('input', onPriceFieldInput);
  checkinSelect.addEventListener('change', onCheckChange);
  checkoutSelect.addEventListener('change', onCheckChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  capacitySelect.addEventListener('change', onCapacityChange);
  titleInput.addEventListener('input', onTitleInput);

  window.form = {
    setValidateForm: setValidateForm,
    isFormActive: isFormActive,
    toggle: toggleForm,
    element: form
  };
})();
