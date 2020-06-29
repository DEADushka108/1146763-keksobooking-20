'use strict';
(function () {
  var KeyCode = {
    enter: 13,
    esc: 27
  };

  var MOUSE_LEFT_BUTTON = 1;

  function isEnterPressed(evt) {
    return evt.keyCode === KeyCode.enter;
  }

  function isEscPressed(evt) {
    return evt.keyCode === KeyCode.esc;
  }

  function isMouseLeftButtonPressed(evt) {
    return evt.which === MOUSE_LEFT_BUTTON;
  }

  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function appendElement(element, fragmentElement) {
    return fragmentElement.appendChild(element);
  }

  window.utils = {
    clearChildren: clearChildren,
    appendElement: appendElement,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isMouseLeftButtonPressed: isMouseLeftButtonPressed
  };
})();
