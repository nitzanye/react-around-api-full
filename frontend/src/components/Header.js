import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const Header = (props) => {
  const { loggedIn, userEmail, handleLogout, linkPath, linkText } = props;
  const windowWidth = useWindowDimensions();
  const [isDropDownOpen, setisDropDownOpen] = React.useState(false);

  const toggleHamburger = () => setisDropDownOpen(!isDropDownOpen);
  const handleNavClick = () => setisDropDownOpen(false);

  React.useEffect(() => {
    setisDropDownOpen(false);
  }, [setisDropDownOpen]);

  const renderHeader = () => {
    if (!loggedIn) {
      return (
        <nav className='header__menu'>
          <Link className='header__link' to={linkPath}>
            {linkText}
          </Link>
        </nav>
      );
    }

    if (loggedIn && windowWidth > 600) {
      return (
        <nav className='header__menu'>
          <ul className='header__menu-container'>
            <li>
              <p className='header__email'>{userEmail}</p>
            </li>
            <li>
              <button className='header__link' onClick={handleLogout}>
                {linkText}
              </button>
            </li>
          </ul>
        </nav>
      );
    }
    return (
      <div className='header__hamburger'>
        <button
          className={`${
            isDropDownOpen
              ? `header__hamburger-icon header__hamburger-close`
              : `header__hamburger-icon`
          }`}
          type='button'
          onClick={toggleHamburger}
        ></button>
        <nav
          className={`${
            isDropDownOpen
              ? `header__hambuger-menu header__hamburger-menu_visible`
              : `header__hambuger-menu`
          }`}
          onClick={handleNavClick}
        >
          <ul className='header__hamburger-menu-container'>
            <li className='header__hamburger-menu-item'>
              <p className='header__hamburger-email'>{userEmail}</p>
            </li>
            <li className='header__hamburger-menu-item'>
              <button className='header__hamburger-link' onClick={handleLogout}>
                {linkText}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <header
      className={`${
        isDropDownOpen && windowWidth <= 600
          ? `header header__menu header__menu-open`
          : ` header header__menu`
      }`}
    >
      <img
        className='logo logo__image'
        src={logo}
        id='logo'
        alt='Around the U.S.'
      />
      <div className='header__content'>{renderHeader()}</div>
    </header>
  );
};

export default Header;
