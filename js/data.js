'use strict';
(function () {
  function getData(url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('ошибка');
    });

    xhr.addEventListener('timeout', function () {
      onError('таймаут');
    });

    xhr.open('GET', url);

    xhr.send();
  }

  window.data = {
    get: getData
  };
})();
