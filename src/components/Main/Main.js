import ImagePopup from '../../ImagePopup/ImagePopup'

function Main(props) {
const { onEditProfile, onAddPlace, onEditAvatar } = props
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__circle">
          <img
            src="#"
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
          <h1 className="profile__title">Жак-Ив Кусто</h1>
          <button
            type="button"
            aria-label="Кнопка редактирования профиля 'о себе'"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__text">Исследователь океана</p>
        </div>
        <button
          type="button"
          aria-label="Кнопка добавления фотографий в альбом"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          +
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
        <ImagePopup />
      </section>
    </main>
  )
}

export default Main
