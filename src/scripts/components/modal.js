function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeMethod);
    document.addEventListener('keydown', closeMethod);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeMethod);
}

// Обработчик закрытия модального окна
function closeMethod(evt){
    const openedPopup = document.querySelector('.popup_is-opened');
    if(evt.target.closest('.popup__close') || evt.target === openedPopup || evt.key === 'Escape'){
        closeModal(openedPopup);
    }
}


export {openModal, closeModal};