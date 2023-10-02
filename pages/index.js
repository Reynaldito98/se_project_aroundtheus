// ***********************************   DECLARING VARIABLES   ************************************************************
const initialCards = [
    {
      name: 'Yosemite Valley',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
    },
    {
      name: 'Lake Louise',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
    },
    {
      name: 'Bald Mountains',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
    },
    {
      name: 'Latemar',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
    },
    {
      name: 'Vanoise National Park',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
    },
    {
      name: 'Lago di Braies',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
    }
];


//IMPORTS
import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js';

//  BUTTONS
const editButton = document.querySelector('.profile__edit-link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addPlaceButton = document.querySelector('.profile__add-link');

// CARD MODAL
const cardModal = document.querySelector('#add-card-modal');
const cardModalForm = cardModal.querySelector('.modal__form');
const cardModalCloseButton = cardModal.querySelector('.modal__close-button-container');
const cardModalInputTitle = document.querySelector('#title');
const cardModalInputUrl = document.querySelector('#url');

// PROFILE MODAL
const profileModal = document.querySelector('#profile-modal');
const profileModalForm = profileModal.querySelector('.modal__form');
const profileModalCloseButton = profileModal.querySelector('.modal__close-button-container');
const profileModalNameInput = profileModal.querySelector('.modal__input_name');
const profileModalDescriptionInput = profileModal.querySelector('.modal__input_about');

// IMAGE MODAL
const imageModal = document.querySelector('#card-modal');
const imageModalCloseButton = imageModal.querySelector('.modal__close-button-container');

// CARDS
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardContainer = document.querySelector('.elements');

//FORM VALIDATION
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: ".modal__input-error_",
  errorClass: "modal__input_border_red"
};

// **************************************************************************************************************************
const formValidatorProfileModal = new FormValidator(validationConfig, profileModalForm);
const formValidatorCardModal = new FormValidator(validationConfig, cardModalForm);

formValidatorProfileModal.enableValidation();
formValidatorCardModal.enableValidation();

// *****************************************   FUNCTION DECLARATIONS   ************************************************************
function viewPlaceImage(data){
  const image = imageModal.querySelector('.modal__image');
  const name = imageModal.querySelector('.modal__caption');

  image.src = data.link;
  image.alt = data.link;
  name.textContent = data.name;
  openPopUp(imageModal);
}

function closePopUp(popUp){
      popUp.classList.remove('modal_opened');
      document.removeEventListener('keydown', closeModalByPressingEscapeKey);
      popUp.removeEventListener("mousedown", closePopUpOnRemoteClick)
  }

 function openPopUp(popUp){
      popUp.classList.add('modal_opened');
      document.addEventListener('keydown', closeModalByPressingEscapeKey);
      popUp.addEventListener("mousedown", closePopUpOnRemoteClick)
 } 

 function closeModalByPressingEscapeKey(evt){
    if(evt.key==='Escape'){
      const openedModal = document.querySelector('.modal_opened');

      closePopUp(openedModal);
    }
 }


function makePopUpVisible(){
  openPopUp(profileModal);
}


function makeAddPlacePopUpVisible(){
  openPopUp(cardModal);
}

function makeCardModalInvisible(){
  closePopUp(cardModal);
}

function makeProfileModalInvisible(){
  closePopUp(profileModal);
}

function makeImageModalInvisible(){
  closePopUp(imageModal);
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = profileModalNameInput.value;
  profileDescription.textContent = profileModalDescriptionInput.value;
  closePopUp(profileModal);
}

function addNewCard(evt){
  evt.preventDefault();
  const titleValue = cardModalInputTitle.value;
  const urlValue = cardModalInputUrl.value;
  const cardData = {
    name: titleValue,
    link: urlValue
  }
  const submitButton = cardModal.querySelector('.modal__button');
  const newCard = new Card(cardData, cardTemplate, viewPlaceImage);

  cardContainer.prepend(newCard.returnCardElement());
  closePopUp(cardModal);
  evt.target.reset();
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

function closePopUpOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) { 
    closePopUp(evt.target);
  }
}

// *****************************************   EVENT LISTENERS   ************************************************************
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
profileModalForm.addEventListener('submit', handleProfileFormSubmit);
cardModalForm.addEventListener('submit', addNewCard);
cardModalCloseButton.addEventListener('click', makeCardModalInvisible);
profileModalCloseButton.addEventListener('click', makeProfileModalInvisible);
imageModalCloseButton.addEventListener('click', makeImageModalInvisible);




// *****************************************   ARRAY METHODS   ************************************************************
initialCards.forEach((cardData) => {
  const cardElement = new Card(cardData, cardTemplate, viewPlaceImage);
  cardContainer.append(cardElement.returnCardElement());
})