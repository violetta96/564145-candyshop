'use strict';

var GOODS_AMOUNT = 26;
var ORDER_AMOUNT = 3;
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

var GOOD_FACTS = {
  min: 0,
  max: 26
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

var goodsOrder = [];
for (var k = 0; k < ORDER_AMOUNT; k++) {
  goodsOrder[k] = goods[getRandomInt(GOOD_FACTS)];
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
  return cardElement;
};

var renderCardOrder = function (order) {
  var cardOrderElement = catalogCardOrderTemplate.cloneNode(true);
  cardOrderElement.querySelector('.card-order__title').textContent = order.name;
  var picture = cardOrderElement.querySelector('.card-order__img');
  picture.src = order.picture;
  picture.alt = order.name;
  cardOrderElement.querySelector('.card-order__price').textContent = order.price + '₽';
  getAmount(cardOrderElement, order);
  return cardOrderElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < goods.length; i++) {
  fragment.appendChild(renderCard(goods[i]));
}
catalogListElement.appendChild(fragment);


var fragmentOrder = document.createDocumentFragment();
for (var t = 0; t < goodsOrder.length; t++) {
  fragment.appendChild(renderCardOrder(goodsOrder[t]));
}
cardsOrder.appendChild(fragmentOrder);

var onFavorite = function () {
  btnFavorite.classList.add('.card__btn-favorite--selected');
};

var btnFavorite = document.querySelector('.card__btn-favorite');
btnFavorite.addEventListener('click', onFavorite);
