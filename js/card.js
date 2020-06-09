'use strict';
(function () {
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
    window.clearChildren(container);
    cardName.offer.photos.forEach(function (src) {
      var cardElement = createPhoto(src);
      window.appendElement(cardElement, container);
    });
  }

  function createFeatureElements(container, cardName) {
    window.clearChildren(container);
    cardName.offer.features.forEach(function (name) {
      var cardElement = createFeature(name);
      window.appendElement(cardElement, container);
    });
  }

  function createCard(leaseAd) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var photosContainer = cardElement.querySelector('.popup__photos');
    var featuresContainer = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__avatar').setAttribute('src', leaseAd.author.avatar);
    cardElement.querySelector('.popup__title').textContent = leaseAd.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = leaseAd.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = leaseAd.offer.price + ' &#8381;/ночь';
    cardElement.querySelector('.popup__type').textContent = window.Types[leaseAd.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = leaseAd.offer.rooms + ' комнаты для ' + leaseAd.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + leaseAd.offer.checkin + ', выезд до ' + leaseAd.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = leaseAd.offer.description;
    createPhotoElements(photosContainer, leaseAd);
    createFeatureElements(featuresContainer, leaseAd);

    return cardElement;
  }

  function renderCard(node, container) {
    container.before(node);
  }

  window.createCard = createCard;
  window.renderCard = renderCard;
})();
