'use strict';
(function () {
  var PIN_ACTIVE_CLASS = 'map__pin--active';

  var PinParameters = {
    width: 50,
    height: 70
  };

  var createCard = window.card.create;
  var removeCard = window.card.remove;
  var appendElement = window.utils.appendElement;
  var removeActiveState = window.utils.removeActiveState;

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
      if (arr.offer) {
        var pinElement = createPin(arr);
        appendElement(pinElement, fragment);
      }
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

    pinElements.forEach(function (element) {
      removeActiveState(element, PIN_ACTIVE_CLASS);
    });

    pinElement.classList.add(PIN_ACTIVE_CLASS);

    removeCard();

    map.insertBefore(cardElement, filtersContainer);
  }

  window.pin = {
    remove: removePins,
    render: renderPins
  };
})();
