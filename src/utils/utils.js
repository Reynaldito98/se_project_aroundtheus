import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import { validationConfig, cardTemplate, cardContainerClass } from "./constants";
import {imagePopup, userInfo, formValidatorProfileModal, formValidatorCardModal, formValidatorAvatarModal, userInfoPopup, avatarPopup, addPlacePopup, deleteCardCallback, likeButtonCallback} from '../pages/index.js';

function viewPlaceImage(data){
    imagePopup.open(data)
  }
  
function makePopUpVisible(){
    formValidatorProfileModal.enableValidation();
    userInfoPopup.setEventListeners();
    userInfoPopup.open();
    userInfoPopup.setInputValues(userInfo.getUserInfo());
}
  
function makeAddPlacePopUpVisible(){
    formValidatorCardModal.enableValidation();
    addPlacePopup.setEventListeners();
    addPlacePopup.open();
}

function makeAvatarPopUpVisible(){
    formValidatorAvatarModal.enableValidation();
    avatarPopup.setEventListeners();
    avatarPopup.open();
}

function createNewUserInfo(nameSelector, jobSelector, avatarSelector){
    return new UserInfo({nameSelector: nameSelector, jobSelector: jobSelector, avatarSelector: avatarSelector})
}
  
function createFormValidator(modalForm){
    return new FormValidator(validationConfig, modalForm);
}
  
function createPopupWithForm(popupSelector, handleFormSubmit){
    return new PopupWithForm({popupSelector: popupSelector, handleFormSubmit: handleFormSubmit});
}

function createPopupWithConfirmation(popupSelector, handleYesButton){
    return new PopupWithConfirmation ({popupSelector: popupSelector, handleYesButton: handleYesButton});
}
  
function createPopupWithImage(popupSelector){
    return new PopupWithImage({popupSelector: popupSelector});
}
  
function createNewCard(item){
    return new Card(item, cardTemplate, viewPlaceImage, deleteCardCallback, likeButtonCallback).returnCardElement();
}

const loadUserInfoCallback = (data) => {
    userInfo.setUserInfo(data);
}

const loadCardsCallback = (data) => {
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
}

const editProfileCallback = (values) => {
  userInfo.setUserInfo(values);
}

const addNewCardCallback = (values) => {
  const titleValue = values.name;
  const urlValue = values.link;

  const cardElement = createNewCard({name: titleValue, link: urlValue, _id: values._id});
  document.querySelector('.elements').prepend(cardElement);
  formValidatorCardModal.disableStateButton();
}

export {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, createNewCard, makeAvatarPopUpVisible, loadCardsCallback, loadUserInfoCallback, editProfileCallback, addNewCardCallback};