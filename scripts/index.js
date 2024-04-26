// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createCard(card, deleteCard) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector(".card__image")
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}

const deleteCard = card => card.remove();


initialCards.forEach(item => placesList.append(createCard(item, deleteCard)));