import { useState } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm'
import ImagePopup from './ImagePopup/ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <div className="App">
      <div className="page__wrap">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
        </div>
      </div>
      <PopupWithForm
        id="popup-edit-form"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <form
          id="form_name"
          name="form_name"
          className="popup__form"
          noValidate
        >
          <fieldset className="popup__field-info">
            <input
              type="text"
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              className="popup__input popup__input_field_title"
              id="name-input"
            />
            <div className="popup__field">
              <span className="name-input-error popup__error popup__error-field"></span>
            </div>
            <input
              type="text"
              name="about"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
              className="popup__input popup__input_field_text"
              id="about-input"
            />
            <div className="popup__field">
              <span className="about-input-error popup__error popup__error-field"></span>
            </div>
          </fieldset>
        </form>
      </PopupWithForm>
      <PopupWithForm
        id="popup-add-form"
        title="Новое место"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <form id="form_card" name="form_card" className="popup__form">
          <fieldset className="popup__field-info">
            <input
              type="text"
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              className="popup__input popup__input_field_description"
              id="card-input"
            />
            <div className="popup__field">
              <span className="card-input-error popup__error popup__error-field"></span>
            </div>
            <input
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              required
              className="popup__input popup__input_field_image"
              id="url-input"
            />
            <div className="popup__field">
              <span className="url-input-error popup__error popup__error-field"></span>
            </div>
          </fieldset>
        </form>
      </PopupWithForm>
      <PopupWithForm
        id="popup-avatar-form"
        title="Обновить аватар"
        button="Создать"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <form id="form_avatar" name="form_avatar" className="popup__form">
          <fieldset className="popup__field-info">
            <input
              type="url"
              name="avatar"
              placeholder="Ссылка на аватар"
              required
              className="popup__input popup__input_field_description"
              id="avatar-input"
            />
            <div className="popup__field">
              <span className="avatar-input-error popup__error popup__error-field"></span>
            </div>
          </fieldset>
        </form>
      </PopupWithForm>
      <PopupWithForm id="popup-delete-form" title="Вы уверены?" button="Да">
        <form
          id="form_delete"
          name="form_delete"
          className="popup__form"
          isOpen={false}
          onClose={closeAllPopups}
        ></form>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  )
}

export default App
