// ***********************************   DECLARING VARIABLES   ************************************************************
//IMPORTS
import './index.css';
import {editButton, profileNameClass, profileDescriptionClass, addPlaceButton, cardModalForm, profileModalForm, cardContainerClass, profileImageButton, profileImageModalForm} from '../utils/constants.js';
import Section from '../components/Section.js';
import {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, createNewCard, makeProfileImagePopup} from '../utils/utils.js';
import { createPopupWithYes } from "../utils/utils";


export default class Api{
  constructor(){
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1",
    this._headers = {
                      authorization: "7a8b692d-9f1f-42cd-81a4-a6c8c7c47e3c",
                      "Content-Type": "application/json"
                    }
  }

  loadUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
              .then((res) => {
                if(res.ok){
                  return res.json();
                }
              })
              .then((values) => {
                document.querySelector('.modal__input_name_profile').value = values.name;
                document.querySelector('.modal__input_about').value = values.about;
                document.querySelector('.profile__image').src = values.avatar;
                document.querySelector(profileNameClass).textContent = values.name;
                document.querySelector(profileDescriptionClass).textContent = values.about;
              })
              .catch(err => {
                console.log(err);
              })
  }

  loadCards(){
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
              .then((res) => {
                if(res.ok){
                  return res.json();
                }
              })
              .then(values => {
                const renderCards = new Section({items: values, renderer: (cardItem) => {
                  const cardElement = createNewCard(cardItem);
                  
                  cardElement.querySelector('.card__delete-btn').addEventListener('click', () => {
                    
                    const newPopupWithYes = createPopupWithYes('#delete-card-modal', () => {
                      cardElement.remove();
                      this.deleteCard(cardItem._id);
                    })
              
                    newPopupWithYes.open();
                    newPopupWithYes.setEventListeners();
                  })

                  if(cardItem.isLiked){
                    cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
                  } else{
                    cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
                  }


                  cardElement.querySelector('.card__love-icon').addEventListener('click', () => {
                        if(cardItem.isLiked){
                          this.deleteLike(cardItem._id, cardElement, cardItem.isLiked);
                        } else{
                          this.addLike(cardItem._id, cardElement, cardItem.isLiked);
                        }
                  })
              
                  renderCards.appendItem(cardElement);
                }}, cardContainerClass);
                
                renderCards.renderItems();
              })
              .catch(err => {
                console.log(err);
              })
  }

  editProfile(inputValues){ 
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(inputValues)
    })
            .then(res => res.json())
            .then(result => {
              document.querySelector(profileNameClass).textContent = result.name;
              document.querySelector(profileDescriptionClass).textContent = result.about;
            }) 
  }

  addNewCard(inputValues){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(inputValues)
    })
            .then(res => res.json())
            .then(result => {
              const titleValue = result.name;
              const urlValue = result.link;
              const cardElement = createNewCard({name: titleValue, link: urlValue});
              document.querySelector(cardContainerClass).prepend(cardElement);
              formValidatorCardModal.disableStateButton();


              cardElement.querySelector('.card__delete-btn').addEventListener('click', () => {
                    
                const newPopupWithYes = createPopupWithYes('#delete-card-modal', () => {
                  cardElement.remove();
                  this.deleteCard(result._id);
                })
          
                newPopupWithYes.open();
                newPopupWithYes.setEventListeners();
              })


              cardElement.querySelector('.card__love-icon').addEventListener('click', () => {
                if(result.isLiked){
                  this.deleteLike(result._id, cardElement);
                } else{
                  this.addLike(result._id, cardElement);
                }
              })
        })
  }

  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  addLike(id, cardElement, m){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
        .then(res => res.json())
        .then(result => {
            if(result.isLiked){
             console.log(result);
             cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
             m = result.isLiked;
            }
     })
  }

  deleteLike(id, cardElement, m){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
          .then(res => res.json())
          .then(result => {
              if(!result.isLiked){
                cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
                console.log(result);
                m = !result.isLiked
              }
           })
  }

  updateProfilePicture(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
          .then(res => res.json())
          .then((result) => {document.querySelector('.profile__image').src = result})
          .catch(err => console.log(err))
  }
}


const api = new Api();
api.loadUserInfo(); 
api.loadCards();

//STORING CLASS INSTANCES
const imagePopup = createPopupWithImage('#card-modal');
const userInfo = createNewUserInfo(profileNameClass, profileDescriptionClass);
const formValidatorProfileModal = createFormValidator(profileModalForm);
const formValidatorCardModal = createFormValidator(cardModalForm);
const formValidatorProfileImageModal = createFormValidator(profileImageModalForm);
const addPlacePopup = createPopupWithForm('#add-card-modal', (inputValues) => {
  api.addNewCard(inputValues);
});

const userInfoPopup = createPopupWithForm('#profile-modal', (inputValues) => {
  api.editProfile(inputValues); 
});

const picturePopup = createPopupWithForm('#profile-image-modal', (inputValues) => {
  api.updateProfilePicture(inputValues.avatar);
  console.log(inputValues.avatar);
})





// *****************************************   EVENT LISTENERS   ************************************************************
formValidatorProfileModal.enableValidation();
formValidatorCardModal.enableValidation();
formValidatorProfileImageModal.enableValidation();
addPlacePopup.setEventListeners();
userInfoPopup.setEventListeners();
picturePopup.setEventListeners();
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
profileImageButton.addEventListener('click', makeProfileImagePopup);

export {imagePopup, userInfoPopup, addPlacePopup, userInfo, picturePopup};