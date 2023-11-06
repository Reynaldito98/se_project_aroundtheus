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

//  BUTTONS
const editButton = document.querySelector('.profile__edit-link');
const profileNameClass = '.profile__name';
const profileDescriptionClass = '.profile__description';
const addPlaceButton = document.querySelector('.profile__add-link');

// CARD MODAL
const cardModal = document.querySelector('#add-card-modal');
const cardModalForm = cardModal.querySelector('.modal__form');

// PROFILE MODAL
const profileModal = document.querySelector('#profile-modal');
const profileModalForm = profileModal.querySelector('.modal__form');

// CARDS
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardContainerClass = '.elements';

//FORM VALIDATION
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: ".modal__input-error_",
  errorClass: "modal__input_border_red"
};

export {initialCards, editButton, profileNameClass, profileDescriptionClass, addPlaceButton, cardModalForm, profileModalForm, cardTemplate, cardContainerClass, validationConfig};