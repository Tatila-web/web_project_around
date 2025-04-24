export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _toggleButtonState(button) {
    const isValid = this._formElement.checkValidity();
    button.disabled = !isValid;
    button.classList.toggle(this._config.inactiveButtonClass, !isValid);
  }

  _setEventListeners() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const button = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(button);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(button);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
