'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  function createPin(data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').setAttribute('src', data.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', data.offer.title);
    return pinElement;
  }

  function renderPins(array, container) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (arr) {
      var pinElement = createPin(arr);
      window.appendElement(pinElement, fragment);
    });

    window.appendElement(fragment, container);
  }

  window.createPin = createPin;
  window.renderPins = renderPins;
})();
