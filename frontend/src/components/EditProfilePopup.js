import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isDataLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setIsNameValid(true);
    setIsDescriptionValid(true);
    setErrorMessage("");
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    const { value, validity, validationMessage } = e.target;
    setName(value);
    setIsNameValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleChangeDescription = (e) => {
    const { value, validity, validationMessage } = e.target;
    setDescription(value);
    setIsDescriptionValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      closeBtn="close-profile"
      onClose={onClose}
      btnLable={isDataLoading ? "Saving" : "Save"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        className={`popup__input popup__input_description_name ${
          !isNameValid && "popup__input_type_error"
        }`}
        name="name"
        placeholder="Your name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span
        id="name-input-error"
        className={`popup__error ${!isNameValid && "popup__error_visible"}`}
      >
        {errorMessage}
      </span>

      <input
        id="job-input"
        type="text"
        className={`popup__input popup__input_description_job ${
          !isDescriptionValid && "popup__input_type_error"
        }`}
        name="job"
        placeholder="Your job"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
        required
      />
      {errorMessage && (
        <span
          id="job-input-error"
          className={`popup__error ${
            !isDescriptionValid && "popup__error_visible"
          }`}
        >
          {errorMessage}
        </span>
      )}
    </PopupWithForm>
  );
};

export default EditProfilePopup;
