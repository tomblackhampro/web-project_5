import {
  cardLikeButtonSelector,
  cardDeleteButtonSelector,
} from "../scripts/constants.js";

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.title;
    this._imgUrl = data.imgUrl;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._deleteButton = cardDeleteButtonSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick({
        imgSrc: evt.target.getAttribute("src"),
        imgAlt: evt.target.getAttribute("alt"),
      });
    });
    this._element
      .querySelector(cardDeleteButtonSelector)
      .addEventListener("click", this._deleteCard.bind(this));
    this._element
      .querySelector(cardLikeButtonSelector)
      .addEventListener("click", this._toggleLike.bind(this));
  }

  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".card__title"); // Define cardTitle variable here
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle.textContent = this._title; // Set card title text content
    this._cardImage.setAttribute("src", `${this._imgUrl}`);
    this._cardImage.setAttribute("alt", `image of ${this._title}`);
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
