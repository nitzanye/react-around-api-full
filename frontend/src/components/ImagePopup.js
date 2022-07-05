function ImagePopup(props) {
  const { card, onClose, isOpen } = props;
  return (
    <div className={`popup popup_type_preview ${isOpen && 'popup_opened'}`}>
      <div className='popup__window popup__window-content-preview'>
        <button
          type='button'
          className='button button_type_close button_type_close-preview'
          onClick={onClose}
        />
        <img
          className='popup__preview-image'
          src={card && card.link}
          alt={card && card.name}
        />
        <figcaption className='popup__caption'>{card && card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;
