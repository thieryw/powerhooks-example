import {useState, memo, useMemo} from "react";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {createUseClassNames, css, cx} from "useClassNames";


const {useClassNames} = createUseClassNames<{isGameWon: boolean;}>()(
    (...[, {isGameWon}])=>({
        "root": {               
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "& h2": {
                "color": "blue"
            }
        },

        "cellGrid": {
            "display": "grid",
            "gridTemplateColumns": "repeat(3, 1fr)",
            "backgroundColor": "black",
            "gridGap": "3px",
            "border": "solid black 3px",
            "width": "400px",
            "pointerEvents": isGameWon ? "none" : "unset"           
        }

    })

)


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


    const onClickFactory = useCallbackFactory(([cellNumber]: [number])=>{


        setCellStates((()=>{

            const newCellState = [...cellStates];
            newCellState[cellNumber] = currentPlayer;
            return newCellState;

        })())

        setPlayerPlaying(currentPlayer === "X" ? "O" : "X");

    });


    const {classNames} = useClassNames({"isGameWon": isGameWon});



    return(
        <div className={classNames.root}>
            <h2>
                {
                    isGameWon ? 
                        `game won by ${
                            currentPlayer === "O" ? "X" : "0"
                        }` 
                    : `Current shape : ${currentPlayer}`
                }
            </h2>

            <div className={classNames.cellGrid}>
                {
                    [0,1,2,3,4,5,6,7,8].map(cellNumber => 
                        <Cell 
                            onClick={onClickFactory(cellNumber)}
                            cellState={cellStates[cellNumber]}
                            key={cellNumber}
                            className={css({"height": 40})}
                        />
                    )
                }

            </div>
        </div>

    )
}



const {Cell} = (()=>{
    type Props = {
        onClick(): void;
        cellState: CellState;
        className?: string;
    }

    const {useClassNames} = createUseClassNames()(
        () => ({
            "root": {
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "height": 40,
                "backgroundColor": "white",
                "cursor": "pointer"
            }


        })
    )


    const Cell = memo((props: Props)=>{

        const {onClick, cellState, className} = props;

        const {classNames} = useClassNames({});


        console.log("box render");




        return(
            <div onClick={onClick} className={cx(classNames.root, className)}>

                <h1>
                    {
                        cellState

                    }
                </h1>



            </div>
        )
    });

    return {Cell};

})();

