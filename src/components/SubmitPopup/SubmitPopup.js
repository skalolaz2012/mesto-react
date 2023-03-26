import PopupWithForm from "../PopupWithForm/PopupWithForm"

function SubmitPopup({ isOpen, onClose, onDeleteCard, isBtnLoading, card }) {

  function handleDeleteCard(e) {
    e.preventDefault()
    onDeleteCard(card)
  }

  return (
    <PopupWithForm
      id="popup-delete-form"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      type="form_delete"
      onSubmit={handleDeleteCard}
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..."
    ></PopupWithForm>
  )
}

export default SubmitPopup
