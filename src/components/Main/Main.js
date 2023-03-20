import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Card from '../Card/Card'

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState([])
  useEffect(() => {
    api
      .proceedFromServer()
      .then((res) => {
        const [initialCard, userData] = res
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setCards(initialCard)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (error) {
    return (
      <main className="content">
        <h1 style={{ color: 'white' }}>Error: {error}</h1>
      </main>
    )
  }
  return (
    <main className="content">
      <section className="profile">
        {isLoading ? (
          <h1 style={{ color: 'white', margin: '0 auto' }}>Загружаем...</h1>
        ) : (
          <>
            <div className="profile__circle">
              <img
                src={userAvatar}
                alt="Фотография пользователя"
                className="profile__avatar"
              />
              <button
                type="button"
                aria-label="Кнопка редактирования аватара"
                className="profile__edit-avatar"
                onClick={onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <button
                type="button"
                aria-label="Кнопка редактирования профиля 'о себе'"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
              <p className="profile__text">{userDescription}</p>
            </div>
            <button
              type="button"
              aria-label="Кнопка добавления фотографий в альбом"
              className="profile__add-button"
              onClick={onAddPlace}
            >
              +
            </button>
          </>
        )}
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card onCardClick={onCardClick} card={card} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
