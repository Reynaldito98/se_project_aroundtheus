export default class Api{
    constructor(options){
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse(res){
      if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
    }

    loadUserInfo(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    loadCards(){
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    editProfile(inputValues){
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
    }

    addNewCard(inputValues){
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
    }

    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse) 
    }

    addLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    deleteLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    updateProfilePicture(inputValues){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
    }
  }
