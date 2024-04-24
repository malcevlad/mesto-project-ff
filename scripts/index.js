// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function addCard(card, deleteCard) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}

const deleteCard = card => card.remove();


initialCards.forEach(item => placesList.append(addCard(item, deleteCard)));