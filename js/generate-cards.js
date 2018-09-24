'use strict';

(function () {
  var GOODS_AMOUNT = 26;
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

  var generateCards = function () {
    var newGoods = [];
    for (var j = 0; j < GOODS_AMOUNT; j++) {
      newGoods[j] = {
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
    return newGoods;
  };
  generateCards();

  window.generateCard = {
    generateCards: generateCards,
  };
})();
