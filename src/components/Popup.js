export default class Popup{
    constructor({popupSelector}){
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if(evt.key==='Escape'){
            this.close();
        }
    }

    _handleRemoteClick(evt){
        if (evt.target === evt.currentTarget) { 
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.querySelector('.modal__close-button-container').addEventListener('click', () => {
            this.close();
         });

        this._popupElement.addEventListener("mousedown", (evt) => {
            this._handleRemoteClick(evt);
        });
    }
}