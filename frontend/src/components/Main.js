import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const {
    cards,
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onCardClick,
    onCardLike,
    onCardDeleteClick,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__image-container'>
          <img
            className='profile__image'
            src={currentUser.avatar}
            alt='profile image'
          />
          <button
            type='button'
            className='profile__image-update-icon'
            onClick={onEditAvatarClick}
          ></button>
        </div>

        <div className='profile__info'>
          <div className='profile__wrapper-name'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              className='button button_type_edit'
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button
          type='button'
          className='button button_type_add'
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className='cards'>
        <ul className='cards__list'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
