import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector("#popupImage");
    this._caption = this._popup.querySelector("#popupImageName");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
