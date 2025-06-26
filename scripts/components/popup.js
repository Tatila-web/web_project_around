export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);

    // Detectar se é o popup de imagem (tem classe popup-image)
    this._isImagePopup = this._popup.classList.contains("popup-image");
  }

  open() {
    if (this._isImagePopup) {
      this._popup.classList.remove("popup-image__hidden");
    } else {
      this._popup.classList.add("popup_opened");
    }
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (this._isImagePopup) {
      this._popup.classList.add("popup-image__hidden");
    } else {
      this._popup.classList.remove("popup_opened");
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      const isOverlay =
        event.target.classList.contains("popup__overlay") ||
        event.target.classList.contains("profile__overlay");
      const isCloseButton =
        event.target.classList.contains("popup-image__close") ||
        event.target.closest(".popup__close");

      if (isOverlay || isCloseButton) {
        this.close();
      }
    });
  }
}
