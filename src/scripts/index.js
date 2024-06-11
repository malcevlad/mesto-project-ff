import '../pages/index.css';
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';
import { 
    getInitialCards, 
    getUser, 
    editProfile, 
    addNewCard, 
    deleteCardApi, 
    setLike, 
    deleteLike,
    changeAvatar
} from './components/api.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = popupNewCard.querySelector('.popup__form');
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardURL = popupNewCard.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const addCardButtonSubmit = popupNewCard.querySelector('.popup__button');


const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form');
const editProfileButtonSubmit = popupEdit.querySelector('.popup__button');

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const editProfileButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = popupNewAvatar.querySelector('.popup__form');
const avatarUrl = popupNewAvatar.querySelector('.popup__input_type_url');
const newAvatarButtonSubmit = popupNewAvatar.querySelector('.popup__button');

const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const deleteCardButton = popupDeleteCard.querySelector('.popup__button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');



const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const cardEvents = {
    setLike, 
    deleteLike, 
    openPopupImage,
    openPopupDeleteCard
};


function loader(isLoading, submitButton){
    if(isLoading){
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}

function loaderDeleteCard(isLoading, submitButton){
    if(isLoading){
        submitButton.textContent = 'Удаление...'
    } else {
        submitButton.textContent = 'Да'
    }
}



// Добавление карточки
function handleAddCardFormSubmit(evt){
    evt.preventDefault();
    loader(true, addCardButtonSubmit)
    addNewCard({name: cardName.value, link: cardURL.value})
        .then((newCard) => {
            const userId = newCard.owner._id;
            placesList.prepend(createCard(cardTemplate, newCard, userId, cardEvents));
            closeModal(popupNewCard);
        })
        .finally(() => loader(false, addCardButtonSubmit))
}
    
    
// Редактирование профиля
function handleProfileEditFormSubmit(evt){
    evt.preventDefault(); 
    loader(true, editProfileButtonSubmit)
    editProfile({userName: nameInput.value, userAbout: jobInput.value})
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(popupEdit);
        })
        .finally(() => loader(false, editProfileButtonSubmit))
}

// Oбновлениe аватара
function handleСhangeAvatarFormSubmit(evt){
    evt.preventDefault();
    loader(true, newAvatarButtonSubmit);
    changeAvatar({avatarLink: avatarUrl.value})
        .then(() => {
            profileImage.style = `background-image:url(${avatarUrl.value})`
            closeModal(popupNewAvatar);
        })
        .finally(() => loader(false, newAvatarButtonSubmit))
}


// Удалить карточку
function deleteCard(card, cardId) {
    loaderDeleteCard(true, deleteCardButton)
    deleteCardApi(cardId)
    .then(() => {
        card.remove()
        closeModal(popupDeleteCard)
    })
    .finally(() => loaderDeleteCard(false, deleteCardButton))
}

// Попап с картинкой
function openPopupImage(card) {
    openModal(popupTypeImage);
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
}

// Открытие попапа и удаление карточки
function openPopupDeleteCard(card, cardId) {
    openModal(popupDeleteCard);

    popupDeleteCard.addEventListener('click', () => {
        deleteCard(card, cardId)
    })

}


// Открыть форму добавления карточки
addCardButton.addEventListener('click', () => {
    openModal(popupNewCard);
    cardName.value = '';
    cardURL.value = '';
    clearValidation(formNewPlace, validationConfig); // Функция очистки валидации
});

// Отправить форму добавления карточки
popupNewCard.addEventListener('submit', handleAddCardFormSubmit);

// Открыть форму редактирования профиля
editProfileButton.addEventListener('click', () => {
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig); // Функция очистки валидации
});

// Отправить форму редактирования профиля
popupEdit.addEventListener('submit', handleProfileEditFormSubmit);

// Открыть форму обновления аватара
profileImage.addEventListener('click', () => {
    openModal(popupNewAvatar);
    avatarUrl.value = '';
    clearValidation(formNewAvatar, validationConfig); // Функция очистки валидации
})

// Отправить форму обновления аватара
popupNewAvatar.addEventListener('submit', handleСhangeAvatarFormSubmit);


// Плавное открытие и закрытие попапов
document.querySelectorAll('.popup').forEach( item => {
    item.classList.add('popup_is-animated');
});

popupCloseButtons.forEach(item => {
    item.addEventListener('click', () => {
        const popup = item.closest('.popup');
        closeModal(popup);
    })
});




// Validity

enableValidation(validationConfig);

Promise.all([getUser(), getInitialCards()])
    .then(([user, initialCards]) => {
        
        profileTitle.textContent = user.name
        profileDescription.textContent = user.about
        profileImage.style = `background-image:url(${user.avatar})`

        const userId = user._id;

        initialCards.forEach(card => placesList.append(createCard(cardTemplate, card, userId, cardEvents)));
    })
