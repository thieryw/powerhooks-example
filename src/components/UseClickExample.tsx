import {useClick} from "powerhooks/useClick";



export const UseClickExample = ()=>{

    const { getOnMouseProps} = useClick({
        "doubleClickDelayMs": 500,
        "callback": ({type})=>{

            
        }
    })

    return(
        <div>

            <button {...getOnMouseProps()}>Click or double click</button>

        </div>
    )
}