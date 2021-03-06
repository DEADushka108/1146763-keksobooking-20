'use strict';
(function () {
  var PIN_ACTIVE_CLASS = window.Constant.PIN_ACTIVE_CLASS;

  var PIN_PARAMETER = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var createCard = window.card.create;
  var removeCard = window.card.remove;
  var appendElement = window.utils.appendElement;
  var removeActiveState = window.utils.removeActiveState;
  var addActiveState = window.utils.addActiveState;

  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  function createPin(data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = data.location.x - PIN_PARAMETER.WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - PIN_PARAMETER.HEIGHT + 'px';
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
    var pins = Array.from(map.querySelectorAll('.map__pin:not(.map__pin--main)'));

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function onPinClick(evt, data) {
    removeCard();
    var pinElement = evt.currentTarget;
    var pinElements = Array.from(map.querySelectorAll('.map__pin'));
    var cardElement = createCard(data);

    pinElements.forEach(function (element) {
      removeActiveState(element, PIN_ACTIVE_CLASS);
    });

    addActiveState(pinElement, PIN_ACTIVE_CLASS);

    map.insertBefore(cardElement, filtersContainer);
  }

  window.pin = {
    remove: removePins,
    render: renderPins
  };
})();
