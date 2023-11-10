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
        this._deleteCardCallback(this);
      });
      
      this._cardElement.querySelector('.card__image').addEventListener('click', () => {
        this._handleImageClick(this._data);
      });
    }
  
    _handleLikeButton(){
      this._likeButtonCallback(this);
    }

    deleteCard(){
      this._cardElement.remove();
    }

    getId(){
      return this._data._id;
    }

    getIsLiked(){
      return this._data.isLiked;
    }

    addLike(){
      this._cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
      this._data.isLiked = true;
    }

    deleteLike(){
      this._cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
      this._data.isLiked = false;
    }
    
    likeButtonPersistenceUponReload(){
      if(this._data.isLiked){
        this._cardElement.querySelector('.card__love-icon').classList.add('card__love-icon_background_black');
      } else{
        this._cardElement.querySelector('.card__love-icon').classList.remove('card__love-icon_background_black');
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