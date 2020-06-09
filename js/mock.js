'use strict';
(function () {
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

  function createLeaseAd(leaseAd, index) {
    var locationX = window.getRandomInteger(300, 900);
    var locationY = window.getRandomInteger(130, 630);

    leaseAd = {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: window.getRandomArrayElement(TITLES),
        address: locationX + ', ' + locationY,
        price: window.getRandomInteger(1000, 1000000),
        type: window.getRandomArrayElement(window.getObjectKeys(TYPES)),
        rooms: window.getRandomInteger(1, 100),
        guests: window.getRandomInteger(0, 3),
        checkin: window.getRandomArrayElement(TIMES),
        checkout: window.getRandomArrayElement(TIMES),
        features: window.spliceArray(window.getShuffledArray(FEATURES)),
        description: window.getRandomArrayElement(DESCRIPTIONS),
        photos: window.getShuffledArray(PHOTOS),
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
    return window.getShuffledArray(arr);
  }

  window.createLeaseAdArray = createLeaseAdArray;
  window.Types = TYPES;
})();
