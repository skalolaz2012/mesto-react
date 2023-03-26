function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_opacity_medium ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      id={props.id}
    >
      <div className="popup__figure">
        <button
          type="button"
          aria-label="Кнопка закрытия формы"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            id="form_name"
            name={props.type}
            className="popup__form"
            noValidate
          >
            <fieldset className="popup__field-info">
              <div>{props.children}</div>
            </fieldset>
          </form>
          <button type="submit" className="popup__submit-button" onClick={props.onSubmit}>
            {props.isBtnLoading ? props.submitBtn : (props.button || 'Сохранить')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm
