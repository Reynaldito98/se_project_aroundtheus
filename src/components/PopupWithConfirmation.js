import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup{
    constructor({popupSelector, handleYesButton}){
        super({popupSelector});
        this._handleYesButton = handleYesButton;
        this._popupButton = this._popupElement.querySelector('.modal__button');
    }

    setEventListeners(){
        const deleteCard = (evt) => {
            evt.preventDefault();
            this._handleYesButton();
            this._popupButton.removeEventListener('click', deleteCard);
        }

        const closePopup = () => {
            this.close();
            this._popupElement.querySelector('.modal__close-button-container').removeEventListener('click', closePopup);
        }

        this._popupElement.querySelector('.modal__close-button-container').addEventListener('click', closePopup);

        this._popupButton.addEventListener('click', deleteCard);
    }
}
