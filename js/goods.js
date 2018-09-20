'use strict';

var GOODS_AMOUNT = 26;
var RATING_NUMBER = 5;
var AMOUNT_NUMBER = 5;
var SRC = 'img/cards/';


var AMOUNT = {
  min: 0,
  max: 20
};

var PRICE = {
  min: 100,
  max: 1500
};

var WEIGHT = {
  min: 30,
  max: 300
};

var RATING = {
  value: {
    min: 1,
    max: 5
  },
  number: {
    min: 10,
    max: 900
  }
};

var NUTRITION_FACTS = {
  energy: {
    min: 70,
    max: 500
  }
};


var NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок',
];

var PICTURES = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-eggplant.jpg',
  'ice-cucumber.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg',
];

var CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'лимонная кислота',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо',
];

var VALUES = [
  'one',
  'two',
  'three',
  'four',
  'five'
];


var cards = document.querySelector('.catalog__cards');
cards.classList.remove('catalog__cards--load');

var load = document.querySelector('.catalog__load');
load.classList.add('visually-hidden');


var catalogListElement = document.querySelector('.catalog__cards');


var catalogCardTemplate = document.querySelector('#card')
.content
.querySelector('.catalog__card');

var catalogCardOrderTemplate = document.querySelector('#card-order')
.content
.querySelector('.goods_card');


var cardsOrder = document.querySelector('.goods__cards');
cardsOrder.classList.remove('goods__cards--empty');

var cardEmpty = document.querySelector('.goods__card-empty');
cardEmpty.classList.add('visually-hidden');

var getRandomNumber = function (rand) {
  return rand[Math.floor(Math.random() * rand.length)];
};

var getRandomInt = function (object) {
  return Math.round(Math.random() * (object.max - object.min + 1) + object.min);
};

var getRandomContents = function (items) {
  var number = getRandomInt(0, items.length);
  var string = '';
  for (var i = 0; i < number; i++) {
    string += items[i] + ', ';
  }
  return string;
};

var getRandomBoolean = function () {
  var boolean = getRandomInt(0, 1);
  boolean = (boolean === 1) ? true : false;
  return boolean;
};

var getRating = function (element, good) {
  var ratingElement = element.querySelector('.stars__rating');
  if (good.rating.value !== RATING_NUMBER) {
    ratingElement.classList.remove('stars__rating--five');
    ratingElement.classList.add('stars__rating--' + VALUES[good.rating.value]);
  }
};

var getNutrition = function (good) {
  var sugar;
  sugar = (!good.nutritionFacts.sugar) ? 'Без сахара. ' : 'Содержит сахар. ';
  return sugar;
};

var getAmount = function (element, good) {
  switch (true) {
    case (good.amount > AMOUNT_NUMBER):
      element.classList.add('card--in-stock');
      break;
    case (good.amount > 0 < AMOUNT_NUMBER) :
      element.classList.add('card--little');
      break;
    case (good.amount === 0) :
      element.classList.add('card--soon');
      break;
  }
};

var goods = [];
for (var j = 0; j < GOODS_AMOUNT; j++) {
  goods[j] = {
    name: getRandomNumber(NAMES),
    picture: SRC + getRandomNumber(PICTURES),
    amount: getRandomInt(AMOUNT),
    price: getRandomInt(PRICE),
    weight: getRandomInt(WEIGHT),
    rating: {
      value: getRandomInt(RATING.value),
      number: getRandomInt(RATING.number),
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomInt(NUTRITION_FACTS.energy),
      contents: getRandomContents(CONTENTS),
    },
  };
}

var renderCard = function (card) {
  var cardElement = catalogCardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  var picture = cardElement.querySelector('.card__img');
  picture.src = card.picture;
  picture.alt = card.name;
  var price = cardElement.querySelector('.card__price');
  price.childNodes[0].textContent = card.price + ' ';
  price.childNodes[2].textContent = '/ ' + card.weight + ' Г';
  getRating(cardElement, card);
  cardElement.querySelector('.star__count').textContent = card.rating.number;
  cardElement.querySelector('.card__characteristic').textContent = getNutrition(card) + card.nutritionFacts.energy + ' ккал';
  cardElement.querySelector('.card__characteristic').textContent = getNutrition(card) + card.nutritionFacts.energy + ' ккал';
  cardElement.querySelector('.card__composition-list').textContent = card.nutritionFacts.contents;
  getAmount(cardElement, card);
  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < goods.length; i++) {
  fragment.appendChild(renderCard(goods[i]));
}
catalogListElement.appendChild(fragment);

// добавление выбранного товара в избранное

var addFavoriteSelector = function (evt) {
  evt.target.classList.toggle('card__btn-favorite--selected');
};
var favoriteClickBtn = function () {
  var btnFavorite = document.querySelectorAll('.card__btn-favorite');
  for (var l = 0; l < btnFavorite.length; l++) {
    btnFavorite[l].addEventListener('click', addFavoriteSelector);
  }
};
favoriteClickBtn();

// Добавление выбранного товара в корзину и управление товаром в корзине

var createBasketCard = function (target, l) {
  var idAttribute = cardsOrder.querySelector(target.id);
  if (idAttribute) {
    var cardOrderElement = catalogCardOrderTemplate.cloneNode(true);
    var card = card[l];
    cardOrderElement.querySelector('.card-order__title').textContent = card.name;
    var picture = cardOrderElement.querySelector('.card-order__img');
    picture.src = card.picture;
    picture.alt = card.name;
    var priceOrder = cardOrderElement.querySelector('.card-order__price');
    priceOrder.textContent = card.price + ' ₽';
    cardOrderElement.querySelector('.goods_card').setAttribute('id', l + 1);
    cardsOrder.appendChild(cardOrderElement);
  }
};

var catalogCard = document.querySelectorAll('.catalog__card');

var addIdAtribute = function () {
  for (var w = 0; w < catalogCard.length; w++) {
    catalogCard[w].setAttribute('id', w + 1);
  }
};
addIdAtribute();

var addToCard = function (l) {
  createBasketCard(catalogCard[l], l);
};

var cardClickBtn = function () {
  var btnCard = document.querySelectorAll('.card__btn');
  for (var l = 0; l < btnCard.length; l++) {
    btnCard[l].addEventListener('click', addToCard(l));
  }
};
cardClickBtn();

// Переключение вкладок

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

// Первая фаза работы фильтра по цене

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
