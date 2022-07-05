import React from 'react';
import successImage from '../images/successImage.svg';
import failImage from '../images/failImage.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup popup_type_toolip ${isOpen && 'popup_opened'}`}>
      <div className='popup__window popup__window_type_tooltip'>
        <img
          src={isSuccess ? successImage : failImage}
          alt='Tooltip image'
          className='popup__tooltip-image'
        />
        <p className='popup__message'>
          {isSuccess
            ? `Success! You have now been registered.`
            : `Oops, something went wrong! Please try again.`}
        </p>
        <button
          className='button_type_close-tooltip'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
