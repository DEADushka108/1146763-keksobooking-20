'use strict';
(function () {
  var HIDE_CLASS = 'hidden';
  var PIN_ACTIVE_CLASS = window.Constant.PIN_ACTIVE_CLASS;

  var PhotoParameter = {
    WIDTH: 45,
    HEIGTH: 40,
    ALT: 'Фотография жилья'
  };

  var CardContent = {
    TEMPLATE: '#card',
    CARD: '.map__card',
    AVATAR: '.popup__avatar',
    TITLE: '.popup__title',
    ADDRESS: '.popup__text--address',
    PRICE: '.popup__text--price',
    TYPE: '.popup__type',
    CAPACITY: '.popup__text--capacity',
    TIME: '.popup__text--time',
    FEATURES: '.popup__features',
    FEATURE: 'popup__feature',
    PHOTOS: '.popup__photos',
    PHOTO: 'popup__photo',
    DESCRIPTION: '.popup__description',
  };

  var type = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var appendElement = window.utils.appendElement;
  var isEscPressed = window.utils.isEscPressed;
  var removeActiveState = window.utils.removeActiveState;

  function createPhoto(src, alt, width, heigth, className) {
    var photoElement = document.createElement('img');
    photoElement.setAttribute('src', src);
    photoElement.setAttribute('alt', alt);
    photoElement.setAttribute('width', width);
    photoElement.setAttribute('heigth', heigth);
    if (className) {
      photoElement.classList.add(className);
    }
    return photoElement;
  }

  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function createFeature(name) {
    var featureElement = document.createElement('li');
    featureElement.classList.add(CardContent.FEATURE, CardContent.FEATURE + '--' + name);
    return featureElement;
  }

  function createFeatureElements(container, adData) {
    clearChildren(container);
    if (adData.length) {
      adData.forEach(function (name) {
        var cardElement = createFeature(name);
        appendElement(cardElement, container);
      });
    } else {
      container.classList.add(HIDE_CLASS);
    }
  }

  function createPhotoElements(container, adData) {
    clearChildren(container);
    if (adData.length) {
      adData.forEach(function (src) {
        var cardElement = createPhoto(src, PhotoParameter.ALT, PhotoParameter.WIDTH, PhotoParameter.HEIGTH, CardContent.PHOTO);
        appendElement(cardElement, container);
      });
    } else {
      container.classList.add(HIDE_CLASS);
    }
  }

  function setTextBlock(adData, cardElement, className, text) {
    text = text || adData;
    if (adData) {
      cardElement.querySelector(className).textContent = text;
    } else {
      cardElement.querySelector(className).classList.add(HIDE_CLASS);
    }
  }

  function setImageBlock(adData, cardElement, className) {
    if (adData) {
      cardElement.querySelector(className).src = adData;
    } else {
      cardElement.querySelector(className).classList.add(HIDE_CLASS);
    }
  }

  function createCard(advert) {
    var cardTemplate = document.querySelector(CardContent.TEMPLATE).content.querySelector(CardContent.CARD);
    var cardElement = cardTemplate.cloneNode(true);
    var photosContainer = cardElement.querySelector(CardContent.PHOTOS);
    var featuresContainer = cardElement.querySelector(CardContent.FEATURES);

    setImageBlock(advert.author.avatar, cardElement, CardContent.AVATAR);
    setTextBlock(advert.offer.title, cardElement, CardContent.TITLE);
    setTextBlock(advert.offer.address, cardElement, CardContent.ADDRESS);
    setTextBlock(advert.offer.price, cardElement, CardContent.PRICE, advert.offer.price + ' ₽/ночь');
    setTextBlock(advert.offer.type, cardElement, CardContent.TYPE, type[advert.offer.type]);
    setTextBlock(advert.offer.rooms && advert.offer.guests, cardElement, CardContent.CAPACITY, advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
    setTextBlock(advert.offer.checkin && advert.offer.checkout, cardElement, CardContent.TIME, 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
    setTextBlock(advert.offer.description, cardElement, CardContent.DESCRIPTION);
    createPhotoElements(photosContainer, advert.offer.photos);
    createFeatureElements(featuresContainer, advert.offer.features);

    cardElement.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscButtonPress);

    return cardElement;
  }

  function onCloseButtonClick() {
    var cardElement = document.querySelector(CardContent.CARD);
    var pinElement = document.querySelector(PIN_ACTIVE_CLASS);

    removeActiveState(pinElement, PIN_ACTIVE_CLASS);

    cardElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
  }

  function onEscButtonPress(evt) {
    if (isEscPressed(evt)) {
      onCloseButtonClick();
    }
  }

  function removeCard() {
    var cardElement = document.querySelector(CardContent.CARD);

    if (cardElement) {
      cardElement.remove();
    }
  }

  window.card = {
    create: createCard,
    remove: removeCard,
    createPhoto: createPhoto
  };
})();
