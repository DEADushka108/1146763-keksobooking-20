'use strict';
(function () {
  var appendElement = window.utils.appendElement;
  var mainContainer = document.querySelector('main');

  function onErrorSend() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonRemove);
    appendElement(errorElement, mainContainer);

    document.addEventListener('keydown', onEscButtonPress);
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
  }

  function onEscButtonPress(evt) {
    var isCorrectKey = evt.key === 'Escape';
    if (isCorrectKey && document.querySelector('.success')) {
      onMouseDownSuccessRemove();
    } else if (isCorrectKey && document.querySelector('.error')) {
      onErrorButtonRemove();
    }
  }

  window.modal = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
