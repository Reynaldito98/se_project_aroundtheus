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
//DECLARING SECTION VARIABLE
const renderCards = new Section({items: '', renderer: () => {
}}, cardContainerClass);





//Class API VARIABLES AND METHODS
const options = {
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    "Content-Type": "application/json",
    authorization: '20315743-2e79-4356-b56c-474d72a93e6c'
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
  renderCards.setItemsAndRenderer(data, (cardItem) => {
    const cardElement = createNewCard(cardItem);
    
    cardElement.likeButtonPersistenceUponReload();
    renderCards.appendItem(cardElement.returnCardElement());
  });

  renderCards.renderItems();
}


const editProfileCallback = (values) => {
  userInfo.setUserInfo(values);
}


const addNewCardCallback = (values) => {
  const titleValue = values.name;
  const urlValue = values.link;

  const cardElement = createNewCard({name: titleValue, link: urlValue, _id: values._id}).returnCardElement();
  renderCards.prependItem(cardElement);
  formValidatorCardModal.disableStateButton();
}


//API CALLS AND POPUP CREATIONS
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
      userInfo.renderAvatar(values);
      avatarPopup.close();
      formValidatorAvatarModal.disableStateButton();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, avatarModal);
    })
})

const deleteCardPopup = createPopupWithConfirmation('#delete-card-modal', () => {

}); 


const deleteCardCallback = (cardInstance) => {
  const deleteCardMethod = () => {
    api.deleteCard(cardInstance.getId())
      .then(() => {
        deleteCardPopup.close();
        cardInstance.deleteCard();
    })
    .catch(err => console.log(err))
  }


  deleteCardPopup.open(deleteCardMethod)
}

const likeButtonCallback = (cardInstance) => {
  if(!cardInstance.getIsLiked()){
      api.addLike(cardInstance.getId())
        .then(res => {
          if(res.isLiked){
            cardInstance.addLike();
          }
        })
        .catch(err => console.log(err))
    } else{
      api.deleteLike(cardInstance.getId())
        .then(res => {
          if(!res.isLiked){
            cardInstance.deleteLike();
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
deleteCardPopup.setEventListeners();
imagePopup.setEventListeners();
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
avatarButton.addEventListener('click', makeAvatarPopUpVisible);

export {imagePopup, userInfo, api, formValidatorAvatarModal, formValidatorProfileModal, formValidatorCardModal, addPlacePopup, userInfoPopup, avatarPopup, deleteCardCallback, likeButtonCallback};