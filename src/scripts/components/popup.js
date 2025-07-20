export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._isImagePopup = this._popup.classList.contains("popup-image"); // Detecta popup de imagem (classe específica no HTML)
  }

  open() {
    if (this._isImagePopup) {
      this._popup.classList.remove("popup-image__hidden"); // Popup de imagem usa essa classe para abrir
    } else {
      this._popup.classList.add("popup_opened"); // Outros popups usam essa classe para abrir
    }
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (this._isImagePopup) {
      this._popup.classList.add("popup-image__hidden"); // Fecha popup imagem
    } else {
      this._popup.classList.remove("popup_opened"); // Fecha outros popups
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close(); // Fecha popup ao apertar ESC
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      // Fecha popup ao clicar fora do conteúdo (overlay) ou no botão de fechar
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
