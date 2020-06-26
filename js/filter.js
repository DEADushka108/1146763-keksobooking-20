'use strict';

(function () {
  var MAX_ADS = 5;
  var ANY_VALUE = 'any';
  var FilterPrices = {
    'low': 10000,
    'hight': 50000
  };

  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var debounce = window.debounce;

  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresList = filters.querySelector('#housing-features');

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
    var isCorrectPrice = true;
    if (priceSelect.value !== ANY_VALUE) {
      switch (priceSelect.value) {
        case 'low':
          isCorrectPrice = advert.offer.price < FilterPrices.low;
          break;
        case 'middle':
          isCorrectPrice = advert.offer.price >= FilterPrices.low && advert.offer.price < FilterPrices.hight;
          break;
        case 'high':
          isCorrectPrice = advert.offer.price >= FilterPrices.hight;
      }
    }
    return isCorrectPrice;
  }

  function checkFeatures(advert) {
    var isCorrectFeatures = true;
    var features = featuresList.querySelectorAll('input:checked');
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
