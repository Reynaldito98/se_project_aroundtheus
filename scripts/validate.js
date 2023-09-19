//********************************        FUNCTIONS         ************************************************

function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.modal__input-error_${inputElement.id}`);
  
    inputElement.classList.add('.modal__input-error');
    errorElement.textContent = errorMessage;
    inputElement.style.borderBottom = "1px solid red";
  }
  
  function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.modal__input-error_${inputElement.id}`);
  
    inputElement.classList.remove('.modal__input-error');
    errorElement.textContent = "";
    inputElement.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  }
  
  function checkInputValidity(formElement, inputElement){
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else{
      hideInputError(formElement, inputElement);
    }
  }
  
  function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.modal__input'));
    const buttonElement = formElement.querySelector('.modal__button');
  
    if(formElement.classList.contains('modal__form_start_inactive')){
      toggleButtonState(inputList, buttonElement);
    }
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', function(){
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }
  
  function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.modal__form'));
  
    formList.forEach(formElement => {
      formElement.addEventListener('submit', function(evt){
        evt.preventDefault();
      })
  
      setEventListeners(formElement);
    })
  }
  
  function hasInvalidInput(inputList){
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }
  
  function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add('modal__button_inactive');
      buttonElement.setAttribute('disabled', 'disabled');
    }
    else{
      buttonElement.classList.remove('modal__button_inactive');
      buttonElement.removeAttribute('disabled');
    }
  }

  //***************************************   CALLBACK FUNCTIONS  **************************************************
enableValidation();