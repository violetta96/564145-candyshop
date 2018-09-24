'use strict';

(function () {
  var RATING_NUMBER = 5;
  var AMOUNT_NUMBER = 5;

  var VALUES = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];

  var catalogListElement = document.querySelector('.catalog__cards');
  var cardsOrder = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');
  var goods = window.generateCard.generateCards();
  var catalogCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');
  var catalogCardOrderTemplate = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');


  var showCatalog = function () {
    cardsOrder.classList.remove('goods__cards--empty');
    cardEmpty.classList.add('visually-hidden');
  };
  showCatalog();


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

  var setAmountClass = function (element, good) {
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

  var renderCard = function (card, id) {
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
    setAmountClass(cardElement, card);
    cardElement.querySelector('.catalog__card').setAttribute('id', id);
    return cardElement;
  };

  var renderCatalogCards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < goods.length; i++) {
      fragment.appendChild(renderCard(goods[i], i + 1));
    }
    catalogListElement.appendChild(fragment);
  };
  renderCatalogCards();


  // добавление выбранного товара в избранное

  var favoriteClickBtnHandler = function (evt) {
    evt.target.classList.toggle('card__btn-favorite--selected');
  };
  var favoriteClickBtn = function () {
    var btnFavorite = document.querySelectorAll('.card__btn-favorite');
    for (var l = 0; l < btnFavorite.length; l++) {
      btnFavorite[l].addEventListener('click', favoriteClickBtnHandler);
    }
  };
  favoriteClickBtn();

  // Добавление выбранного товара в корзину и управление товаром в корзине

  var createBasketCard = function (card, id) {
    var cardOrderElement = catalogCardOrderTemplate.cloneNode(true);
    cardOrderElement.querySelector('.card-order__title').textContent = card.name;
    cardOrderElement.setAttribute('id', id);
    var picture = cardOrderElement.querySelector('.card-order__img');
    picture.src = card.picture;
    picture.alt = card.name;
    cardOrderElement.querySelector('.card-order__price').textContent = card.price + '₽';
  };


  var cardBtnClickHandler = function (evt) {
    var catalogCard = document.querySelector('.catalog__card');
    var test = evt.target.closest('article');
    var idx = null;
    var fragmentOrder = document.createDocumentFragment();
    for (var s = 0; s < catalogCard.length; s++) {
      if (catalogCard[s] === test) {
        idx = s;
        fragmentOrder.appendChild(createBasketCard(goods[idx], idx));
      }
    }
    cardsOrder.appendChild(fragmentOrder);
  };


  var cardClickBtn = function () {
    var btnCards = document.querySelectorAll('.card__btn');
    for (var l = 0; l < btnCards.length; l++) {
      btnCards[l].addEventListener('click', cardBtnClickHandler);
    }
  };
  cardClickBtn();


  var cards = document.querySelector('.catalog__cards');
  cards.classList.remove('catalog__cards--load');

  var load = document.querySelector('.catalog__load');
  load.classList.add('visually-hidden');

})();
