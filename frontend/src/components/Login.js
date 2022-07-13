import React from 'react';
import Form from './Form';

const Login = (props) => {
  const { onSubmit } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChangeEmail = (e) => {
    const { value, validity, validationMessage } = e.target;
    setEmail(value);
    setIsEmailValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleChangePassword = (e) => {
    const { value, validity, validationMessage } = e.target;
    setPassword(value);
    setIsPasswordValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <section className='auth-form'>
      <Form
        name='login'
        title='Log in'
        linkPath='/signup'
        linkText='Not a member yet? Sign up here!'
        onSubmit={handleSubmit}
      >
        <input
          className={`form__input ${!isEmailValid && 'form__input_type_error'}`}
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span
          id='email-input-error'
          className={`form__error ${!isEmailValid && 'form__error_visible'}`}
        >
          {errorMessage}
        </span>

        <input
          className={`form__input ${
            !isPasswordValid && 'form__input_type_error'
          }`}
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span
          id='password-input-error'
          className={`form__error ${!isPasswordValid && 'form__error_visible'}`}
        >
          {errorMessage}
        </span>
        <button 
        type='submit'  
        className={`${isPasswordValid && isEmailValid ? "form__submit" : "form__submit form__submit-disable"}`}
        >
          Sign in
      </button>
      </Form>
    </section>
  );
};

export default Login;

// import React from 'react';
// import Form from './Form';

// const Login = (props) => {
//   const { isDataLoding, onSubmit } = props;

//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [isEmailValid, setIsEmailValid] = React.useState(true);
//   const [isPasswordValid, setIsPasswordValid] = React.useState(true);
//   const [errorMessage, setErrorMessage] = React.useState('');

//   const handleChangeEmail = (e) => {
//     const { value, validity, validationMessage } = e.target;
//     setEmail(value);
//     setIsEmailValid(validity.valid);
//     !validity.valid && setErrorMessage(validationMessage);
//   };

//   const handleChangePassword = (e) => {
//     const { value, validity, validationMessage } = e.target;
//     setPassword(value);
//     setIsPasswordValid(validity.valid);
//     !validity.valid && setErrorMessage(validationMessage);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(email, password);
//   };

//   return (
//     <section className='auth-form'>
//       <Form
//         name='login'
//         title='Log in'
//         btnLable={isDataLoding ? 'Logging in' : 'Log in'}
//         linkPath='/signup'
//         linkText='Not a member yet? Sign up here!'
//         onSubmit={handleSubmit}
//       >
//         <input
//           className={`form__input ${!isEmailValid && 'form__input_type_error'}`}
//           type='email'
//           id='email'
//           name='email'
//           placeholder='Email'
//           value={email}
//           onChange={handleChangeEmail}
//           required
//         />
//         <span
//           id='email-input-error'
//           className={`form__error ${!isEmailValid && 'form__error_visible'}`}
//         >
//           {errorMessage}
//         </span>

//         <input
//           className={`form__input ${
//             !isPasswordValid && 'form__input_type_error'
//           }`}
//           type='password'
//           id='password'
//           name='password'
//           placeholder='Password'
//           value={password}
//           onChange={handleChangePassword}
//           required
//         />
//         <span
//           id='password-input-error'
//           className={`form__error ${!isPasswordValid && 'form__error_visible'}`}
//         >
//           {errorMessage}
//         </span>
//       </Form>
//     </section>
//   );
// };

// export default Login;
