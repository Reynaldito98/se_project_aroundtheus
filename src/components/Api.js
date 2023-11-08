export default class Api{
    constructor(loadUserInfoCallback, loadCardsCallback, editProfileCallback, addNewCardCallback){
      this._baseUrl = 'https://around-api.en.tripleten-services.com/v1';
      this._headers = {
        authorization: "4c45d989-e1aa-4bb6-a467-6ac9c46f3dac",
        "Content-Type": "application/json"
      }
      this._loadUserInfoCallback = loadUserInfoCallback;
      this._loadCardsCallback = loadCardsCallback;
      this._editProfileCallback = editProfileCallback;
      this._addNewCardCallback = addNewCardCallback;
    }

    //I TRIED TO DO THIS AND DIDN'T WORK
    /*
    _checkResponse(res){
      if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
    }
    */

    loadUserInfo(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then(data => {
        this._loadUserInfoCallback(data);
      })
    }

    loadCards(){
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then(() => {
        cardElement.remove();
      })
    }

    addLike(cardId, cardElement, data){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
