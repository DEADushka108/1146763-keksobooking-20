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

var DESCRIPTIONS = [
  'Великолепный вариан в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Без интернета, регистрации и СМС. Расположена на краю парка',
  'Уютное гнездышко для молодоженов',
  'Подходит для всех кто любит тишину.',
  'Находится в старинном центре города. Только для тех кто может себе позволить роскошь. Лакеев и прочих жокеев просим не беспокоить.',
  'Минимализм во всем. Для самых не требовательных.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var pinsContainer = map.querySelector('.map__pins');
var avatars = generateAvatars();
var leaseAds = createLeaseAdArray();
var filtersContainer = document.querySelector('.map__filters-container');


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
  }
  return getShuffledArray(newArray);
}

function createLeaseAd() {
  var locationX = getRandomInteger(300, 900);
  var locationY = getRandomInteger(130, 630);

  var leaseAd = {
    author: {
      avatar: 'img/avatars/user0' + avatars[0] + '.png'
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomInteger(1000, 1000000),
      type: getRandomArrayElement(getObjectKeys(TYPES)),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(0, 3),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: spliceArray(getShuffledArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getShuffledArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
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

function appendElement(element, fragmentElement) {
  return fragmentElement.appendChild(element);
}

function createPin(leaseAdElement) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = leaseAdElement.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = leaseAdElement.location.y - PIN_HEIGHT + 'px';

  pinElement.querySelector('img').setAttribute('src', leaseAdElement.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', leaseAdElement.offer.title);

  return pinElement;
}

function renderPins(leaseAdsArray) {
  var fragment = document.createDocumentFragment();

  leaseAdsArray.forEach(function (leaseAd) {
    var pinElement = createPin(leaseAd);
    appendElement(pinElement, fragment);
  });

  appendElement(fragment, pinsContainer);
}

function createPhoto(src) {
  var photoElement = document.createElement('img');
  photoElement.setAttribute('src', src);
  photoElement.setAttribute('alt', 'Фотография жилья');
  photoElement.setAttribute('width', 45);
  photoElement.setAttribute('heigth', 40);
  photoElement.classList.add('popup__photo');

  return photoElement;
}

function createFeature(name) {
  var featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature', 'popup__feature--' + name);
  return featureElement;
}

function clearChildren(parent) {
  parent.innerHTML = '';
}

function createPhotoElements(container, cardName) {
  clearChildren(container);
  cardName.offer.photos.forEach(function (src) {
    var cardElement = createPhoto(src);
    appendElement(cardElement, container);
  });
}

function createFeatureElements(container, cardName) {
  clearChildren(container);
  cardName.offer.photos.forEach(function (name) {
    var cardElement = createFeature(name);
    appendElement(cardElement, container);
  });
}

function createCard(leaseAd) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var photosContainer = cardElement.querySelector('.popup__photos');
  var featuresContainer = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__avatar').setAttribute('src', leaseAd.author.avatar);
  cardElement.querySelector('.popup__title').textContent = leaseAd.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = leaseAd.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = leaseAd.offer.price + ' &#8381;/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[leaseAd.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = leaseAd.offer.rooms + ' комнаты для ' + leaseAd.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + leaseAd.offer.checkin + ', выезд до ' + leaseAd.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = leaseAd.offer.description;
  createPhotoElements(photosContainer, leaseAd);
  createFeatureElements(featuresContainer, leaseAd);

  return cardElement;
}

function showLeaseAd(node) {
  filtersContainer.before(node);
}

map.classList.remove('map--faded');
renderPins(leaseAds);
showLeaseAd(createCard(leaseAds[0]));

//module4//

var PIN_TIP_HEIGHT = 22;
var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

// function setAddress() {
//   var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
//   var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT);

//   addressField.value = pinLocationX + ', ' + pinLocationY;
// }

function toggleForm() {
  form.classList.toggle('ad-form--disabled');
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = !fieldset.disabled;
  });
}

// function enabledForm() {
//   form.classList.remove('ad-form--disabled');
//   fieldsets.forEach(function(fieldset) {
//     fieldset.disabled = false;
//   });
// } 

// function disabledForm() {
//   form.classList.add('ad-form--disabled');
//   fieldsets.forEach(function(fieldset) {
//     fieldset.disabled = true;
//   });
// } 