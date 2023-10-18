// ***********************************   DECLARING VARIABLES   ************************************************************
//IMPORTS
import './index.css';
import {initialCards, editButton, profileNameClass, profileDescriptionClass, addPlaceButton, cardModalForm, profileModalForm, cardContainerClass} from '../utils/constants.js';
import Section from '../components/Section.js';
import {makePopUpVisible, makeAddPlacePopUpVisible, createNewUserInfo, createFormValidator, createPopupWithForm, createPopupWithImage, createNewCard} from '../utils/utils.js';



//STORING CLASS INSTANCES
const imagePopup = createPopupWithImage('#card-modal');
const userInfo = createNewUserInfo(profileNameClass, profileDescriptionClass);
const formValidatorProfileModal = createFormValidator(profileModalForm);
const formValidatorCardModal = createFormValidator(cardModalForm);
const addPlacePopup = createPopupWithForm('#add-card-modal', (inputValues) => {
  const titleValue = inputValues.title;
  const urlValue = inputValues.url;
  
  const cardElement = createNewCard({name: titleValue, link: urlValue});

  renderCards.prependItem(cardElement);
  formValidatorCardModal.disableStateButton();
});

const userInfoPopup = createPopupWithForm('#profile-modal', (inputValues) => {
  userInfo.setUserInfo(inputValues);
});

const renderCards = new Section({items: initialCards, renderer: (cardItem) => {
  const cardElement = createNewCard(cardItem);

  renderCards.appendItem(cardElement);
}}, cardContainerClass);

renderCards.renderItems();





// *****************************************   EVENT LISTENERS   ************************************************************
formValidatorProfileModal.enableValidation();
formValidatorCardModal.enableValidation();
addPlacePopup.setEventListeners();
userInfoPopup.setEventListeners();
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);

export {imagePopup, userInfoPopup, addPlacePopup, userInfo};