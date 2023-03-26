import { useRef, useEffect } from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isBtnLoading }) {
  const inputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  
  useEffect(() => {
    inputRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      id="popup-avatar-form"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isBtnLoading={isBtnLoading}
      type="form_avatar"
      submitBtn="Сохранение..."
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        className="popup__input popup__input_field_description"
        id="avatar-input"
        ref={inputRef}
      />
      <div className="popup__field">
        <span className="avatar-input-error popup__error popup__error-field"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
