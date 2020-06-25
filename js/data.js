'use strict';
(function () {
  var OK_STATUS = 200;

  function createXhrRequest() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    return xhr;
  }

  function isSuccessStatus(status) {
    return status === OK_STATUS ? true : false;
  }

  function getData(url, onSuccess, onError) {
    var xhr = createXhrRequest();
    xhr.addEventListener('load', function () {
      if (isSuccessStatus(xhr.status)) {
        onSuccess(xhr.response);
      } else {
        onError();
        // onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError();
      // onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError();
      // onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' сек.');
    });

    // xhr.timeout = 1000;

    xhr.open('GET', url);
    xhr.send();
  }

  function sendData(url, data, onSuccess, onError) {
    var xhr = createXhrRequest();
    xhr.addEventListener('load', function () {
      if (isSuccessStatus(xhr.status)) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.data = {
    get: getData,
    send: sendData
  };
})();
