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

const editButton = document.querySelector('.profile__edit-link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addPlaceButton = document.querySelector('.profile__add-link');

const modal = document.querySelectorAll('.modal');
const modalForm = document.querySelectorAll('.modal__form');
const modalButton = document.querySelectorAll('.modal__button')
const closeButton = document.querySelectorAll('.modal__close-button-container');
const modalNameInput = document.querySelector('.modal__input_name');
const modalDescriptionInput = document.querySelector('.modal__input_about');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardContainer = document.querySelector('.elements');
const inputTitle = document.querySelector('#input_title');
const inputUrl = document.querySelector('#input_url');
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

  function viewingPlaceImage(){
    const image = modal[2].querySelector('.modal__image');
    const name = modal[2].querySelector('.modal__caption');

    image.src = data.link;
    image.alt = data.link;
    name.textContent = data.name;
    modal[2].classList.remove('modal_display_none');
    modal[2].classList.remove('modal_transition_delay');
  }

  likeButton.addEventListener('click', togglingLikeButton);
  deleteBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', viewingPlaceImage);

  return cardElement;
}


function closePopUp(){
    for(let i=0; i<modal.length; i++){
      modal[i].classList.add('modal_display_none');
      modal[i].classList.add('modal_transition_delay');
    }
  }


function makePopUpVisible(){
  modal[1].classList.remove('modal_display_none');
  modal[1].classList.remove('modal_transition_delay');
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}


function makeAddPlacePopUpVisible(){
  modal[0].classList.remove('modal_display_none');
  modal[0].classList.remove('modal_transition_delay');
}

function makePopUpInvisible(){
  closePopUp();
}




function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closePopUp();
}

function addingNewCard(evt){
  evt.preventDefault();
  const titleValue = inputTitle.value;
  const urlValue = inputUrl.value;
  const cardData = {
    name: titleValue,
    link: urlValue,
  }
  const newCard = getCardElement(cardData);
  cardContainer.prepend(newCard);
  makePopUpInvisible();
}


// *****************************************   EVENT LISTENERS   ************************************************************
editButton.addEventListener('click', makePopUpVisible);
addPlaceButton.addEventListener('click', makeAddPlacePopUpVisible);
for(let i=0; i<closeButton.length; i++){
  closeButton[i].addEventListener('click', makePopUpInvisible);
}
modalButton[1].addEventListener('click', handleProfileFormSubmit);
modalButton[0].addEventListener('click', addingNewCard);





// *****************************************   ARRAY METHODS   ************************************************************
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardContainer.append(cardElement);
})