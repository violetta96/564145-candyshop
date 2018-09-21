'use strict';

// Алгоритм Луна

var moonAlgorythm = function (cardNumber) {
  var arr = cardNumber.split('').map(function (char, index) {
    var digit = parseInt(char, 10);

    if ((index + cardNumber.length) % 2 === 0) {
      var digitX2 = digit * 2;

      return digitX2 > 9 ? digitX2 - 9 : digitX2;
    }

    return digit;
  });

  return !(arr.reduce(function (a, b) {
    return a + b;
  },
  0) % 10);
};

// Валидация формы

var modalSuccess = document.querySelector('.modal--success');
var modalError = document.querySelector('.modal--error');
var closeModal = document.querySelector('.modal__close');
var btnError = document.querySelector('.modal__close');

var openModal = function (modal) {
  modal.classList.remove('modal--hidden');
};

closeModal.addEventListener('click', function () {
  modalSuccess.classList.add('modal--hidden');
});

btnError.addEventListener('click', function () {
  modalError.classList.add('modal--hidden');
});


var checkValidity = function () {
  var error = checkContactData() || checkDelivery() || checkCreditCard();
  if (error) {
    openModal(modalError);
  } else {
    openModal(modalSuccess);
  }
};

var contactDataName = document.querySelector('#contact-data__name');
var contactDataTel = document.querySelector('#contact-data__tel');
var contactDataEmail = document.querySelector('#contact-data__email');
var deliverStreet = document.querySelector('#deliver__street');
var deliverHouse = document.querySelector('#deliver__house');
var deliverRoom = document.querySelector('#deliver__room');
var paymentInputs = document.querySelector('.payment__inputs');
var paymentCardNumber = document.querySelector('#payment__card-number');
var paymentСardВate = document.querySelector('#payment__card-date');
var paymentСardСvc = document.querySelector('#payment__card-cvc');
var paymentСardholder = document.querySelector('#payment__cardholder');
var paymentCardStatus = document.querySelector('.payment__card-status');

var checkContactData = function () {
  if (contactDataName.checkValidity() || contactDataTel.checkValidity() || contactDataEmail.checkValidity()) {
    return true;
  } else {
    return false;
  }
};


var checkDelivery = function () {
  if (deliverStreet.checkValidity() || deliverHouse.checkValidity() || deliverRoom.checkValidity()) {
    return true;
  } else {
    return false;
  }
};

var checkCreditCard = function () {
  if (moonAlgorythm(paymentCardNumber.value) && paymentСardВate.checkValidity()
  && paymentСardСvc.checkValidity() && paymentСardholder.checkValidity()) {
    return true;
  } else {
    return false;
  }
};

paymentInputs.addEventListener('change', function () {
  if (!moonAlgorythm(paymentCardNumber.value) || !paymentСardВate.checkValidity()
  || !paymentСardСvc.checkValidity() || !paymentСardholder.checkValidity()) {
    paymentCardStatus.textContent = 'НЕ ОПРЕДЕЛЁН';
  } else {
    paymentCardStatus.textContent = 'ОДОБРЕН';
  }
});

var buySubmitBtn = document.querySelector('.buy__submit-btn');

buySubmitBtn.addEventListener('click', function () {
  if (!moonAlgorythm(paymentCardNumber.value)) {
    paymentCardNumber.setCustomValidity('Проверьте введённые данные');
    openModal(modalError);
  } else {
    paymentCardNumber.setCustomValidity('');
    checkValidity();
  }
});
