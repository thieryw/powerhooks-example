import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import {UseDomRectExample} from "./components/UseDomRectExample";
//import {UseWindowInnerSizeExample} from "./components/UseWindowInnerSizeExample";
//import {UseNamedStateExample} from "./components/UseNamedStateExample";
//import {UseClickExample} from "./components/UseClickExample";
import {TecTacTow} from "./components/UseCallbackFactoryExample/BadExample";

ReactDOM.render(
  <React.StrictMode>





  <div>
    <h1>useCallbackFactory</h1>

    <TecTacTow />

  </div>










  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
