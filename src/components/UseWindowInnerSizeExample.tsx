import {useWindowInnerSize} from "powerhooks/useWindowInnerSize";

//This hook triggers an event every time the window changes size.
//It returns an object with the current window width and height as properties.

export const UseWindowInnerSizeExample = ()=>{

  const {windowInnerWidth} = useWindowInnerSize();
  const colors = ["red", "lightblue", "orange" , "green", "yellow"];
  
  
  return(
    <div style={{
        width: "100vw",
    }}>

        <h1>useWindowInnerSize</h1>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: windowInnerWidth < 800 ? "column" : "unset",
          width: "100%",
          height: "100%"
        
        
        }}>
          {
            [1,2,3,4,5].map((buttonNumber, index)=> 
              <button style={{
                width: "100px",
                height: "30px",
                backgroundColor: `${colors[index]}`,
                margin: "10px"
              }} key={buttonNumber}>
                {buttonNumber}
              </button>)
          }


        </div>
    </div>

  )
}

