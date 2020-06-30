'use strict';
(function () {
  var PIN_TIP_HEIGHT = 22;
  var MAP_DISABLE_CLASS = 'map--faded';

  var CoordLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  function isMapActive() {
    return !(map.classList.contains(MAP_DISABLE_CLASS));
  }

  function setAddress() {
    var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);

    if (isMapActive()) {
      pinLocationY += Math.floor(mainPin.offsetHeight / 2 + PIN_TIP_HEIGHT);
    }

    addressField.value = pinLocationX + ', ' + pinLocationY;
    addressField.readOnly = true;
  }

  function onMouseDownMovePin(evt) {
    evt.preventDefault();
    setAddress();

    var firstCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      setAddress();

      var shift = {
        x: firstCoord.x - moveEvt.clientX,
        y: firstCoord.y - moveEvt.clientY
      };

      firstCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (mainPin.offsetLeft > CoordLimit.X.MAX - mainPin.offsetWidth / 2) {
        mainPin.style.left = CoordLimit.X.MAX - mainPin.offsetWidth / 2 + 'px';
      } else if (mainPin.offsetLeft < CoordLimit.X.MIN - mainPin.offsetWidth / 2) {
        mainPin.style.left = CoordLimit.X.MIN - mainPin.offsetWidth / 2 + 'px';
      }

      if (mainPin.offsetTop > CoordLimit.Y.MAX - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = CoordLimit.Y.MAX - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
      } else if (mainPin.offsetTop < CoordLimit.Y.MIN - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = CoordLimit.Y.MIN - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      setAddress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.dragndrop = {
    movePin: onMouseDownMovePin,
    setAddress: setAddress,
    isMapActive: isMapActive
  };
})();
