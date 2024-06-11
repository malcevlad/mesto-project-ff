const showInputError = (form, input, errorMessage, validationConfig) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

const hideInputError = (form, input, validationConfig) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

const isValid = (form, input, validationConfig) => {
    if(input.validity.patternMismatch){
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity('');
    }

    if(!input.validity.valid){
        showInputError(form, input, input.validationMessage, validationConfig);
    } else {
        hideInputError(form, input, validationConfig);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(input => {
        return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, popupButton, validationConfig) => {
    if(hasInvalidInput(inputList)){
        popupButton.disabled = true;
        popupButton.classList.add(validationConfig.inactiveButtonClass);
    } else {
        popupButton.disabled = false;
        popupButton.classList.remove(validationConfig.inactiveButtonClass);
    }
}

const setEventListeners = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const popupButton = form.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input, validationConfig);
            toggleButtonState(inputList, popupButton, validationConfig);
        });
    })
}

const clearValidation = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const popupButton = form.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach(input => {
        hideInputError(form, input, validationConfig);
    })
    toggleButtonState(inputList, popupButton, validationConfig);
}

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach(form => {
        setEventListeners(form, validationConfig);
    })
}

export {clearValidation, enableValidation};
