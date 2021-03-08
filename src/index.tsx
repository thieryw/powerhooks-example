import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {useConstCallback} from "powerhooks/useConstCallback";
import {ExampleWithoutUseCallbackFactory} from "./components/ExampleWithoutUseCallbackFactory";
import {UseCallbackFactoryExample} from "./components/UseCallbackFactoryExample";


const App = ()=>{

  const [displayedExample, setDisplayedExample] = useState<
    "useCallback" | "useCallbackFactory"
  >("useCallbackFactory");

  const toggleExamples = useConstCallback(()=>{
    setDisplayedExample(displayedExample === "useCallbackFactory" ? "useCallback" : "useCallbackFactory");
  });

  return(
    <div>
      <button onClick={toggleExamples}>Toggle Examples</button>

      {
        displayedExample === "useCallback" ? 
          <ExampleWithoutUseCallbackFactory/> :
          <UseCallbackFactoryExample />
      }

    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>





  <div>

    <App/>





    
  </div>










  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
