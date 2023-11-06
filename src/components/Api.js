import Section from './Section.js';
import {createNewCard} from '../utils/utils.js';
import {cardContainerClass} from '../utils/constants.js';
import { userInfo } from '../pages/index.js';

export default class Api{
    constructor(){
      this._baseUrl = 'https://around-api.en.tripleten-services.com/v1',
      this._headers = {
        authorization: "4c45d989-e1aa-4bb6-a467-6ac9c46f3dac",
        "Content-Type": "application/json"
      };
      this._headers1 = {
        authorization: "4c45d989-e1aa-4bb6-a467-6ac9c46f3dac",
      }
    }
  
    loadUserInfo(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers1
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then(data => {
        userInfo.setUserInfo(data);
        document.querySelector('.profile__image').src = data.avatar;
      })
      .catch(err => {
        console.error(err);
      })
    }
  
    loadCards(){
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers1
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then(data => {
        const renderCards = new Section({items: data, renderer: (cardItem) => {
          const cardElement = createNewCard(cardItem);
  
          if(cardItem.isLiked){
            cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
          } else{
            cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
          }
  
          renderCards.appendItem(cardElement);
        }}, cardContainerClass);
      
        renderCards.renderItems();
      })
      .catch(err => {
        console.error(err);
      })
    }
  
    editProfile(inputValues){
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
        userInfo.setUserInfo(values);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.renderLoading(false);
      })
    }
  
    addNewCard(inputValues){
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
        const titleValue = values.name;
        const urlValue = values.link;
        
        const cardElement = createNewCard({name: titleValue, link: urlValue, _id: values._id});
      
        document.querySelector('.elements').prepend(cardElement);
        formValidatorCardModal.disableStateButton();
      })
      .catch(err => console.error(err))
      .finally(() => {
        this.renderLoading(false);
      })
    }
  
    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers1
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else{
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch(err => {
        console.error(err);
      })
    }
  
    addLike(cardId, cardElement){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers1
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
        }
      })
      .catch(err => {
        console.error(err);
      })
    }
  
    deleteLike(cardId, cardElement){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers1
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
        }
      })
      .catch(err => {
        console.error(err);
      })
    }
  
    updateProfilePicture(inputValues){
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
        console.log(values);
      })
      .catch(err => console.error(err))
      .finally(() => {
        this.renderLoading(false);
      })
    }

    renderLoading(isLoading){
        if(isLoading){
            document.querySelector('.modal__button').textContent = 'Saving...';
        } else{
            document.querySelector('.modal__button').textContent = 'Save';
        }   
    }
  }