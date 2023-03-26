import { useRef, useEffect } from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isBtnLoading }) {
  const titleRef = useRef(null)
  const linkRef = useRef(null)

  function handleAddPlace(e) {
    e.preventDefault()

    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    })
  }

  useEffect(() => {
    titleRef.current.value = ''
    linkRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      id="popup-add-form"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlace}
      type="form_card"
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..."
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_field_description"
        id="card-input"
        ref={titleRef}
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
        ref={linkRef}
      />
      <div className="popup__field">
        <span className="url-input-error popup__error popup__error-field"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
