'use strict';

(function () {
  var MAX_ADS = 5;
  var ANY_VALUE = 'any';
  var FILTER_PRICES = {
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
  // var roomsSelect = filters.querySelector('#housing-rooms');
  // var guestsSelect = filters.querySelector('#housing-guests');
  var featuresList = filters.querySelector('#housing-features');

  function toggleFilters() {
    filters.reset();
    filters.childNodes.forEach(function (filter) {
      filter.disabled = !filter.disabled;
    });
  }

  function checkType(advert) {
    var isCorrectType = true;
    if (typeSelect.value !== ANY_VALUE) {
      isCorrectType = typeSelect.value === advert.offer.type;
    }
    return isCorrectType;
  }

  function checkPrice(advert) {
    var isCorrectPrice = true;
      if (priceSelect.value !== ANY_VALUE) {
      switch (priceSelect.value) {
        case 'low':
          isCorrectPrice = advert.offer.price < FILTER_PRICES.low;
          break;
        case 'middle':
          isCorrectPrice = advert.offer.price >= FILTER_PRICES.low && advert.offer.price < FILTER_PRICES.hight;
          break;
        case 'high':
          isCorrectPrice = advert.offer.price >= FILTER_PRICES.hight;
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

  // function checkRooms(advert) {
  //   var isCorrectRooms = true;
  //   if (roomsSelect !== ANY_VALUE) {
  //     isCorrectRooms = parseInt(roomsSelect.value, 10) === parseInt(advert.offer.rooms, 10);
  //   }
  //   return isCorrectRooms;
  // }

  // function checkGuests(advert) {
  //   var isCorrectGuests = true;
  //   if (guestsSelect !== ANY_VALUE) {
  //     isCorrectGuests = parseInt(guestsSelect.value, 10) === parseInt(advert.offer.guests, 10);
  //   }
  //   return isCorrectGuests;
  // }

  function getFiltredData(adverts) {
    var filteredAdverts = adverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) && checkFeatures(advert); //&& checkGuests(advert) && checkRooms(advert);
    });
    return filteredAdverts.slice(0, MAX_ADS);
  }

  function onFilterChange() {
    removeCard();
    removePins();
    var adverts = window.adverts;
    debounce(renderPins(getFiltredData(adverts)));
  }

  // function filterAdverts(advert) {
  //   var isCorrectType = true;
  //   var isCorrectPrice = true;
  //   var isCorrectRooms = true;
  //   var isCorrectGuests = true;
  //   var isCorrectFeatures = true;
  //   var features = featuresList.querySelectorAll('input:checked');

  //   if (typeSelect.value !== ANY_VALUE) {
  //     isCorrectType = typeSelect.value === advert.offer.type;
  //   }

  //   if (priceSelect.value !== ANY_VALUE) {
  //     switch (priceSelect.value) {
  //       case 'low':
  //         isCorrectPrice = advert.offer.price < FILTER_PRICES.low;
  //         break;
  //       case 'middle':
  //         isCorrectPrice = advert.offer.price >= FILTER_PRICES.low && advert.offer.price < FILTER_PRICES.hight;
  //         break;
  //       case 'high':
  //         isCorrectPrice = advert.offer.price >= FILTER_PRICES.hight;
  //     }
  //   }

  //   if (roomsSelect !== ANY_VALUE) {
  //     isCorrectRooms = parseInt(roomsSelect.value, 10) === advert.offer.rooms;
  //   }

  //   if (guestsSelect !== ANY_VALUE) {
  //     isCorrectGuests = parseInt(guestsSelect.value, 10) === advert.offer.guests;
  //   }

  //   features.forEach(function (feature) {
  //     if (advert.offer.features.indexOf(feature.value) === -1) {
  //       isCorrectFeatures = false;
  //       return;
  //     }
  //   });

  //   return isCorrectType && isCorrectPrice && isCorrectFeatures && isCorrectRooms && isCorrectGuests;
  // }

  // function onFilterChange() {
  //   var adverts = window.adverts.filter(filterAdverts);
  //   removeCard();
  //   removePins();
  //   debounce(renderPins(adverts.slice(0, MAX_ADS)));
  // }

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    toggle: toggleFilters
  };
})();
