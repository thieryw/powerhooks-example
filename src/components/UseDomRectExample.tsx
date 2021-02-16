import {useDomRect} from "powerhooks/useDomRect";



export const UseDomRectExample = ()=>{

  const {
    ref: textareaRef,
    "domRect": {
      width: textareaWidth,
      height: textareaHeight
    }
  } = useDomRect();

  return(
    <div>

      <h1>useDomRect</h1>


      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>


        <textarea ref={textareaRef} placeholder={`${textareaWidth} * ${textareaHeight}`}/>
      </div>




      

      
    </div>
  )
}