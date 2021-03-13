import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
//import {UseCallbackFactoryExample} from "./components/UseCallbackFactoryExample";
import {ThemeProvider} from "./theme/ThemeProvider";
import {App} from "./components/generalExample/App";



ReactDOM.render(
  <React.StrictMode>

  <ThemeProvider>
    <App/>
  </ThemeProvider>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
