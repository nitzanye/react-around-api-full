import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((user) => user === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `button_style_like ${
    isLiked ? 'button button_style_full' : 'button button_style_like'
  }`;

  // Checking if the current user is the owner of the current card
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `cards__delete-button ${
    isOwn ? 'cards__delete-button_visible' : 'cards__delete-button_hidden'
  }`;

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDeleteClick(card);

  return (
    <li className='cards__card' key={card._id}>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className='cards__image'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      ></img>
      <div className='cards__content'>
        <h2 className='cards__title'>{card.name}</h2>
        <div className='cards__like-wrapper'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className='cards__like-count'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
