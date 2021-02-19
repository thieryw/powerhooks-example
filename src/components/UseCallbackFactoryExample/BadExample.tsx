import {useState, useCallback, memo} from "react";


type GameState = {
    currentShape: "crosse" | "circle",
    currentCellStates: ("crosse" | "circle" | "unset")[];
    isGameWon: ()=> boolean;
}

const gameState: GameState = {
    "currentShape": "crosse",
    "currentCellStates": [
        "unset", "unset", "unset",
        "unset", "unset", "unset",
        "unset", "unset", "unset"
    ],
    "isGameWon": ()=>{

        const currentCellStates = gameState.currentCellStates;


        for(const n of [0,1,2]){
            if(currentCellStates[n] === currentCellStates[n + 3] &&
                currentCellStates[n] === currentCellStates[n + 6] &&
                currentCellStates[n] !== "unset"
            ){
                return true;

            }
        }

        for(const n of [0,3,6]){
            if(currentCellStates[n] === currentCellStates[n+1] &&
                currentCellStates[n] === currentCellStates[n+2] &&
                currentCellStates[n] !== "unset"
            ){
                return true;
            }
        }

        if(currentCellStates[0] === currentCellStates[4] &&
            currentCellStates[0] === currentCellStates[8] &&
            currentCellStates[0] !== "unset"
        ){
            return true;
        }

        if(currentCellStates[6] === currentCellStates[4] &&
            currentCellStates[6] === currentCellStates[2] &&
            currentCellStates[6] !== "unset"
        ){
            return true;
        }



        return false;

    }
}




export const TicTacTow = ()=>{

    const [isGameWon, setIsGameWon] = useState(false);
    const [currentShape, setCurrentShape] = 
        useState<"crosse" | "circle">(gameState.currentShape);

    console.log("grid render");

    const updateGame = useCallback((cellNumber: number)=>{

        gameState.currentCellStates[cellNumber] = gameState.currentShape;

        gameState.currentShape = gameState.currentShape === "crosse" ? 
            "circle" : "crosse";

        setCurrentShape(gameState.currentShape);

        setIsGameWon(gameState.isGameWon());

    }, []);



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
                            gameState.currentShape === "crosse" ? 
                                "O" : "X"
                        }` 
                    : `Current shape : ${currentShape === "crosse" ? "X" : "O"}`
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
                            updateGame={() => updateGame(cellNumber)} 
                            key={cellNumber}
                        />
                    )
                }

            </div>
        </div>

    )
}


type CellProps = {
    updateGame: ()=>void;
}


const Cell = memo((props: CellProps)=>{

    const {updateGame} = props;

    const [shape, setShape] = useState<"crosse" | "circle" | "unSet">("unSet")

    console.log("box render");

    const clickHandler = useCallback(()=>{

        if(shape !== "unSet"){
            return;
        }

        setShape(gameState.currentShape);



        updateGame();


    }, [setShape, updateGame, shape]);

    return(
        <div onClick={clickHandler} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            backgroundColor: "white"
        }}>

            <h1>
                {
                    (()=>{
                        switch(shape){
                            case "circle" : return "O";
                            case "crosse" : return "X";
                            default : return "";
                        }
                    })()

                }
            </h1>



        </div>
    )
});