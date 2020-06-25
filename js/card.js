'use strict';
(function () {
  var HIDE_CLASS = 'hidden';
  var CardContent = {
    template: '#card',
    card: '.map__card',
    avatar: '.popup__avatar',
    title: '.popup__title',
    address: '.popup__text--address',
    price: '.popup__text--price',
    type: '.popup__type',
    capacity: '.popup__text--capacity',
    time: '.popup__text--time',
    features: '.popup__features',
    feature: 'popup__feature',
    photos: '.popup__photos',
    photo: 'popup__photo',
    description: '.popup__description',
  };

  var Types = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var appendElement = window.utils.appendElement;
  var clearChildren = window.utils.clearChildren;

  function createPhoto(src) {
    var photoElement = document.createElement('img');
    photoElement.setAttribute('src', src);
    photoElement.setAttribute('alt', 'Фотография жилья');
    photoElement.setAttribute('width', 45);
    photoElement.setAttribute('heigth', 40);
    photoElement.classList.add(CardContent.photo);

    return photoElement;
  }

  function createFeature(name) {
    var featureElement = document.createElement('li');
    featureElement.classList.add(CardContent.feature, CardContent.feature + '--' + name);
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
        var cardElement = createPhoto(src);
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
    var cardTemplate = document.querySelector(CardContent.template).content.querySelector(CardContent.card);
    var cardElement = cardTemplate.cloneNode(true);
    var photosContainer = cardElement.querySelector(CardContent.photos);
    var featuresContainer = cardElement.querySelector(CardContent.features);

    setImageBlock(advert.author.avatar, cardElement, CardContent.avatar);
    setTextBlock(advert.offer.title, cardElement, CardContent.title);
    setTextBlock(advert.offer.address, cardElement, CardContent.address);
    setTextBlock(advert.offer.price, cardElement, CardContent.price, advert.offer.price + '₽/ночь');
    setTextBlock(advert.offer.type, cardElement, CardContent.type, Types[advert.offer.type]);
    setTextBlock(advert.offer.rooms && advert.offer.guests, cardElement, CardContent.capacity, advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
    setTextBlock(advert.offer.checkin && advert.offer.checkout, cardElement, CardContent.time, 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
    setTextBlock(advert.offer.description, cardElement, CardContent.description);
    createPhotoElements(photosContainer, advert.offer.photos);
    createFeatureElements(featuresContainer, advert.offer.features);

    cardElement.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscButtonPress);

    return cardElement;
  }

  function onCloseButtonClick() {
    var cardElement = document.querySelector(CardContent.card);
    var pinElement = document.querySelector('.map__pin--active');

    pinElement.classList.remove('map__pin--active');

    cardElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
  }

  function onEscButtonPress(evt) {
    if (evt.key === 'Escape') {
      onCloseButtonClick();
    }
  }

  function removeCard() {
    var cardElement = document.querySelector(CardContent.card);

    if (cardElement) {
      cardElement.remove();
    }
  }

  window.card = {
    create: createCard,
    remove: removeCard
  };
})();
