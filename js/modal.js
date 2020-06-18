'use strict';
(function () {
  var appendElement = window.utils.appendElement;
  var mainContainer = document.querySelector('main');

  function onErrorSend() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__button').addEventListener('click', function () {
      errorElement.remove();
    });

    appendElement(errorElement, mainContainer);
  }

  function onSuccessSend() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    successElement.querySelector('.success__message').addEventListener('mousedown', function () {
      successElement.remove();
    });

    appendElement(successElement, mainContainer);
  }

  window.modal = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
