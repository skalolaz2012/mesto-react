function PopupWithForm(props) {
  return (
    props.isOpen && (
      <div className="popup popup_opacity_medium popup_opened" id={props.id}>
        <div className="popup__figure">
          <button
            type="button"
            aria-label="Кнопка закрытия формы"
            className="popup__close-button"
            onClick={props.onClose}
          ></button>
          <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <div>{props.children}</div>
            <button type="submit" className="popup__submit-button">
              {props.button}
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default PopupWithForm
