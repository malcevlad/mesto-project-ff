function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

// Обработчики закрытия модального окна
function closeByClick(evt){
    if(evt.target.closest('.popup__close') || evt.target === evt.currentTarget){
        closeModal(evt.currentTarget);
    }
}

function closeByEscape(evt){
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}


export {openModal, closeModal};