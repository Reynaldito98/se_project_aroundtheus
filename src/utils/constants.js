//  BUTTONS
const editButton = document.querySelector('.profile__edit-link');
const profileNameClass = '.profile__name';
const profileDescriptionClass = '.profile__description';
const avatarClass = '.profile__image';
const addPlaceButton = document.querySelector('.profile__add-link');
const avatarButton = document.querySelector('.profile__image-button');

// CARD MODAL
const cardModal = document.querySelector('#add-card-modal');
const cardModalForm = cardModal.querySelector('.modal__form');

// PROFILE MODAL
const profileModal = document.querySelector('#profile-modal');
const profileModalForm = profileModal.querySelector('.modal__form');

//AVATAR MODAL
const avatarModal = document.querySelector('#avatar-modal');
const avatarModalForm = avatarModal.querySelector('.modal__form');

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

export {editButton, profileNameClass, profileDescriptionClass, addPlaceButton, cardModalForm, avatarModalForm, profileModalForm, cardTemplate, cardContainerClass, validationConfig, avatarButton, profileModal, cardModal, avatarModal, avatarClass};