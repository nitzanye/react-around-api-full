import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  const { name, title, linkPath, linkText, onSubmit, children } =
    props;

  return (
    <form
      className='form'
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className='form__title'>{title}</h2>

      {children}
      <Link to={linkPath} className='form__link'>
        {linkText}
      </Link>
    </form>
  );
};

export default Form;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Form = (props) => {
//   const { name, title, linkPath, linkText, onSubmit, btnLable, children } =
//     props;

//   return (
//     <form
//       className='form'
//       name={name}
//       onSubmit={onSubmit}
//       noValidate
//     >
//       <h2 className='form__title'>{title}</h2>

//       {children}
//       <button type='submit' className='form__submit'>
//         {btnLable}
//       </button>
//       <Link to={linkPath} className='form__link'>
//         {linkText}
//       </Link>
//     </form>
//   );
// };

// export default Form;