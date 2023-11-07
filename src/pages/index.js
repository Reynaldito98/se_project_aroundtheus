// ***********************************   DECLARING VARIABLES   ************************************************************
//IMPORTS
import './index.css';
import {editButton, profileNameClass, profileDescriptionClass, addPlaceButton, cardModalForm, profileModalForm, avatarModalForm, avatarButton, profileModal, cardModal, avatarModal} from '../utils/constants.js';
import {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, makeAvatarPopUpVisible} from '../utils/utils.js';
import Api from '../components/Api.js'


const api = new Api();
api.loadUserInfo();
api.loadCards();


//STORING CLASS INSTANCES
const imagePopup = createPopupWithImage('#card-modal');
const userInfo = createNewUserInfo(profileNameClass, profileDescriptionClass);
const formValidatorProfileModal = createFormValidator(profileModalForm);
const formValidatorCardModal = createFormValidator(cardModalForm);
const formValidatorAvatarModal = createFormValidator(avatarModalForm);


const addPlacePopup = createPopupWithForm('#add-card-modal', (inputValues) => {
  api.renderLoading(true, cardModal);
  api.addNewCard(inputValues, cardModal);
});


const userInfoPopup = createPopupWithForm('#profile-modal', (inputValues) => {
  api.renderLoading(true, profileModal);
  api.editProfile(inputValues, profileModal);
});


const avatarPopup = createPopupWithForm('#avatar-modal', (inputValues) => {
  api.renderLoading(true, avatarModal);
  api.updateProfilePicture(inputValues, avatarModal);
})





// *****************************************   EVENT LISTENERS   ************************************************************
formValidatorProfileModal.enableValidation();
formValidatorCardModal.enableValidation();
formValidatorAvatarModal.enableValidation();
addPlacePopup.setEventListeners();
userInfoPopup.setEventListeners(); 
avatarPopup.setEventListeners(); 
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
avatarButton.addEventListener('click', makeAvatarPopUpVisible);

export {imagePopup, userInfoPopup, addPlacePopup, userInfo, avatarPopup, api, formValidatorCardModal};