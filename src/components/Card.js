  import { createPopupWithYes } from "../utils/utils";
  import { api } from "../pages/index.js";
  
  export default class Card{
    constructor(data, cardSelector, handleImageClick){
      this._data = data;
      this._cardElement = cardSelector.cloneNode(true);
      this._handleImageClick = handleImageClick;
    }
  
    _setEventListeners(){
      this._cardElement.querySelector('.card__link').addEventListener('click', () => {
        this._handleLikeButton();
      });
      
      this._cardElement.querySelector('.card__delete-btn').addEventListener('click', () => {
        const deleteCardPopup = createPopupWithYes('#delete-card-modal', () => {
          api.deleteCard(this._data._id);
          this._handleDeleteCard();
        });
  
        deleteCardPopup.open();
        deleteCardPopup.setEventListeners();
      });
      
      this._cardElement.querySelector('.card__image').addEventListener('click', () => {
        this._handleImageClick(this._data);
      });
    }
  
    _handleDeleteCard(){
      this._cardElement.remove();
    }
  
    _handleLikeButton(){
      if(!this._data.isLiked){
        api.addLike(this._data._id, this._cardElement);
        this._data.isLiked = true;
      } else{
        api.deleteLike(this._data._id, this._cardElement);
        this._data.isLiked = false;
      }
    }
  
    returnCardElement(){
      this._cardElement.querySelector('.card__image').src = this._data.link;
      this._cardElement.querySelector('.card__title').textContent = this._data.name;
      this._cardElement.querySelector('.card__image').alt = this._data.name;
      this._setEventListeners();
  
      return this._cardElement;
    }
  }