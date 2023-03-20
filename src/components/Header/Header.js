import logoPath from '../../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#">
        <img
          src={logoPath}
          alt="MESTO Russia - социальная сеть Руси"
          className="header__logo"
        />
      </a>
    </header>
  )
}

export default Header