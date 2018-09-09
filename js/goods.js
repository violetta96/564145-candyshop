'use strict';

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
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg',
];

var CONTENT = [
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

var VALUE = [
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
var catalogOrderListElement = document.querySelector('.goods__cards');

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

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min + 1) + min);
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
  if (boolean === 1) {
    boolean = true;
  } else {
    boolean = false;
  }
  return boolean;
};

var getRating = function (element, good) {
  var ratingElement = element.querySelector('.stars__rating');
  if (good.rating.value !== 5) {
    ratingElement.classList.remove('stars__rating--five');
    ratingElement.classList.add('stars__rating--' + VALUE[good.rating.value]);
  }
};

var getNutrition = function (element, good) {
  if (!good.nutritionFacts.sugar) {
    element.querySelector('.card__characteristic').textContent = 'Без сахара. ' + good.nutritionFacts.energy + ' ккал';
  } else {
    element.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + good.nutritionFacts.energy + ' ккал';
  }
};

var getAmount = function (element, good) {
  if (good.amount > 5) {
    element.classList.add('card--in-stock');
  }
  if (good.amount > 0 < 5) {
    element.classList.add('card--little');
  }
  if (good.amount === 0) {
    element.classList.add('card--soon');
  }
};

var goods = [];
for (var j = 0; j < 26; j++) {
  goods[j] = {
    name: getRandomNumber(NAMES),
    picture: getRandomNumber(PICTURES),
    amount: getRandomInt(0, 20),
    price: getRandomInt(100, 1500),
    weight: getRandomInt(30, 300),
    rating: {
      value: getRandomInt(1, 5),
      number: getRandomInt(10, 900),
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomInt(70, 500),
      contents: getRandomContents(CONTENT),
    },
  };
}

var goodsOrder = [];
for (var k = 0; k < 3; k++) {
  goodsOrder[k] = {
    name: getRandomNumber(NAMES),
    picture: getRandomNumber(PICTURES),
    amount: getRandomInt(0, 20),
    price: getRandomInt(100, 1500),
    weight: getRandomInt(30, 300),
    rating: {
      value: getRandomInt(1, 5),
      number: getRandomInt(10, 900),
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomInt(70, 500),
      contents: getRandomContents(CONTENT),
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
  getNutrition(cardElement, card);
  cardElement.querySelector('.card__composition-list').textContent = card.nutritionFacts.contents;
  return cardElement;
};

var renderCardOrder = function (card) {
  var cardOrderElement = catalogCardOrderTemplate.cloneNode(true);
  cardOrderElement.querySelector('card-order__title').textContent = card.name;
  var picture = cardOrderElement.querySelector('card-order__img');
  picture.src = card.picture;
  picture.alt = card.name;
  var priceOrder = cardOrderElement.querySelector('card-order__price');
  priceOrder.textContent = card.price + ' ₽';
  getAmount(cardOrderElement, card);
  return cardOrderElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < goods.length; i++) {
  fragment.appendChild(renderCard(goods[i]));
}
catalogListElement.appendChild(fragment);

var fragmentOrder = document.createDocumentFragment();
for (var t = 0; t < goodsOrder.length; t++) {
  fragment.appendChild(renderCardOrder(goodsOrder[k]));
}
catalogOrderListElement.appendChild(fragmentOrder);
