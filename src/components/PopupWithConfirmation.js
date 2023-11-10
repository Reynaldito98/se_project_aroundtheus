import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup{
    constructor({popupSelector, handleYesButton}){
        super({popupSelector});
        this._handleYesButton = handleYesButton;
        this._popupButton = this._popupElement.querySelector('.modal__button');
    }

    open(deleteCard){
        super.open();
        this._handleYesButton = deleteCard;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleYesButton();
        })
    }
}
