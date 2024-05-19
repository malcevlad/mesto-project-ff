import {initialCards} from './cards.js';
import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

document.querySelectorAll('.popup').forEach( item => {
    item.classList.add('popup_is-animated');
});


// Добавление новой карточки
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardURL = popupNewCard.querySelector('.popup__input_type_url');

addButton.addEventListener('click', () => {
    openModal(popupNewCard);
    cardName.value = '';
    cardURL.value = '';
});

function handleAddCardFormSubmit(evt){
    evt.preventDefault();
    const newCard = {name: cardName.value, link: cardURL.value};
    console.log();
    placesList.prepend(createCard(cardTemplate, newCard, deleteCard, likeCard, openPopupImage));
    closeModal(popupNewCard);
}

popupNewCard.addEventListener('submit', handleAddCardFormSubmit);


// Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

function handleFormSubmit(evt){
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit);
}

popupEdit.addEventListener('submit', handleFormSubmit);


// Открыть модальное окно с картинкой
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function openPopupImage(evt) {

    openModal(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
}

initialCards.forEach(item => placesList.append(createCard(cardTemplate, item, deleteCard, likeCard, openPopupImage)));