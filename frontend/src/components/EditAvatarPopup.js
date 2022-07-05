import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isDataLoading,
}) => {
  const [isAvatarLinkValid, setIsAvatarLinkValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const avatarRef = React.useRef();

  React.useEffect(() => {
    setIsAvatarLinkValid(true);
    setErrorMessage("");
    avatarRef.current.value = "";
  }, [isOpen]);

  const handleInputLinkChange = (e) => {
    const { validity, validationMessage } = e.target;
    setIsAvatarLinkValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      name="avatar"
      closeBtn="close-avatar"
      title="Change profile picture"
      btnLable={isDataLoading ? "Saving" : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarlink-input"
        type="url"
        className={`popup__input popup__input_avatarlink ${
          !isAvatarLinkValid && "popup__input_type_error"
        }`}
        name="avatarlink"
        placeholder="Image link"
        ref={avatarRef}
        required
        onChange={handleInputLinkChange}
      />
      <span
        id="avatarlink-input-error"
        className={`popup__error ${
          !isAvatarLinkValid && "popup__error_visible"
        }`}
      >
        {errorMessage}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
