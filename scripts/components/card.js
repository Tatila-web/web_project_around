export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".elements__image");
    this._textElement = this._element.querySelector(
      ".elements__text-description"
    );
    this._likeButton = this._element.querySelector(".elements__btn-like");
    this._deleteButton = this._element.querySelector(".elements__btn-delete");

    this._textElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      const likeIcon = this._likeButton.querySelector(".elements__like");
      const isLiked = this._likeButton.classList.toggle(
        "elements__btn-like_active"
      );

      // Troca a imagem dependendo do estado do like
      likeIcon.src = isLiked
        ? "./images/vetores/Vector_like_black.png"
        : "./images/vetores/Vector_like.png";

      likeIcon.alt = isLiked ? "Descurtir" : "Curtir";
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
