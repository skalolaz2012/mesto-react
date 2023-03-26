import { useContext, useState, useEffect } from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isBtnLoading }) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if(isOpen) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      id="popup-edit-form"
      title="Редактировать профиль"
      type="form_name"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..."
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_field_title"
        id="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="popup__field">
        <span className="about-input-error popup__error popup__error-field"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
