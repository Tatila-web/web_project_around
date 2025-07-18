import { Card } from "./card.js";

export class CardsList {
  constructor(
    containerSelector,
    handleCardClick,
    handleLike,
    handleDelete,
    userId,
    openConfirmPopup
  ) {
    this._container = document.querySelector(containerSelector);
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._userId = userId;
    this._openConfirmPopup = openConfirmPopup;
    this._cards = [];
    console.log("CardsList criado com userId:", userId);
  }

  setCards(cardsData) {
    this._cards = cardsData.map((data) => {
      console.log("Criando Card:", data.name, "com userId:", this._userId);
      return new Card(
        data,
        "#card-template",
        this._handleCardClick,
        this._handleLike,
        this._handleDelete,
        this._userId,
        this._openConfirmPopup
      );
    });
  }

  clear() {
    this._container.innerHTML = "";
  }

  render() {
    this.clear();
    this._cards.forEach((card) => {
      const cardElement = card.generateCard();
      this._container.append(cardElement);
    });
  }

  addCard(cardElement) {
    this._container.prepend(cardElement);
  }
}
