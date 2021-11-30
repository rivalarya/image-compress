import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header/Header';
import UseFile from './components/Main/useFile/main';
import Footer from './components/Footer/main';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// render ketika pertama kali di load
ReactDOM.render(<UseFile />, document.querySelector('main'))
ReactDOM.render(<Footer />, document.querySelector('footer')); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
