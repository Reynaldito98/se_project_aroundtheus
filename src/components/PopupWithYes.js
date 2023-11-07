import Popup from './Popup.js';

export default class PopupWithYes extends Popup{
    constructor({popupSelector, handleYesButton}){
        super({popupSelector});
        this._handleYesButton = handleYesButton;
        this._popupButton = this._popupElement.querySelector('.modal__button')
    }

    setEventListeners(){
        super.setEventListeners();

        this._popupElement.querySelector('.modal__close-button-container').addEventListener('click', () => {
            this._popupButton.removeEventListener('click', deleteCard);
        });

        const deleteCard = (evt) => {
            evt.preventDefault();
            this._handleYesButton();
            this.close();
            this._popupButton.removeEventListener('click', deleteCard);
        }

        this._popupButton.addEventListener('click', deleteCard);
    }
}
