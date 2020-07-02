'use strict';
(function () {
  var TitleLength = {
    MIN: 30,
    MAX: 100
  };

  var FormSelector = {
    FORM: '.ad-form',
    FORM_DISABLED: 'ad-form--disabled',
    FIELDSET: 'fieldset',
    TITLE: '#title',
    TYPE: '#type',
    PRICE: '#price',
    CHECKIN: '#timein',
    CHECKOUT: '#timeout',
    ROOM: '#room_number',
    CAPACITY: '#capacity'
  };

  var TypeInfo = {
    'bungalo': {
      MIN_PRICE: 0,
      MESSAGE: null
    },
    'flat': {
      MIN_PRICE: 1000,
      MESSAGE: 'Для выбранного типа жилья рекомендуемая стоимость от 1000 рублей'
    },
    'house': {
      MIN_PRICE: 5000,
      MESSAGE: 'Для выбранного типа жилья рекомендуемая стоимость от 5000 рублей'
    },
    'palace': {
      MIN_PRICE: 100000,
      MESSAGE: 'Для выбранного типа жилья рекомендуемая стоимость от 100000 рублей'
    }
  };

  var RoomOption = {
    FIRST_OPTION: {
      ROOMS: 1,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя'
    },
    SECOND_OPTION: {
      ROOMS: 2,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей'
    },
    THIRD_OPTION: {
      ROOMS: 3,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей, для 3 гостей'
    },
    FOURTH_OPTION: {
      ROOMS: 100,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: не для гостей'
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
    form.classList.toggle(FormSelector.FORM_DISABLED);
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isFormActive() {
    return !(form.classList.contains(FormSelector.FORM_DISABLED));
  }

  function setValidateForm() {
    if (isFormActive) {
      validateCapacity();
      validatePrice();
    }
  }

  function onTypeChange(evt) {
    priceField.placeholder = TypeInfo[evt.target.value].MIN_PRICE;
    priceField.min = TypeInfo[evt.target.value].MIN_PRICE;
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
      case (RoomOption.FIRST_OPTION.ROOMS): {
        if (selectedCapacity !== 1) {
          message = RoomOption.FIRST_OPTION.MESSAGE;
        }
        break;
      }
      case (RoomOption.SECOND_OPTION.ROOMS): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2) {
          message = RoomOption.SECOND_OPTION.MESSAGE;
        }
        break;
      }
      case (RoomOption.THIRD_OPTION.ROOMS): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2 && selectedCapacity !== 3) {
          message = RoomOption.THIRD_OPTION.MESSAGE;
        }
        break;
      }
      case (RoomOption.FOURTH_OPTION.ROOMS): {
        if (selectedCapacity !== 0) {
          message = RoomOption.FOURTH_OPTION.MESSAGE;
        }
        break;
      }
    }

    capacitySelect.setCustomValidity(message);
  }

  function setMessage(price, message) {
    if (price < TypeInfo[typeSelect.value].MIN_PRICE) {
      message = TypeInfo[typeSelect.value].MESSAGE;
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
