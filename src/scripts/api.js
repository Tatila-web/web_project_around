import { API_TOKEN, BASE_URL } from "./config.js";

class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Erro: ${res.status}`);
  }

  // Novo método privado que unifica fetch + opções + resposta
  _makeRequest(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  addCard({ name, link }) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  setUserInfo({ name, about }) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(avatarUrl) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  likeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }
}

export const api = new Api(BASE_URL, API_TOKEN);
