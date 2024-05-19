function createCard(cardTemplate, card, deleteCard, likeCard, openPopupImage) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector(".card__image")
    cardImage.src = card.link;
    cardImage.alt = card.name;


    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardImage.addEventListener('click', openPopupImage);

    return cardElement;
};

const deleteCard = card => card.remove();
const likeCard = like => like.classList.toggle('card__like-button_is-active');


export {createCard, deleteCard, likeCard};