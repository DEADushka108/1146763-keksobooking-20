'use strict';

(function () {
  var MAX_ADS = 5;
  var FILTER_PRICES = {
    'low': 10000,
    'hight': 50000
  };

  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresList = filters.querySelector('#housing-features');


  console.log(filters.childNodes);
  function toggleFilters() {
    filters.reset();
    filters.childNodes.forEach(function (filter) {
      filter.disabled = !filter.disabled;
    });
  }

  function filterLeaseAds(leaseAd) {
    var isCorrectType = true;
    var isCorrectPrice = true;
    var isCorrectRooms = true;
    var isCorrectGuests = true;
    var isCorrectFeatures = true;
    var features = featuresList.querySelectorAll('input:checked');

    if (typeSelect.value !== 'any') {
      isCorrectType = typeSelect.value === leaseAd.offer.type;
    }

    if (priceSelect.value !== 'any') {
      switch (priceSelect.value) {
        case 'low':
          isCorrectPrice = leaseAd.offer.price < FILTER_PRICES.low;
          break;
        case 'middle':
          isCorrectPrice = leaseAd.offer.price >= FILTER_PRICES.low && leaseAd.offer.price < FILTER_PRICES.hight;
          break;
        case 'high':
          isCorrectPrice = leaseAd.offer.price >= FILTER_PRICES.hight;
      }
    }

    if (roomsSelect !== 'any') {
      isCorrectRooms = parseInt(roomsSelect.value, 10) === leaseAd.offer.rooms;
    }

    if (guestsSelect !== 'any') {
      isCorrectGuests = parseInt(guestsSelect.value, 10) === leaseAd.offer.guests;
    }

    features.forEach(function (feature) {
      if (leaseAd.offer.features.indexOf(feature.value) === -1) {
        isCorrectFeatures = false;
        return;
      }
    });

    return isCorrectType && isCorrectPrice && isCorrectRooms && isCorrectGuests && isCorrectFeatures;
  }

  function onFilterChange() {
    var leaseAds = window.leaseAds.filter(filterLeaseAds);
    window.card.remove();
    window.pin.remove();
    window.pin.render(leaseAds.slice(0, MAX_ADS));
  }

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    toggle: toggleFilters
  };
})();
