  export default class Card{
    constructor(data, cardSelector, handleImageClick, deleteCardCallback, likeButtonCallback){
      this._data = data;
      this._cardElement = cardSelector.cloneNode(true);
      this._handleImageClick = handleImageClick;
      this._deleteCardCallback = deleteCardCallback;
      this._likeButtonCallback = likeButtonCallback;
    }
  
    _setEventListeners(){
      this._cardElement.querySelector('.card__link').addEventListener('click', () => {
        this._handleLikeButton();
      });
      
      this._cardElement.querySelector('.card__delete-btn').addEventListener('click', () => {
        this._deleteCardCallback(this._data, this._cardElement);
      });
      
      this._cardElement.querySelector('.card__image').addEventListener('click', () => {
        this._handleImageClick(this._data);
      });
    }
  
    _handleLikeButton(){
      this._likeButtonCallback(this._data, this._cardElement);
    }
  
    returnCardElement(){
      this._cardElement.querySelector('.card__image').src = this._data.link;
      this._cardElement.querySelector('.card__title').textContent = this._data.name;
      this._cardElement.querySelector('.card__image').alt = this._data.name;
      this._setEventListeners();
  
      return this._cardElement;
    }
  }