// ***********************************   DECLARING VARIABLES   ************************************************************
//IMPORTS
import './index.css';
import {editButton, profileNameClass, profileDescriptionClass, addPlaceButton, avatarButton, avatarClass, profileModal, profileModalForm, cardModal, cardModalForm, avatarModal, avatarModalForm, cardContainerClass} from '../utils/constants.js';
import {makePopUpVisible, makeAddPlacePopUpVisible, makeAvatarPopUpVisible, createNewUserInfo, createPopupWithImage, createFormValidator, createPopupWithForm, createPopupWithConfirmation, createNewCard} from '../utils/utils.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'



//STORING CLASS INSTANCES
const imagePopup = createPopupWithImage('#card-modal');
const userInfo = createNewUserInfo(profileNameClass, profileDescriptionClass, avatarClass);
const formValidatorProfileModal = createFormValidator(profileModalForm);
const formValidatorCardModal = createFormValidator(cardModalForm);
const formValidatorAvatarModal = createFormValidator(avatarModalForm);





//Class API VARIABLES AND METHODS
const options = {
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: "4c45d989-e1aa-4bb6-a467-6ac9c46f3dac",
    "Content-Type": "application/json"
  }
}


const renderLoading = (isLoading, popup) => {
  if(isLoading){
      popup.querySelector('.modal__button').textContent = 'Saving...';
  } else{
      popup.querySelector('.modal__button').textContent = 'Save';
  }   
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


//API CALLS
const api = new Api(options);

Promise.all([api.loadUserInfo(), api.loadCards()])
  .then((data) => {
    loadUserInfoCallback(data[0]);
    loadCardsCallback(data[1]);
  })
  .catch(err => console.log(err))


const addPlacePopup = createPopupWithForm('#add-card-modal', (inputValues) => {
  renderLoading(true, cardModal);
  api.addNewCard(inputValues)
    .then(values => {
      addNewCardCallback(values);
      addPlacePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, cardModal);
    })

});

const userInfoPopup = createPopupWithForm('#profile-modal', (inputValues) => {
  renderLoading(true, profileModal)
  api.editProfile(inputValues, profileModal, userInfoPopup)
    .then(values => {
      editProfileCallback(values);
      userInfoPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, profileModal);
    });
});

const avatarPopup = createPopupWithForm('#avatar-modal', (inputValues) => {
  renderLoading(true, avatarModal);
  api.updateProfilePicture(inputValues)
    .then(values => {
      document.querySelector('.profile__image').src = values.avatar;
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, avatarModal);
    })
})


const deleteCardCallback = (data, cardElement) => {
  const deleteCardPopup = createPopupWithConfirmation('#delete-card-modal', () => {
    api.deleteCard(data._id)
    .then(() => {
      deleteCardPopup.close();
      cardElement.remove();
    })
    .catch(err => console.log(err))
  });

  deleteCardPopup.setEventListeners();
  deleteCardPopup.open();
}

const likeButtonCallback = (data, cardElement) => {
  if(!data.isLiked){
      api.addLike(data._id)
        .then(res => {
          if(res.isLiked){
            cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
            data.isLiked = true;
          }
        })
        .catch(err => console.log(err))
    } else{
      api.deleteLike(data._id)
        .then(res => {
          if(!res.isLiked){
            cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
            data.isLiked = false;
          }
        })
        .catch(err => console.log(err))
   }
} 


// *****************************************   EVENT LISTENERS   ************************************************************
formValidatorCardModal.enableValidation();
formValidatorProfileModal.enableValidation();
formValidatorAvatarModal.enableValidation();
avatarPopup.setEventListeners();
addPlacePopup.setEventListeners();
userInfoPopup.setEventListeners();
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
avatarButton.addEventListener('click', makeAvatarPopUpVisible);

export {imagePopup, userInfo, api, formValidatorAvatarModal, formValidatorProfileModal, formValidatorCardModal, addPlacePopup, userInfoPopup, avatarPopup, deleteCardCallback, likeButtonCallback};