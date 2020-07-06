'use strict';
(function () {
  var TITLE_LENGTH = {
    MIN: 30,
    MAX: 100
  };

  var FORM_SELECTOR = {
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

  var TYPE_INFO = {
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
      MIN_PRICE: 10000,
      MESSAGE: 'Для выбранного типа жилья рекомендуемая стоимость от 10000 рублей'
    }
  };

  var ROOM_OPTION = {
    FIRST_OPTION: {
      ROOMS: 1,
      MIN_GUESTS: 1,
      MAX_GUESTS: 1,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя'
    },
    SECOND_OPTION: {
      ROOMS: 2,
      MIN_GUESTS: 1,
      MAX_GUESTS: 2,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей'
    },
    THIRD_OPTION: {
      ROOMS: 3,
      MIN_GUESTS: 1,
      MAX_GUESTS: 3,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: для 1 гостя, для 2 гостей, для 3 гостей'
    },
    FOURTH_OPTION: {
      ROOMS: 100,
      MIN_GUESTS: 0,
      MAX_GUESTS: 0,
      MESSAGE: 'Для выбранного количества комнат можно выбрать количество гостей: не для гостей'
    }
  };

  var form = document.querySelector(FORM_SELECTOR.FORM);
  var fieldsets = Array.from(form.querySelectorAll(FORM_SELECTOR.FIELDSET));
  var titleInput = form.querySelector(FORM_SELECTOR.TITLE);
  var typeSelect = form.querySelector(FORM_SELECTOR.TYPE);
  var priceField = form.querySelector(FORM_SELECTOR.PRICE);
  var checkinSelect = form.querySelector(FORM_SELECTOR.CHECKIN);
  var checkoutSelect = form.querySelector(FORM_SELECTOR.CHECKOUT);
  var roomsSelect = form.querySelector(FORM_SELECTOR.ROOM);
  var capacitySelect = form.querySelector(FORM_SELECTOR.CAPACITY);

  function toggleForm() {
    form.classList.toggle(FORM_SELECTOR.FORM_DISABLED);
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isFormActive() {
    return !(form.classList.contains(FORM_SELECTOR.FORM_DISABLED));
  }

  function onTypeChange(evt) {
    priceField.placeholder = TYPE_INFO[evt.target.value].MIN_PRICE;
    priceField.min = TYPE_INFO[evt.target.value].MIN_PRICE;
    validatePrice();
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
    var selectedValue = evt.target.value;
    var selectedIndex = evt.target.selectedIndex;
    var capacities = Array.from(capacitySelect);
    capacities.forEach(function (option) {
      option.disabled = selectedValue <= option.index;
      if (selectedIndex === capacitySelect.options.length - 1) {
        option.disabled = true;
        capacitySelect.options[selectedIndex].disabled = false;
      }
    });
    validateCapacity();
  }

  function validateCapacity() {
    var selectedCapacity = parseInt(capacitySelect.value, 10);
    var selectedRooms = parseInt(roomsSelect.value, 10);
    var message = '';

    capacitySelect.setCustomValidity('');

    switch (selectedRooms) {
      case (ROOM_OPTION.FIRST_OPTION.ROOMS): {
        if (selectedCapacity > ROOM_OPTION.FIRST_OPTION.MAX_GUESTS || selectedCapacity < ROOM_OPTION.FIRST_OPTION.MIN_GUESTS) {
          message = ROOM_OPTION.FIRST_OPTION.MESSAGE;
        }
        break;
      }
      case (ROOM_OPTION.SECOND_OPTION.ROOMS): {
        if (selectedCapacity > ROOM_OPTION.SECOND_OPTION.MAX_GUESTS || selectedCapacity < ROOM_OPTION.SECOND_OPTION.MIN_GUESTS) {
          message = ROOM_OPTION.SECOND_OPTION.MESSAGE;
        }
        break;
      }
      case (ROOM_OPTION.THIRD_OPTION.ROOMS): {
        if (selectedCapacity > ROOM_OPTION.THIRD_OPTION.MAX_GUESTS || selectedCapacity < ROOM_OPTION.THIRD_OPTION.MIN_GUESTS) {
          message = ROOM_OPTION.THIRD_OPTION.MESSAGE;
        }
        break;
      }
      case (ROOM_OPTION.FOURTH_OPTION.ROOMS): {
        if (selectedCapacity !== ROOM_OPTION.FOURTH_OPTION.MAX_GUESTS) {
          message = ROOM_OPTION.FOURTH_OPTION.MESSAGE;
        }
        break;
      }
    }

    capacitySelect.setCustomValidity(message);
  }

  function setMessage(price, message) {
    if (price < TYPE_INFO[typeSelect.value].MIN_PRICE) {
      message = TYPE_INFO[typeSelect.value].MESSAGE;
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

  function onPriceFieldChange() {
    validatePrice();
  }

  function onCapacityChange() {
    validateCapacity();
  }

  function onTitleInput(evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < TITLE_LENGTH.MIN) {
      titleInput.setCustomValidity('Ещё ' + (TITLE_LENGTH.MIN - valueLength) + ' симв.');
    } else if (valueLength > TITLE_LENGTH.MAX) {
      titleInput.setCustomValidity('Ваш заголовок больше рекомендуемого на ' + (valueLength - TITLE_LENGTH.MAX) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  typeSelect.addEventListener('change', onTypeChange);
  priceField.addEventListener('change', onPriceFieldChange);
  checkinSelect.addEventListener('change', onCheckChange);
  checkoutSelect.addEventListener('change', onCheckChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  capacitySelect.addEventListener('change', onCapacityChange);
  titleInput.addEventListener('input', onTitleInput);

  window.form = {
    isFormActive: isFormActive,
    toggle: toggleForm,
    element: form
  };
})();
