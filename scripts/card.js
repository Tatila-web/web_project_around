export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    const cardElement = template
      .querySelector(".elements__card")
      .cloneNode(true);

    // Garantir que o card tenha position relative
    cardElement.style.position = "relative"; // Adiciona a posição relativa ao card

    return cardElement;
  }

  _handleLike(likeIcon) {
    likeIcon.classList.toggle("liked");
    likeIcon.src = likeIcon.classList.contains("liked")
      ? "./images/vetores/Vector_like_black.png"
      : "./images/vetores/Vector_like.png";
  }

  _handleDelete(cardElement) {
    cardElement.remove();
  }

  _handleImageClick() {
    const openImagePopup = window.openImagePopup || (() => {});
    openImagePopup(this._name, this._link);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".elements__btn-like");
    const likeIcon = likeButton.querySelector(".elements__like");
    likeButton.addEventListener("click", () => this._handleLike(likeIcon));

    const deleteButton = cardElement.querySelector(".elements__btn-delete");
    deleteButton.addEventListener("click", () =>
      this._handleDelete(cardElement)
    );

    const image = cardElement.querySelector(".elements__image");
    image.addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    const cardElement = this._getTemplate();

    const image = cardElement.querySelector(".elements__image");
    image.src = this._link;
    image.alt = `Imagem de ${this._name}`;

    const title = cardElement.querySelector(".elements__text-description");
    title.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
