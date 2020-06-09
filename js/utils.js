'use strict';
(function () {

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  function getShuffledArray(arr) {
    var newArray = copyArray(arr);
    for (var i = newArray.length - 1; i >= 1; i--) {
      var j = getRandomInteger(0, i);
      var temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }
    return newArray;
  }

  function getRandomArrayElement(arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  }

  function getObjectKeys(obj) {
    var newKeysArray = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newKeysArray.push(key);
      }
    }
    return newKeysArray;
  }

  function spliceArray(arr) {
    return copyArray(arr).splice(0, getRandomInteger(0, arr.length - 1));
  }

  function copyArray(arr) {
    return arr.slice();
  }

  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function appendElement(element, fragmentElement) {
    return fragmentElement.appendChild(element);
  }

  window.getRandomInteger = getRandomInteger;
  window.getRandomArrayElement = getRandomArrayElement;
  window.spliceArray = spliceArray;
  window.copyArray = copyArray;
  window.getObjectKeys = getObjectKeys;
  window.getShuffledArray = getShuffledArray;
  window.clearChildren = clearChildren;
  window.appendElement = appendElement;
})();
