const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: '22e94ffa-70b1-463c-a53a-b5a623988f23',
      'Content-Type': 'application/json'
    }
  }

function getResponse(res){
    if(res.ok){
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`)
    }
}

const getInitialCards = () => {

    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => getResponse(res))
}

const getUser = () => {
    
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => getResponse(res))
}

const editProfile = ({userName, userAbout}) => {
    return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: userName,
    about: userAbout
  })
})
    .then(res => getResponse(res))
}

const addNewCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => getResponse(res))
}

const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => getResponse(res))
}

const setLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => getResponse(res))
}

const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => getResponse(res))
}

const changeAvatar = ({avatarLink}) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then(res => getResponse(res))
}

export {
    getInitialCards, 
    getUser, 
    editProfile, 
    addNewCard, 
    deleteCardApi, 
    setLike, 
    deleteLike, 
    changeAvatar
}