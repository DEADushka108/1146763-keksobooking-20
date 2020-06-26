'use strict';
(function () {
  var PinParameters = {
    width: 50,
    height: 70
  };

  var createCard = window.card.create;
  var removeCard = window.card.remove;
  var appendElement = window.utils.appendElement;

  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  function createPin(data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = data.location.x - PinParameters.width / 2 + 'px';
    pinElement.style.top = data.location.y - PinParameters.height + 'px';
    pinElement.querySelector('img').setAttribute('src', data.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', data.offer.title);

    pinElement.addEventListener('click', function (evt) {
      onPinClick(evt, data);
    });

    return pinElement;
  }

  function renderPins(array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (arr) {
      var pinElement = createPin(arr);
      appendElement(pinElement, fragment);
    });

    appendElement(fragment, pinsContainer);
  }

  function removePins() {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function onPinClick(evt, data) {
    var pinElement = evt.currentTarget;
    var pinElements = map.querySelectorAll('.map__pin');
    var cardElement = createCard(data);

    pinElements.forEach(removePinActiveState);
    pinElement.classList.add('map__pin--active');

    removeCard();

    map.insertBefore(cardElement, filtersContainer);
  }

  function removePinActiveState(pinElement) {
    pinElement.classList.remove('map__pin--active');
  }

  window.pin = {
    remove: removePins,
    render: renderPins
  };
})();
