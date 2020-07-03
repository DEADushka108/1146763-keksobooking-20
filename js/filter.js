'use strict';
(function () {
  var MAX_ADS = window.Constant.MAX_ADS;
  var ANY_VALUE = 'any';

  var FILTER_SELECTOR = {
    FILTERS: '.map__filters',
    TYPE: '#housing-type',
    PRICE: '#housing-price',
    ROOMS: '#housing-rooms',
    GUESTS: '#housing-guests',
    FEATURES: '#housing-features'
  };

  var FILTER_PRICE = {
    LOW: 10000,
    HIGHT: 50000
  };

  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var debounce = window.debounce;

  var filters = document.querySelector(FILTER_SELECTOR.FILTERS);
  var typeSelect = filters.querySelector(FILTER_SELECTOR.TYPE);
  var priceSelect = filters.querySelector(FILTER_SELECTOR.PRICE);
  var roomsSelect = filters.querySelector(FILTER_SELECTOR.ROOMS);
  var guestsSelect = filters.querySelector(FILTER_SELECTOR.GUESTS);
  var featuresList = filters.querySelector(FILTER_SELECTOR.FEATURES);

  function toggleFilters() {
    filters.reset();
    filters.childNodes.forEach(function (filter) {
      filter.disabled = !filter.disabled;
    });
  }

  function checkType(advert) {
    return typeSelect.value === ANY_VALUE ? true : typeSelect.value === advert.offer.type;
  }

  function checkPrice(advert) {
    if (priceSelect.value !== ANY_VALUE) {
      switch (priceSelect.value) {
        case 'low':
          return advert.offer.price < FILTER_PRICE.LOW;
        case 'middle':
          return advert.offer.price >= FILTER_PRICE.LOW && advert.offer.price < FILTER_PRICE.HIGHT;
        case 'high':
          return advert.offer.price >= FILTER_PRICE.HIGHT;
      }
    }
    return true;
  }

  function checkFeatures(advert) {
    var isCorrectFeatures = true;
    var features = Array.from(featuresList.querySelectorAll('input:checked'));
    features.forEach(function (feature) {
      if (advert.offer.features.indexOf(feature.value) === -1) {
        isCorrectFeatures = false;
        return;
      }
    });
    return isCorrectFeatures;
  }

  function checkRooms(advert) {
    return roomsSelect.value === ANY_VALUE ? true : parseInt(roomsSelect.value, 10) === parseInt(advert.offer.rooms, 10);
  }

  function checkGuests(advert) {
    return guestsSelect.value === ANY_VALUE ? true : parseInt(guestsSelect.value, 10) === parseInt(advert.offer.guests, 10);
  }

  function getFiltredData(adverts) {
    var filteredAdverts = adverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) && checkFeatures(advert) && checkGuests(advert) && checkRooms(advert);
    });
    return filteredAdverts.slice(0, MAX_ADS);
  }

  function onFilterChange() {
    removeCard();
    removePins();
    var adverts = window.adverts;
    debounce(renderPins(getFiltredData(adverts)));
  }

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    toggle: toggleFilters
  };
})();
