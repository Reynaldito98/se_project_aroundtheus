// ***********************************   DECLARING VARIABLES   ************************************************************
//IMPORTS
import './index.css';
import {editButton, profileNameClass, profileDescriptionClass, addPlaceButton, avatarButton, avatarClass, profileModal, profileModalForm, cardModal, cardModalForm, avatarModal, avatarModalForm} from '../utils/constants.js';
import {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createPopupWithImage, makeAvatarPopUpVisible, loadCardsCallback, loadUserInfoCallback, editProfileCallback, addNewCardCallback, createFormValidator, createPopupWithForm, createPopupWithConfirmation} from '../utils/utils.js';
import Api from '../components/Api.js'


const options = {
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: "4c45d989-e1aa-4bb6-a467-6ac9c46f3dac",
    "Content-Type": "application/json"
  }
}

const api = new Api(options, loadUserInfoCallback, loadCardsCallback, editProfileCallback, addNewCardCallback);
api.loadUserInfo();
api.loadCards();


//STORING CLASS INSTANCES
const imagePopup = createPopupWithImage('#card-modal');
const userInfo = createNewUserInfo(profileNameClass, profileDescriptionClass, avatarClass);
const formValidatorProfileModal = createFormValidator(profileModalForm);
const formValidatorCardModal = createFormValidator(cardModalForm);
const formValidatorAvatarModal = createFormValidator(avatarModalForm);



const addPlacePopup = createPopupWithForm('#add-card-modal', (inputValues) => {
  api.renderLoading(true, cardModal);
  api.addNewCard(inputValues, cardModal, addPlacePopup);
});

const userInfoPopup = createPopupWithForm('#profile-modal', (inputValues) => {
  api.renderLoading(true, profileModal);
  api.editProfile(inputValues, profileModal, userInfoPopup);
});

const avatarPopup = createPopupWithForm('#avatar-modal', (inputValues) => {
  api.renderLoading(true, avatarModal);
  api.updateProfilePicture(inputValues, avatarModal, avatarPopup);
})

const deleteCardCallback = (data, cardElement) => {
  const deleteCardPopup = createPopupWithConfirmation('#delete-card-modal', () => {
      api.deleteCard(data._id, cardElement);
  });

  deleteCardPopup.open();
  deleteCardPopup.setEventListeners();
}

const likeButtonCallback = (data, cardElement) => {
  if(!data.isLiked){
      api.addLike(data._id, cardElement, data);
    } else{
      api.deleteLike(data._id, cardElement, data);
  }
} 


// *****************************************   EVENT LISTENERS   ************************************************************
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
avatarButton.addEventListener('click', makeAvatarPopUpVisible);

export {imagePopup, userInfo, api, formValidatorAvatarModal, formValidatorProfileModal, formValidatorCardModal, addPlacePopup, userInfoPopup, avatarPopup, deleteCardCallback, likeButtonCallback};