import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';

// Create a root
const container = document.getElementById('root');

// Initial render: Render an element to the root.
// root.render(<App tab='home' />);

const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Create a root
// const container = document.getElementById("root");
// const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
// root.render(<App tab='home' />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
