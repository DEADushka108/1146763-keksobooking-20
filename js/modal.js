'use strict';
(function () {
  var appendElement = window.utils.appendElement;
  var isEscPressed = window.keyboard.isEscPressed;
  var mainContainer = document.querySelector('main');

  function onErrorSend(message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    if (message) {
      errorElement.querySelector('.error__message').textContent = message;
    }
    errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonRemove);
    appendElement(errorElement, mainContainer);

    document.addEventListener('keydown', onEscButtonPress);
    document.addEventListener('mousedown', onErrorButtonRemove);
  }

  function onSuccessSend() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    successElement.querySelector('.success__message').addEventListener('mousedown', onMouseDownSuccessRemove);
    appendElement(successElement, mainContainer);

    document.addEventListener('keydown', onEscButtonPress);
  }

  function onMouseDownSuccessRemove() {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
  }

  function onErrorButtonRemove() {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
    document.removeEventListener('mousedown', onErrorButtonRemove);
  }

  function onEscButtonPress(evt) {
    if (isEscPressed(evt) && document.querySelector('.success')) {
      onMouseDownSuccessRemove();
    } else if (isEscPressed(evt) && document.querySelector('.error')) {
      onErrorButtonRemove();
    }
  }

  window.modal = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
