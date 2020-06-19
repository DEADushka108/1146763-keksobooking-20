'use strict';
(function () {
  var OK_STATUS = 200;

  function createXhrRequest() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    return xhr;
  }

  function checkStatus(xhr, onSuccess, onError) {
    return function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    } 
  }

  function getData(url, onSuccess, onError) {
    var xhr = createXhrRequest();
    xhr.addEventListener('load', checkStatus(xhr, onSuccess, onError));
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' сек.');
    });

    xhr.timeout = 1000;

    xhr.open('GET', url);
    xhr.send();
  }

  function sendData(url, data, onSuccess, onError) {
    var xhr = createXhrRequest();
    xhr.addEventListener('load', checkStatus(xhr, onSuccess, onError));
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.data = {
    get: getData,
    send: sendData
  };
})();
