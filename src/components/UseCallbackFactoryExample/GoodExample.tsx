import { memo, useEffect, useState, useCallback} from "react";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";

export const GoodExample = ()=>{



    const [shape, setShape] = useState<"crosse" | "circle">("crosse")


    useEffect(()=>{
        console.log("update");
    })

    /*const onClick = useCallbackFactory(([shape] : ["crosse" | "circle"])=>{

      setShape(shape === "circle" ? "crosse" : "circle");

      return shape;

    });*/

    const onClick = useCallback(()=>{
        setShape(shape === "crosse" ? "circle" : "crosse");
    }, [setShape, shape])


   

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>Good example with useCallbackFactory</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridGap: "3px",
                backgroundColor: "black",
                width: "400px",
                border: "solid black 3px"
            }}>

                {
                    [0,1,2,3,4,5,6,7,8].map((cellNumber) => 
                        <Cell onClick={onClick} key={cellNumber} cellNumber={cellNumber}/>)
                }
            </div>
        </div>
    )
}

let renderCounts = [0,0,0,0,0,0,0,0,0];


type CellProps = {
    onClick: ()=> void;
    cellNumber: number;
}

const Cell = memo((props: CellProps)=>{

    const {onClick, cellNumber} = props;

    const [shape, setShape] = useState<"crosse" | "circle" | undefined>(undefined);


    useEffect(()=>{
        renderCounts[cellNumber]++;
    })

    const handleClick = useCallback(()=>{

      if(shape !== undefined){
        return;
      }

      onClick();

    }, [shape, onClick])


    return(
        <div onClick={handleClick} style={{
            backgroundColor: "white",
            height: "100px"
        }}>

                <p>
                    render count:
                    {
                        renderCounts[cellNumber]
                    }
                </p>
                <p>
                  {
                    shape === "circle" ? "O" : shape === undefined ? "" : "X"
                  }
                </p>
            
        </div>
    )
})