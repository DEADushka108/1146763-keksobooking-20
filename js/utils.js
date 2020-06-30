'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var MOUSE_LEFT_BUTTON = 0;

  function isEnterPressed(evt) {
    return evt.keyCode === KeyCode.ENTER;
  }

  function isEscPressed(evt) {
    return evt.keyCode === KeyCode.ESC;
  }

  function isMouseLeftButtonPressed(evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  }

  function appendElement(element, fragmentElement) {
    return fragmentElement.appendChild(element);
  }

  function removeActiveState(element, elementClass) {
    element.classList.remove(elementClass);
  }

  window.utils = {
    appendElement: appendElement,
    removeActiveState: removeActiveState,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isMouseLeftButtonPressed: isMouseLeftButtonPressed
  };
})();
