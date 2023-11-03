import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithYes from "../components/PopupWithYes.js";
import { validationConfig, cardTemplate } from "./constants";
import {imagePopup, userInfoPopup, addPlacePopup, userInfo, picturePopup } from '../pages/index.js';

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

function makeProfileImagePopup(){
    picturePopup.open();
}

function createNewUserInfo(nameSelector, jobSelector){
    return new UserInfo({nameSelector: nameSelector, jobSelector: jobSelector})
}
  
function createFormValidator(modalForm){
    return new FormValidator(validationConfig, modalForm);
}
  
function createPopupWithForm(popupSelector, handleFormSubmit){
    return new PopupWithForm({popupSelector: popupSelector, handleFormSubmit: handleFormSubmit});
}
  
function createPopupWithImage(popupSelector){
    return new PopupWithImage({popupSelector: popupSelector});
}

function createPopupWithYes(popupSelector, handleYesButton){
    return new PopupWithYes({popupSelector: popupSelector, handleYesButton: handleYesButton});
}
  
function createNewCard(item){
    return new Card(item, cardTemplate, viewPlaceImage).returnCardElement();
}

export {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, createNewCard, createPopupWithYes, makeProfileImagePopup};