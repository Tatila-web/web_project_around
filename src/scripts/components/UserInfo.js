export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Retorna os dados atuais do perfil (pode ser usado no formulário)
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  // Atualiza os dados do perfil no DOM
  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }

    if (about) {
      this._aboutElement.textContent = about;
    }

    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = `Avatar de ${name}`; // <-- AQUI como você pediu
    }
  }
}
