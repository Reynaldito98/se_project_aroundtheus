import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = this._popupElement.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    close(){
        this._popupForm.reset();
        super.close();
    }

    _getInputValues(){
        this._formValues = {};

        this._popupForm.querySelectorAll('.modal__input').forEach((item) => {
            this._formValues[item.id] = item.value;
        })

        return this._formValues;
    }

    setInputValues(data){
        this._inputList.forEach((input) => {
            input.value = data[input.id];
        })
    }

    setEventListeners(){
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }
}