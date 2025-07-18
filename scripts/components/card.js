export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLike,
    handleDelete,
    userId,
    openConfirmPopup
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = Array.isArray(data.likes) ? data.likes : [];

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._userId = userId;
    this._openConfirmPopup = openConfirmPopup;

    // Usa isLiked diretamente se a API fornecer
    if (typeof data.isLiked === "boolean") {
      this._isLiked = data.isLiked;
    } else {
      // Caso contrário, verifica se o usuário curtiu pelo array de likes
      this._isLiked = this._likes.some((user) => user._id === userId);
    }

    console.log(
      `Card "${this._name}" criado. userId=${userId}, isLiked=${this._isLiked}`,
      data
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".elements__image");
    this._textElement = this._element.querySelector(
      ".elements__text-description"
    );
    this._likeButton = this._element.querySelector(".elements__btn-like");
    this._deleteButton = this._element.querySelector(".elements__btn-delete");
    this._likeIcon = this._likeButton.querySelector(".elements__like");

    this._textElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._updateLikeVisual();
    this._setEventListeners();

    return this._element;
  }

  _updateLikeVisual() {
    this._likeButton.classList.toggle(
      "elements__btn-like_active",
      this._isLiked
    );
    this._likeIcon.src = this._isLiked
      ? "./images/vetores/Vector_like_black.png"
      : "./images/vetores/Vector_like.png";
    this._likeIcon.alt = this._isLiked ? "Descurtir" : "Curtir";
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (!this._id) return;

      const likeAction = !this._isLiked;

      this._handleLike(this._id, likeAction)
        .then((updatedCard) => {
          // Se a API retorna .likes (lista), atualiza com base no _id do user
          if (Array.isArray(updatedCard.likes)) {
            this._likes = updatedCard.likes;
            this._isLiked = this._likes.some(
              (user) => user._id === this._userId
            );
          }

          // Se a API retorna .isLiked diretamente
          if (typeof updatedCard.isLiked === "boolean") {
            this._isLiked = updatedCard.isLiked;
          }

          this._updateLikeVisual();
        })
        .catch((err) => console.error("Erro ao curtir/descurtir:", err));
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        if (this._openConfirmPopup) {
          this._openConfirmPopup(() => {
            this._handleDelete(this._id, this._element);
          });
        }
      });
    }

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
