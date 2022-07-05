import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  isDataLoading,
}) => {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  const [isCardNameValid, setIsCardNameValid] = React.useState(true);
  const [isCardLinkValid, setIsCardLinkValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setCardName("");
    setCardLink("");
    setIsCardNameValid(true);
    setIsCardLinkValid(true);
    setErrorMessage("");
  }, [isOpen]);

  const handleInputNameChange = (e) => {
    const { value, validity, validationMessage } = e.target;
    setCardName(value);
    setIsCardNameValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleInputLinkChange = (e) => {
    const { value, validity, validationMessage } = e.target;
    setCardLink(value);
    setIsCardLinkValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit(cardName, cardLink);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="New place"
      closeBtn="close-add"
      onClose={onClose}
      btnLable={isDataLoading ? "Creating" : "Create"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="card-name-input"
        type="text"
        className={`popup__input popup__input_new_title ${
          !isCardNameValid && "popup__input_type_error"
        }`}
        name="nameInput"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={cardName}
        onChange={handleInputNameChange}
      />
      <span
        id="card-name-input-error"
        className={`popup__error ${!isCardNameValid && "popup__error_visible"}`}
      >
        {errorMessage}
      </span>

      <input
        id="card-link-input"
        type="url"
        className={`popup__input popup__input_new_url ${
          !isCardLinkValid && "popup__input_type_error"
        }`}
        name="linkInput"
        placeholder="Image link"
        required
        value={cardLink}
        onChange={handleInputLinkChange}
      />
      <span
        id="card-link-input-error"
        className={`popup__error ${!isCardLinkValid && "popup__error_visible"}`}
      >
        {errorMessage}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
