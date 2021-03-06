'use strict';
(function () {
  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  function isEnterPressed(evt) {
    return evt.keyCode === KEY_CODE.ENTER;
  }

  function isEscPressed(evt) {
    return evt.keyCode === KEY_CODE.ESC;
  }

  function appendElement(element, fragmentElement) {
    return fragmentElement.appendChild(element);
  }

  function removeActiveState(element, elementClass) {
    element.classList.remove(elementClass);
  }

  function addActiveState(element, elementClass) {
    element.classList.add(elementClass);
  }

  window.utils = {
    appendElement: appendElement,
    removeActiveState: removeActiveState,
    addActiveState: addActiveState,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed
  };
})();
