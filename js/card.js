'use strict';
(function () {
  var HIDE_CLASS = 'hidden';
  var PIN_ACTIVE_CLASS = window.Constant.PIN_ACTIVE_CLASS;

  var PHOTO_PARAMETER = {
    WIDTH: 45,
    HEIGTH: 40,
    ALT: 'Фотография жилья'
  };

  var CARD_CONTENT = {
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

  var TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var appendElement = window.utils.appendElement;
  var isEscPressed = window.utils.isEscPressed;
  var removeActiveState = window.utils.removeActiveState;
  var addActiveState = window.utils.addActiveState;

  function createPhoto(src, alt, width, heigth, className) {
    var photoElement = document.createElement('img');
    photoElement.setAttribute('src', src);
    photoElement.setAttribute('alt', alt);
    photoElement.setAttribute('width', width);
    photoElement.setAttribute('heigth', heigth);
    if (className) {
      addActiveState(photoElement, className);
    }
    return photoElement;
  }

  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function createFeature(name) {
    var featureElement = document.createElement('li');
    addActiveState(featureElement, CARD_CONTENT.FEATURE);
    addActiveState(featureElement, CARD_CONTENT.FEATURE + '--' + name);
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
      addActiveState(container, HIDE_CLASS);
    }
  }

  function createPhotoElements(container, adData) {
    clearChildren(container);
    if (adData.length) {
      adData.forEach(function (src) {
        var cardElement = createPhoto(src, PHOTO_PARAMETER.ALT, PHOTO_PARAMETER.WIDTH, PHOTO_PARAMETER.HEIGTH, CARD_CONTENT.PHOTO);
        appendElement(cardElement, container);
      });
    } else {
      addActiveState(container, HIDE_CLASS);
    }
  }

  function setTextBlock(adData, cardElement, className, text) {
    text = text || adData;
    if (adData) {
      cardElement.querySelector(className).textContent = text;
    } else {
      addActiveState(cardElement.querySelector(className), HIDE_CLASS);
    }
  }

  function setImageBlock(adData, cardElement, className) {
    if (adData) {
      cardElement.querySelector(className).src = adData;
    } else {
      addActiveState(cardElement.querySelector(className), HIDE_CLASS);
    }
  }

  function createCard(advert) {
    var cardTemplate = document.querySelector(CARD_CONTENT.TEMPLATE).content.querySelector(CARD_CONTENT.CARD);
    var cardElement = cardTemplate.cloneNode(true);
    var photosContainer = cardElement.querySelector(CARD_CONTENT.PHOTOS);
    var featuresContainer = cardElement.querySelector(CARD_CONTENT.FEATURES);

    setImageBlock(advert.author.avatar, cardElement, CARD_CONTENT.AVATAR);
    setTextBlock(advert.offer.title, cardElement, CARD_CONTENT.TITLE);
    setTextBlock(advert.offer.address, cardElement, CARD_CONTENT.ADDRESS);
    setTextBlock(advert.offer.price, cardElement, CARD_CONTENT.PRICE, advert.offer.price + ' ₽/ночь');
    setTextBlock(advert.offer.type, cardElement, CARD_CONTENT.TYPE, TYPE[advert.offer.type]);
    setTextBlock(advert.offer.rooms && advert.offer.guests, cardElement, CARD_CONTENT.CAPACITY, advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
    setTextBlock(advert.offer.checkin && advert.offer.checkout, cardElement, CARD_CONTENT.TIME, 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
    setTextBlock(advert.offer.description, cardElement, CARD_CONTENT.DESCRIPTION);
    createPhotoElements(photosContainer, advert.offer.photos);
    createFeatureElements(featuresContainer, advert.offer.features);

    cardElement.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscButtonPress);

    return cardElement;
  }

  function onCloseButtonClick() {
    var cardElement = document.querySelector(CARD_CONTENT.CARD);
    var pinElement = document.querySelector('.map__pin--active');

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
    var cardElement = document.querySelector(CARD_CONTENT.CARD);

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
