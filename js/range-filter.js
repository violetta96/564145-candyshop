'use strict';

// Первая фаза работы фильтра по цене

(function () {
  var range = function () {
    var rangeFilter = document.querySelector('.range__filter');
    var PriceMin = document.querySelector('.range__price--min');
    var PriceMax = document.querySelector('.range__price--max');
    var rangeLeft = document.querySelector('.range__btn--left');
    var rangeRight = document.querySelector('.range__btn--right');
    var rangeWidth = getComputedStyle(rangeFilter).width;

    rangeLeft.addEventListener('mouseup', function () {
      var rangeLeftX = getComputedStyle(rangeLeft).left;
      PriceMin.textContent = rangeLeftX / rangeWidth;
    });

    rangeRight.addEventListener('mouseup', function () {
      var rangeRightX = getComputedStyle(rangeRight).right;
      PriceMax.textContent = rangeRightX / rangeWidth;
    });
  };
  range();
})();
