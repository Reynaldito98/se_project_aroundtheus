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
//  BUTTONS
const editButton = document.querySelector('.profile__edit-link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addPlaceButton = document.querySelector('.profile__add-link');

// CARD MODAL
const cardModal = document.querySelector('#add-card-modal');
const cardModalForm = cardModal.querySelector('.modal__form');
const cardModalCloseButton = cardModal.querySelector('.modal__close-button-container');
const cardModalInputTitle = document.querySelector('#input_title');
const cardModalInputUrl = document.querySelector('#input_url');

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
//************************************************************************************************************************************** */

// *****************************************   FUNCTION DECLARATIONS   ************************************************************
function getCardElement(data){
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__link');
  const heartIcon = cardElement.querySelector('.card__love-icon');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  function togglingLikeButton(){
    heartIcon.classList.toggle('card__love-icon_background_black');
  }

  function removeCard(){
    cardElement.remove();
  }

  function viewPlaceImage(){
    const image = imageModal.querySelector('.modal__image');
    const name = imageModal.querySelector('.modal__caption');

    image.src = data.link;
    image.alt = data.link;
    name.textContent = data.name;
    openPopUp(imageModal);
  }

  likeButton.addEventListener('click', togglingLikeButton);
  deleteBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', viewPlaceImage);

  return cardElement;
}


function closePopUp(popUp){
      popUp.classList.remove('modal_opened');
      popUp.classList.add('modal_transition_delay');
  }

 function openPopUp(popUp){
      popUp.classList.add('modal_opened');
      popUp.classList.remove('modal_transition_delay');
 } 


function makePopUpVisible(){
  openPopUp(profileModal);
  profileModalNameInput.value = profileName.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
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
    link: urlValue,
  }
  const newCard = getCardElement(cardData);
  cardContainer.prepend(newCard);
  closePopUp(cardModal);
  cardModalInputTitle.value = "";
  cardModalInputUrl.value = "";
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
  const cardElement = getCardElement(cardData);
  cardContainer.append(cardElement);
})