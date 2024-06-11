function createCard(cardTemplate, card, userId, cardEvents) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounts = cardElement.querySelector('.card__like-counts');

    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.alt = card.name;
    likeCounts.textContent = card.likes.length;

  
    const hasUserLike = card.likes.some(like => like._id === userId); 

    if(hasUserLike){
        likeButton.classList.add('card__like-button_is-active') 
    }

    if(card.owner._id !== userId){
        deleteButton.classList.add('card__delete-button-hidden')
    }

    // Открыть попап для удаления карточки
    deleteButton.addEventListener('click', () => {
        cardEvents.openPopupDeleteCard(cardElement, card._id);
    })

    //Ставим и снимаем лайк
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active')
        if (isLiked){
            cardEvents.deleteLike(card._id)
            .then ((res) => {
                likeCounts.textContent = res.likes.length;
                likeButton.classList.toggle('card__like-button_is-active');
                })
            } else {
                cardEvents.setLike(card._id)
                .then ((res) => {
                    likeCounts.textContent = res.likes.length;
                    likeButton.classList.toggle('card__like-button_is-active');
                })
            }
    });
    
    cardImage.addEventListener('click', () => cardEvents.openPopupImage(card));

    return cardElement;
};

export {createCard};