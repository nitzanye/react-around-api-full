class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResStatus = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResStatus);
  };

  getUserData = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResStatus);
  };

  updateUserInfo = (data) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResStatus);
  };

  updateUserAvatar = (newAvatarLink) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then(this._checkResStatus);
  };

  addNewCard = (cardName, cardLink) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkResStatus);
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResStatus);
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    }).then(this._checkResStatus);
  };
}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "a68c011d-d292-456c-86c3-53eebc4a76ba",
    "Content-Type": "application/json",
  },
});
