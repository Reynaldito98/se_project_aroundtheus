import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import { validationConfig, cardTemplate} from "./constants";
import {imagePopup, userInfo, userInfoPopup, avatarPopup, addPlacePopup, deleteCardCallback, likeButtonCallback} from '../pages/index.js';

function viewPlaceImage(data){
    imagePopup.open(data)
  }
  
function makePopUpVisible(){
    userInfoPopup.open();
    userInfoPopup.setInputValues(userInfo.getUserInfo());
}
  
function makeAddPlacePopUpVisible(){
    addPlacePopup.open();
}

function makeAvatarPopUpVisible(){
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

export {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, createNewCard, makeAvatarPopUpVisible, createPopupWithConfirmation};