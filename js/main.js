'use strict';

var TOTAL = 8;

var TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

var MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 100000
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
var PIN_TIP_HEIGHT = 22;
var map = document.querySelector('.map');
var pinsContainer = map.querySelector('.map__pins');
var leaseAds = createLeaseAdArray(TOTAL);
var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var filtersContainer = document.querySelector('.map__filters-container');

var typeSelect = form.querySelector('#type');
var priceField = form.querySelector('#price');
var checkinSelect = form.querySelector('#timein');
var checkoutSelect = form.querySelector('#timeout');
var roomsSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');
var resetButton = form.querySelector('.ad-form__reset');


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

function createLeaseAd(leaseAd, index) {
  var locationX = getRandomInteger(300, 900);
  var locationY = getRandomInteger(130, 630);

  leaseAd = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
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

function createLeaseAdArray(count) {
  var arr = new Array(count).fill('').map(createLeaseAd);
  return getShuffledArray(arr);
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

  pinElement.addEventListener('click', function (evt) {
    onPinClick(evt, leaseAdElement);
  });

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
  cardName.offer.features.forEach(function (name) {
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
  cardElement.querySelector('.popup__text--price').innerHTML = leaseAd.offer.price + ' &#8381;' + ' /ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[leaseAd.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = leaseAd.offer.rooms + ' комнаты для ' + leaseAd.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + leaseAd.offer.checkin + ', выезд до ' + leaseAd.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = leaseAd.offer.description;
  createPhotoElements(photosContainer, leaseAd);
  createFeatureElements(featuresContainer, leaseAd);

  cardElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscButtonPress);

  return cardElement;
}

function setAddress() {
  var pinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
  var pinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT);

  addressField.value = pinLocationX + ', ' + pinLocationY;
}

function toggleForm() {
  form.classList.toggle('ad-form--disabled');
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = !fieldset.disabled;
  });
}

function isMapActive() {
  return !(map.classList.contains('map--faded'));
}

function isFormActive() {
  return !(form.classList.contains('ad-form--disabled'));
}

function setPageActive() {
  map.classList.remove('map--faded');
  toggleForm();
}

function setPageDisactive() {
  map.classList.add('map--faded');
  toggleForm();
}

function mainPinMouseupHandler() {
  if (!isMapActive() && !isFormActive()) {
    setPageActive();
    setAddress();
    renderPins(leaseAds);
  }
}

function removeCard() {
  var cardElement = document.querySelector('.map__card');

  if (cardElement) {
    cardElement.remove();
  }
}

function removePins() {
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin) {
    pin.remove();
  });
}

function onPinClick(evt, leaseAd) {
  var pinElement = evt.currentTarget;
  var pinElements = map.querySelectorAll('.map__pin');
  var cardElement = createCard(leaseAd);
  pinElements.forEach(removePinActiveState);
  pinElement.classList.add('map__pin--active');
  removeCard();
  map.insertBefore(cardElement, filtersContainer);
}

function removePinActiveState(pinElement) {
  pinElement.classList.remove('map__pin--active');
}

function onCloseButtonClick() {
  var cardElement = document.querySelector('.map__card');
  var activePinElements = map.querySelectorAll('.map__pin--active');
  activePinElements.forEach(removePinActiveState);
  cardElement.remove();
  document.removeEventListener('keydown', onEscButtonPress);
}

function onEscButtonPress(evt) {
  if (evt.key === 'Escape') {
    onCloseButtonClick();
  }
}

function clearPage() {
  removeCard();
  removePins();
  initPage();
}

function initPage() {
  setPageDisactive();
  setAddress();
  mainPin.addEventListener('mouseup', mainPinMouseupHandler);
}

function onTypeChange(evt) {
  priceField.placeholder = MIN_PRICES[evt.target.value];
  priceField.min = MIN_PRICES[evt.target.value];
}

function onCheckChange(evt) {
  var selectedIndex = evt.target.selectedIndex;

  if (evt.target === checkinSelect) {
    checkoutSelect.options[selectedIndex].selected = true;
  } else {
    checkinSelect.options[selectedIndex].selected = true;
  }
}

// function onRoomsChange(evt) {
//   var selectedIndex = evt.target.selectedIndex;
//   capacitySelect.options[selectedIndex].selected = true;
//   for (var i = 0; i < capacitySelect.options.length; i++) {
//     capacitySelect.options[i].disabled = true;
//     if (selectedIndex === capacitySelect.options.length - 1) {
//       capacitySelect.options[selectedIndex].disabled = false;
//     } else if (selectedIndex >= i) {
//       capacitySelect.options[i].disabled = false;
//     }
//   }
// }

function onRoomsChange(evt) {
  var selectedIndex = evt.target.selectedIndex;
  for (var i = 0; i < capacitySelect.options.length; i++) {
    capacitySelect.options[i].disabled = true;
  }
  switch (selectedIndex) {
    case (0): {
      capacitySelect.options[2].disabled = false;
      capacitySelect.options[2].selected = true;
      break;
    }
    case (1): {
      capacitySelect.options[2].disabled = false;
      capacitySelect.options[1].disabled = false;
      capacitySelect.options[2].selected = true;
      break;
    }
    case (2): {
      capacitySelect.options[0].disabled = false;
      capacitySelect.options[1].disabled = false;
      capacitySelect.options[2].disabled = false;
      capacitySelect.options[0].selected = true;
      break;
    }
    case (3): {
      capacitySelect.options[3].disabled = false;
      capacitySelect.options[3].selected = true;
      break;
    }
  }
}

function onResetButtonClick(evt) {
  evt.preventDefault();
  form.reset();
  clearPage();
}

initPage();
typeSelect.addEventListener('change', onTypeChange);
checkinSelect.addEventListener('change', onCheckChange);
checkoutSelect.addEventListener('change', onCheckChange);
roomsSelect.addEventListener('change', onRoomsChange);
resetButton.addEventListener('click', onResetButtonClick);
