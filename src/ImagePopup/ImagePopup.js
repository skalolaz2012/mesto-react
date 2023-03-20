function ImagePopup() {
  return (
    <div className="popup popup_opacity_dark" id="popup-figure">
      <figure className="popup__figure">
        <button
          type="button"
          aria-label="Кнопка закрытия карточки"
          className="popup__close-button"
        ></button>
        <img className="popup__image" src="#" alt="" />
        <figcaption className="popup__description"></figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
