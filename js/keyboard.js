'use strict';

(function () {
  var KeyCode = {
    enter: 13,
    esc: 27
  }

  function isEnterPressed(evt) {
    return evt.keyCode === KeyCode.enter;
  }

  function isEscPressed(evt) {
    return evt.keyCode === KeyCode.esc;
  }

  window.keyboard = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed
  };
})();
