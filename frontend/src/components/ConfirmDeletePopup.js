import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({
  card,
  isOpen,
  onClose,
  isDataLoading,
  onCardDeleteSubmit,
  validOnOpen,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDeleteSubmit(card);
  };

  const handleClick = (e) => {
    e.preventDefault();
    validOnOpen(true);
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Are you sure?"
      closeBtn="close-delete-card"
      btnLable={isDataLoading ? "Deleting" : "Yes"}
      isOpen={isOpen}
      validOnOpen={handleClick}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmDeletePopup;
