'use strict';

var TOTAL = 8;

var TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

var TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var TITLES = [
  'Просторный и чистый дворец',
  'Уютный маленький дворец в пригороде',
  'Разваливающийся дворец в центре города',
  'Просторная и теплая квартира в небоскребе',
  'Маленькая уютная квартирка в подвале',
  'Большой дом с бассейном и сауной',
  'Маленькая хибарка в самом живописном месте города',
  'Загородное бунгало со всеми удобствами',
  'Бунгало с видом на центральный парк',
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var pinsContainer = map.querySelector('.map__pins');
var avatars = generateAvatars();
var leaseAds = createLeaseAdArray();

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

function copyArray(arr) {
  return arr.slice();
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

function generateAvatars() {
  var newArray = [];
  for (var i = 1; i <= TOTAL; i++) {
    newArray.push(i);
  };

  return getShuffledArray(newArray);
}

function createLeaseAd() {
  var randomX = getRandomInteger(300, 900);
  var randomY = getRandomInteger(130, 630);

  var leaseAd = {
    author: {
      avatar: 'img/avatars/user0' + avatars[0] + '.png'
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: randomX + ', ' + randomY,
      price: getRandomInteger(1000, 1000000),
      type: getRandomArrayElement(getObjectKeys(TYPES)),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(0, 3),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: spliceArray(getShuffledArray(FEATURES)),
      description: '',
      photos: getShuffledArray(PHOTOS),
    },
    location: {
      x: randomX,
      y: randomY,
    }
  };
  return leaseAd;
}

function createLeaseAdArray() {
  var newArray = [];
  for (var i = 0; i < TOTAL; i++) {
    newArray.push(createLeaseAd());
    avatars.shift();
  }
  return newArray;
}

function createPin(leaseAdElement) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = leaseAdElement.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = leaseAdElement.location.y - PIN_HEIGHT + 'px';

  pinElement.querySelector('img').setAttribute('src', leaseAdElement.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', leaseAdElement.offer.title);

  return pinElement;
}

function renderPins(leaseAdsArray) {
  var fragment = document.createDocumentFragment();

  leaseAdsArray.forEach(function (leaseAd) {
    var pinElement = createPin(leaseAd);
    fragment.appendChild(pinElement);
  });

  pinsContainer.appendChild(fragment);
}

function callback(elem, fragment) {
  var pinElement = createPin(elem);
  fragment.appendChild(pinElement);
}

map.classList.remove('map--faded');
renderPins(leaseAds);
