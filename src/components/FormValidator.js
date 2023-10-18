//********************************        FUNCTIONS         ************************************************
export default class FormValidator{
  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(this._validationConfig.inputErrorClass + inputElement.id);
  
    inputElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(this._validationConfig.inputErrorClass + inputElement.id);
  
    inputElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput(inputList){
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity(inputElement){
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState(inputList, buttonElement){
    if(this._hasInvalidInput(inputList)){
      this.disableStateButton();
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
  
    this._toggleButtonState(inputList, this._buttonElement);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, this._buttonElement);
      });
    });
  };

  enableValidation(){
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
  }

  disableStateButton(){
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
  }
};