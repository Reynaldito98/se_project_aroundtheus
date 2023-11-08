export default class Api{
    constructor(options, loadUserInfoCallback, loadCardsCallback, editProfileCallback, addNewCardCallback){
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._loadUserInfoCallback = loadUserInfoCallback;
      this._loadCardsCallback = loadCardsCallback;
      this._editProfileCallback = editProfileCallback;
      this._addNewCardCallback = addNewCardCallback;
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
      .then(data => {
        this._loadUserInfoCallback(data);
      })
    }

    loadCards(){
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(data => {
        this._loadCardsCallback(data);
      })
    }

    editProfile(inputValues, popup, popupForm){
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
      .then(values => {
        this._editProfileCallback(values);
        popupForm.close();
      })
      .finally(() => {
        this.renderLoading(false, popup);
      })
    }

    addNewCard(inputValues, popup, popupForm){
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
      .then(values => {
        this._addNewCardCallback(values);
        popupForm.close();
      })
      .finally(() => {
        this.renderLoading(false, popup);
      })
    }

    deleteCard(cardId, cardElement){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(() => {
        cardElement.remove();
      })
    }

    addLike(cardId, cardElement, data){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(res => {
        if(res.isLiked){
          cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
          data.isLiked = true;
        }
      })
    }

    deleteLike(cardId, cardElement, data){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(res => {
        if(!res.isLiked){
          cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
          data.isLiked = false;
        }
      })
    }

    updateProfilePicture(inputValues, popup, popupForm){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(inputValues)
      })
      .then(this._checkResponse)
      .then(values => {
        document.querySelector('.profile__image').src = values.avatar;
        popupForm.close();
      })
      .finally(() => {
        this.renderLoading(false, popup);
      })
    }

    renderLoading(isLoading, popup){
        if(isLoading){
            popup.querySelector('.modal__button').textContent = 'Saving...';
        } else{
            popup.querySelector('.modal__button').textContent = 'Save';
        }   
    }
  }
