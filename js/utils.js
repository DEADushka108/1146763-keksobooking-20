'use strict';
(function () {
  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function appendElement(element, fragmentElement) {
    return fragmentElement.appendChild(element);
  }

  window.utils = {
    clearChildren: clearChildren,
    appendElement: appendElement
  };

})();
