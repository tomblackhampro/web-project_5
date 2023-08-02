import { userId } from "../scripts/constants";

const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .catch(console.log);

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  deleteCard(cardID) {
    return customFetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: `DELETE`,
    });
  }

  likeCard = (cardID) => {
    return customFetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: `PUT`,
    });
  };

  unlikeCard = (cardID) => {
    return customFetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: `DELETE`,
    });
  };

  changeProfilPicture(data) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: `PATCH`,
      body: JSON.stringify(data),
    });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "970eb122-456d-4dcb-9b5a-e863224c81f1",
    "Content-Type": "application/json",
  },
});
