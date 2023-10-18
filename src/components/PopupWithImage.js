import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    open(data){
        this._popupElement.querySelector('.modal__image').src = data.link;
        this._popupElement.querySelector('.modal__image').alt = data.link;
        this._popupElement.querySelector('.modal__caption').textContent = data.name;
        
        super.open();
    }
}