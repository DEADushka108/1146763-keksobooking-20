'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var FORM_DISABLE_CLASS = 'ad-form--disabled';

  var PhotoParameter = {
    width: 70,
    heigth: 70,
    alt: 'Фотография жилья'
  };

  var TypeInfo = {
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

  var RoomOption = {
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

  var TitleLength = {
    min: 30,
    max: 100
  };

  var createPhoto = window.card.createPhoto;
  var appendElement = window.utils.appendElement;

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var priceField = form.querySelector('#price');
  var checkinSelect = form.querySelector('#timein');
  var checkoutSelect = form.querySelector('#timeout');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var titleInput = form.querySelector('#title');
  var avatarImg = form.querySelector('.ad-form__field input[type=file]');
  var photoImg = form.querySelector('.ad-form__upload input[type=file]');
  var previewAvatar = form.querySelector('.ad-form-header__preview img');
  var photoContainer = form.querySelector('.ad-form__photo-container');
  var previewPhoto = photoContainer.querySelector('.ad-form__photo');
  var deafultAvatar = previewAvatar.src;
  var photoArray = [];

  function toggleForm() {
    form.classList.toggle(FORM_DISABLE_CLASS);
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  }

  function isFormActive() {
    return !(form.classList.contains(FORM_DISABLE_CLASS));
  }

  function setValidateForm() {
    if (isFormActive) {
      validateCapacity();
      validatePrice();
    }
  }

  function onTypeChange(evt) {
    priceField.placeholder = TypeInfo[evt.target.value].minPrice;
    priceField.min = TypeInfo[evt.target.value].minPrice;
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
      case (RoomOption.firstOption.rooms): {
        if (selectedCapacity !== 1) {
          message = RoomOption.firstOption.message;
        }
        break;
      }
      case (RoomOption.secondOption.rooms): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2) {
          message = RoomOption.secondOption.message;
        }
        break;
      }
      case (RoomOption.thirdOption.rooms): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2 && selectedCapacity !== 3) {
          message = RoomOption.thirdOption.message;
        }
        break;
      }
      case (RoomOption.fourthOption.rooms): {
        if (selectedCapacity !== 0) {
          message = RoomOption.fourthOption.message;
        }
        break;
      }
    }

    capacitySelect.setCustomValidity(message);
  }

  function setMessage(price, message) {
    if (price < TypeInfo[typeSelect.value].minPrice) {
      message = TypeInfo[typeSelect.value].message;
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
    priceField.placeholder = TypeInfo[deafultType].minPrice;
    priceField.min = TypeInfo[deafultType].minPrice;
  }

  function showImage(element, onLoad) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  function createPhotoElement(src) {
    var element = document.createElement('div');
    element.classList.add('ad-form__photo');
    var image = createPhoto(src, PhotoParameter.alt, PhotoParameter.width, PhotoParameter.heigth);
    appendElement(image, element);
    photoArray.push(element);
    photoContainer.insertBefore(element, previewPhoto);
  }

  function resetPhoto() {
    if (photoArray) {
      photoArray.forEach(function (photo) {
        photo.remove();
      });
    }
    photoArray = [];
    previewAvatar.src = deafultAvatar;
  }

  avatarImg.addEventListener('change', function () {
    showImage(avatarImg, function (image) {
      previewAvatar.src = image;
    });
  });

  photoImg.addEventListener('change', function () {
    showImage(photoImg, createPhotoElement);
  });

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
    resetPhoto: resetPhoto,
    element: form
  };
})();
