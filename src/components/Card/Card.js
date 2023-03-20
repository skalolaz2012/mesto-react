function Card(props) {
  const { card, onCardClick } = props
  function handleClick() {
    onCardClick(card)
  }
  return (
    <li className="elements__item">
      <button
        type="button"
        aria-label="Кнопка удаления карточки"
        className="elements__delete-button"
      ></button>
      <button className="elements__image-button" onClick={handleClick}>
        <img className="elements__image" src={card.link} alt={card.name} />
      </button>
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__button-container">
          <button
            type="button"
            aria-label="Кнопка лайк карточки"
            className="elements__button"
          ></button>
          <p className="elements__count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card
