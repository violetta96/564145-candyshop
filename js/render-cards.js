'use strict';

(function () {

  var renderCard = function (card) {
    var cardElement = window.generateCard.catalogCardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    var picture = cardElement.querySelector('.card__img');
    picture.src = card.picture;
    picture.alt = card.name;
    var price = cardElement.querySelector('.card__price');
    price.childNodes[0].textContent = card.price + ' ';
    price.childNodes[2].textContent = '/ ' + card.weight + ' Г';
    window.generateCard.getRating(cardElement, card);
    cardElement.querySelector('.star__count').textContent = card.rating.number;
    cardElement.querySelector('.card__characteristic').textContent = window.generateCard.getNutrition(card) + card.nutritionFacts.energy + ' ккал';
    cardElement.querySelector('.card__characteristic').textContent = window.generateCard.getNutrition(card) + card.nutritionFacts.energy + ' ккал';
    cardElement.querySelector('.card__composition-list').textContent = card.nutritionFacts.contents;
    window.generateCard.setAmountClass(cardElement, card);
    return cardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.generateCard.generateCards.length; i++) {
    fragment.appendChild(renderCard(window.generateCard.generateCards[i]));
  }
  window.generateCard.catalogListElement.appendChild(fragment);

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
    var cardOrderElement = window.generateCard.catalogCardOrderTemplate.cloneNode(true);
    cardOrderElement.querySelector('.card-order__title').textContent = card.name;
    cardOrderElement.setAttribute('id', id);
    var picture = cardOrderElement.querySelector('.card-order__img');
    picture.src = card.picture;
    picture.alt = card.name;
    cardOrderElement.querySelector('.card-order__price').textContent = card.price + '₽';
  };


  var cardBtnClickHandler = function () {
    var catalogCard = document.querySelector('.catalog__card');
    var btnCard = document.querySelector('.card__btn');
    var test = btnCard.target.closest('article');
    var idx = null;
    var fragmentOrder = document.createDocumentFragment();
    for (var s = 0; s < catalogCard.length; s++) {
      if (catalogCard[s] === test) {
        idx = s;
        break;
      }
    }
    if (idx !== null) {
      catalogCard[s].setAttribute('id', idx);
      fragmentOrder.appendChild(createBasketCard(window.generateCard.generateCards()[idx], idx));
    }
    window.generateCard.cardsOrder.appendChild(fragmentOrder);
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
