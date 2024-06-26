function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('mousedown', closeByOverlay);
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

// Закрытие модального окна по оверлею
function closeByOverlay(evt){
    if(evt.target === evt.currentTarget){
        closeModal(evt.currentTarget);
    }
}

// Закрытие модального окна по Esc
function closeByEscape(evt){
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}


export {openModal, closeModal};