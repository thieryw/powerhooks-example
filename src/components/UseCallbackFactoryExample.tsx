import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useNamedState} from "powerhooks/useNamedState";
import {memo} from "react";





export const UseCallbackFactoryExample = ()=>{


    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>useCallbackFactory</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridGap: "3px",
                backgroundColor: "black",
                width: "400px",
                border: "solid black 3px"
            }}>

                {
                    [0,1,2,3,4,5,6,7,8].map(cellNumber => <Cell/>)
                }
            </div>
        </div>
    )
}



const Cell = memo(()=>{


    return(
        <div style={{
            backgroundColor: "white",
            height: "100px"
        }}>
            
        </div>
    )
})




