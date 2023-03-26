import { useState, useEffect } from 'react'
import { api } from '../utils/api'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import ImagePopup from './ImagePopup/ImagePopup'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup'
import SubmitPopup from './SubmitPopup/SubmitPopup'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardDel, setCardDel] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isBtnLoading, setIsBtnLoading] = useState(true)

  useEffect(() => {
    api
      .proceedFromServer()
      .then((res) => {
        const [initialCard, userData] = res
        setCurrentUser(userData)
        setCards(initialCard)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
        setIsBtnLoading(false)
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true)
    setCardDel(card)
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    })
  }

  function handleCardDelete(card) {
    setIsBtnLoading(true)
    // Отправляем запрос в API и удаляем карточку
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c))
        closeAllPopups()
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleUpdateUser(data) {
    setIsBtnLoading(true)
    api
      .changeUserObj(data)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsBtnLoading(true)
    api
      .changeAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsBtnLoading(true)
    api
      .createCard(data)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard(null)
  }

  if (error) {
    return (
      <main className="content">
        <h1 style={{ color: 'white' }}>Error: {error}</h1>
      </main>
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__wrap">
          <div className="page__content">
            <Header />
            {isLoading ? (
              <h1 style={{ color: 'white', margin: '0 auto' }}>Загружаем...</h1>
            ) : (
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards={cards}
              />
            )}
            <Footer />
          </div>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isBtnLoading={isBtnLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isBtnLoading={isBtnLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isBtnLoading={isBtnLoading}
        />
        <SubmitPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isBtnLoading={isBtnLoading}
          card={cardDel}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
