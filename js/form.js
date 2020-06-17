'use strict';
(function () {
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGHT = 100;

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

  function onTypeChange(evt) {
    priceField.placeholder = MIN_PRICES[evt.target.value];
    priceField.min = MIN_PRICES[evt.target.value];
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

  // function onRoomsChange(evt) {
  //   var selectedIndex = evt.target.selectedIndex;
  //   var selectedRooms = evt.target.value;
  //   capacitySelect.options[capacitySelect.options.length - 2].selected = true;
  //   for (var i = 0; i < capacitySelect.options.length; i++) {
  //     capacitySelect.options[i].disabled = true;
  //     if (selectedRooms >= capacitySelect.options[i].value) {
  //       capacitySelect.options[i].disabled = false;
  //     } else if (selectedIndex >= i) {
  //       capacitySelect.options[i].disabled = false;
  //     }
  //   }
  // }

  // function onRoomsChange(evt) {
  //   var selectedIndex = evt.target.selectedIndex;
  //   for (var i = 0; i < capacitySelect.options.length; i++) {
  //     capacitySelect.options[i].disabled = true;
  //   }
  //   switch (selectedIndex) {
  //     case (0): {
  //       capacitySelect.options[2].disabled = false;
  //       capacitySelect.options[2].selected = true;
  //       break;
  //     }
  //     case (1): {
  //       capacitySelect.options[2].disabled = false;
  //       capacitySelect.options[1].disabled = false;
  //       capacitySelect.options[2].selected = true;
  //       break;
  //     }
  //     case (2): {
  //       capacitySelect.options[0].disabled = false;
  //       capacitySelect.options[1].disabled = false;
  //       capacitySelect.options[2].disabled = false;
  //       capacitySelect.options[0].selected = true;
  //       break;
  //     }
  //     case (3): {
  //       capacitySelect.options[3].disabled = false;
  //       capacitySelect.options[3].selected = true;
  //       break;
  //     }
  //   }
  // }

  function onTitleInput(evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGHT) {
      titleInput.setCustomValidity('Ваш заголовок больше рекомендуемого на ' + (valueLength - MAX_TITLE_LENGHT) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function onFormReset() {
    var deafultType = typeSelect.querySelector('option[selected]').value;
    priceField.placeholder = MIN_PRICES[deafultType];
    priceField.min = MIN_PRICES[deafultType];
  }

  typeSelect.addEventListener('change', onTypeChange);
  checkinSelect.addEventListener('change', onCheckChange);
  checkoutSelect.addEventListener('change', onCheckChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  titleInput.addEventListener('input', onTitleInput);
  form.addEventListener('reset', onFormReset);

  window.form = {
    toggle: toggleForm,
    element: form
  };
})();
