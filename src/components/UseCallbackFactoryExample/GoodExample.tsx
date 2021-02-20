import {useState, memo, useMemo} from "react";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";


type CellState = "X" | "O" | "";




 function getIsGameWon(cellStates: CellState[]){



        for(const n of [0,1,2]){
            if(cellStates[n] === cellStates[n + 3] &&
                cellStates[n] === cellStates[n + 6] &&
                cellStates[n] !== ""
            ){
                return true;

            }
        }

        for(const n of [0,3,6]){
            if(cellStates[n] === cellStates[n+1] &&
                cellStates[n] === cellStates[n+2] &&
                cellStates[n] !== ""
            ){
                return true;
            }
        }

        if(cellStates[0] === cellStates[4] &&
            cellStates[0] === cellStates[8] &&
            cellStates[0] !== ""
        ){
            return true;
        }

        if(cellStates[6] === cellStates[4] &&
            cellStates[6] === cellStates[2] &&
            cellStates[6] !== ""
        ){
            return true;
        }



        return false;

    }




export const TicTacTow = ()=>{

    console.log("grid render");


    
    const [cellStates, setCellStates] = useState<CellState[]>(
        [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    )

    const [currentPlayer, setPlayerPlaying] = useState<Exclude<CellState, "">>("X");


    const isGameWon = useMemo(()=> getIsGameWon(cellStates), [cellStates]);


    const onClick = useCallbackFactory(([cellNumber]: [number])=>{

        cellStates[cellNumber] = currentPlayer;

        setCellStates([...cellStates]);

        setPlayerPlaying(currentPlayer === "X" ? "O" : "X");

    });





    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h2 style={{
                color: "blue"
            }}>
                {
                    isGameWon ? 
                        `game won by ${
                            currentPlayer === "O" ? "X" : "0"
                        }` 
                    : `Current shape : ${currentPlayer}`
                }
            </h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                backgroundColor: "black",
                gridGap: "3px",
                border: "solid black 3px",
                width: "400px",
                pointerEvents: isGameWon ? "none" : "unset"
            }}>
                {
                    [0,1,2,3,4,5,6,7,8].map(cellNumber => 
                        <Cell 
                            onClick={onClick(cellNumber)}
                            cellState={cellStates[cellNumber]}
                            key={cellNumber}
                        />
                    )
                }

            </div>
        </div>

    )
}


type CellProps = {
    onClick(): void;
    cellState: CellState;
}


const Cell = memo((props: CellProps)=>{

    const {onClick, cellState} = props;


    console.log("box render");


    

    return(
        <div onClick={onClick} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            backgroundColor: "white"
        }}>

            <h1>
                {
                    cellState

                }
            </h1>



        </div>
    )
});