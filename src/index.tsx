import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {UseDomRectExample} from "./components/UseDomRectExample";
import {UseWindowInnerSizeExample} from "./components/UseWindowInnerSizeExample";
import {UseNamedStateExample} from "./components/UseNamedStateExample";
import {UseCallbackFactoryExample} from "./components/UseCallbackFactoryExample";
import {UseClickExample} from "./components/UseClickExample";

ReactDOM.render(
  <React.StrictMode>




   <UseCallbackFactoryExample />









  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
