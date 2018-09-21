'use strict';

// Переключение вкладок

(function () {

  var deliverToggle = document.querySelector('.deliver__toggle');
  var deliverCourier = document.querySelector('.deliver__courier');
  var deliverStore = document.querySelector('.deliver__store');

  deliverToggle.addEventListener('click', function (evt) {
    if (evt.target.id === '.deliver__courier') {
      deliverCourier.classList.toggle('visually-hidden');
      deliverStore.classList.toggle('visually-hidden');
    } if (evt.target.id === '.deliver__store') {
      deliverStore.classList.toggle('visually-hidden');
      deliverCourier.classList.toggle('visually-hidden');
    }
  });

  var paymentMethod = document.querySelector('.payment__method');
  var paymentCard = document.querySelector('.payment__card-wrap');
  var paymentCash = document.querySelector('.payment__cash-wrap');

  paymentMethod.addEventListener('click', function (evt) {
    if (evt.target.id === 'payment__card') {
      paymentCard.classList.toggle('visually-hidden');
      paymentCash.classList.toggle('visually-hidden');
    } if (evt.target.id === 'payment__cash') {
      paymentCash.classList.toggle('visually-hidden');
      paymentCard.classList.toggle('visually-hidden');
    }
  });
})();
