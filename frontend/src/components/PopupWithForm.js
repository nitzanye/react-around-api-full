import React from "react";

const PopupWithForm = (props) => {
  const {
    name,
    title,
    isOpen,
    onSubmit,
    submitBtn,
    btnLable,
    onClose,
    closeBtn,
    children,
    validOnOpen,
  } = props;

  const [isValid, setIsValid] = React.useState(false);
  const formRef = React.useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setIsValid(formRef.current.checkValidity());
  };

  React.useEffect(() => {
    validOnOpen && setIsValid(true);
  }, []);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} >
      <div className="popup__window">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          ref={formRef}
          onChange={handleChange}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`button_type_submit
             button button_type_submit button_type_submit${submitBtn} ${
              !isValid && "button_type_submit-disabled"
            }`}
          >
            {btnLable}
          </button>
        </form>
        <button
          className={`button_type_close button_type_${closeBtn}`}
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
