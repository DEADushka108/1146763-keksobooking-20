'use strict';
(function () {
  var PIN_TIP_HEIGHT = 22;
  var COORD_LIMIT = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  addressField.disabled = true;

  function setAddress() {
    var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT);

    addressField.value = pinLocationX + ', ' + pinLocationY;
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

      if (mainPin.offsetLeft > COORD_LIMIT.x.max - mainPin.offsetWidth) {
        mainPin.style.left = COORD_LIMIT.x.max - mainPin.offsetWidth + 'px';
      } else if (mainPin.offsetLeft < COORD_LIMIT.x.min) {
        mainPin.style.left = COORD_LIMIT.x.min + 'px';
      }

      if (mainPin.offsetTop > COORD_LIMIT.y.max - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = COORD_LIMIT.y.max - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
      } else if (mainPin.offsetTop < COORD_LIMIT.y.min - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = COORD_LIMIT.y.min - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
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
    movePin: onMouseDownMovePin
  };
})();
