'use strict';
(function () {
  var TYPES = {
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
    photoElement.classList.add('popup__photo');

    return photoElement;
  }

  function createFeature(name) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + name);
    return featureElement;
  }

  function createPhotoElements(container, cardName) {
    clearChildren(container);
    cardName.offer.photos.forEach(function (src) {
      var cardElement = createPhoto(src);
      appendElement(cardElement, container);
    });
  }

  function createFeatureElements(container, cardName) {
    clearChildren(container);
    cardName.offer.features.forEach(function (name) {
      var cardElement = createFeature(name);
      appendElement(cardElement, container);
    });
  }

  function createCard(advert) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var photosContainer = cardElement.querySelector('.popup__photos');
    var featuresContainer = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES[advert.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    createPhotoElements(photosContainer, advert);
    createFeatureElements(featuresContainer, advert);

    cardElement.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscButtonPress);

    return cardElement;
  }

  function onCloseButtonClick() {
    var cardElement = document.querySelector('.map__card');
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
    var cardElement = document.querySelector('.map__card');

    if (cardElement) {
      cardElement.remove();
    }
  }

  window.card = {
    create: createCard,
    remove: removeCard
  };
})();
