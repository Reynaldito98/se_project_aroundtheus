

export default class Card{
    constructor(data, cardSelector, handleImageClick){
      this._data = data;
      this._cardElement = cardSelector.cloneNode(true);
      this._handleImageClick = handleImageClick;
    }
  
    _setEventListeners(){
      this._cardElement.querySelector('.card__image').addEventListener('click', () => {
        this._handleImageClick(this._data);
      });
    }
  
    returnCardElement(){
      this._cardElement.querySelector('.card__image').src = this._data.link;
      this._cardElement.querySelector('.card__title').textContent = this._data.name;
      this._cardElement.querySelector('.card__image').alt = this._data.name;
      this._setEventListeners();
  
      return this._cardElement;
    }
  }