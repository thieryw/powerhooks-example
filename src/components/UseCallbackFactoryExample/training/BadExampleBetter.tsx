import { useState, useMemo, memo } from "react";
import { createUseClassNames, css, cx } from "useClassNames";

type CellState = "X" | "O" | "";

function getIsGameWon(cellStates: CellState[]): boolean {

    for (const n of [0, 1, 2]) {
        if (cellStates[n] === cellStates[n + 3] &&
            cellStates[n] === cellStates[n + 6] &&
            cellStates[n] !== ""
        ) {
            return true;

        }
    }

    for (const n of [0, 3, 6]) {
        if (cellStates[n] === cellStates[n + 1] &&
            cellStates[n] === cellStates[n + 2] &&
            cellStates[n] !== ""
        ) {
            return true;
        }
    }

    if (cellStates[0] === cellStates[4] &&
        cellStates[0] === cellStates[8] &&
        cellStates[0] !== ""
    ) {
        return true;
    }

    if (cellStates[6] === cellStates[4] &&
        cellStates[6] === cellStates[2] &&
        cellStates[6] !== ""
    ) {
        return true;
    }


    return false;

}

const { useClassNames } = createUseClassNames<{ isGameWon: boolean; }>()(
    (...[, {isGameWon}]) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center"
        },
        "ul": {
            "display": "grid",
            "gridTemplateColumns": "repeat(3, 1fr)",
            "gridGap": 3,
            "border": "solid black 3px",
            "width": 400,
            "pointerEvents": isGameWon ? "none" : "unset"
        }
    })
);

export const TicTacTow = memo(() => {

    const [playerTurn, setPlayerTurn] = useState<Exclude<CellState, "">>("X");

    const [cellStates, setCellStates] = useState<CellState[]>(() => [
        "", "", "",
        "", "", "",
        "", "", ""
    ]);

    const isGameWon = useMemo(
        () => getIsGameWon(cellStates),
        [cellStates]
    );

    const onCellClick = (cellIndex: number) => {


        setCellStates(
            cellStates.map(
                (cellState, index) =>
                    index === cellIndex ? playerTurn : cellState
            )
        );
        setPlayerTurn((() => {
            switch (playerTurn) {
                case "O": return "X";
                case "X": return "O";
            }
        })());

    };

    const { classNames } = useClassNames({ isGameWon });

    return (
        <div className={classNames.root}>
            <h2 className={css({ "color": "blue" })}>
                {
                    isGameWon ?
                        `game won by ${playerTurn}` :
                        `Player's turn: ${playerTurn}`
                }
            </h2>

            <div className={classNames.ul}>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(cellIndex =>
                        <Cell
                            className={css({ "height": 40 })}
                            key={cellIndex}
                            cellState={cellStates[cellIndex]}
                            onClick={() => onCellClick(cellIndex)}
                        />
                    )
                }

            </div>
        </div>

    )
});

const { Cell } = (() => {

    type Props = {
        cellState: CellState;
        onClick(): void;
        className?: string;
    };

    const { useClassNames } = createUseClassNames()(
        () => ({
            "root": {
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "backgroundColor": "white"
            }
        })
    );

    const Cell = memo((props: Props) => {

        const { onClick, cellState, className } = props;

        const { classNames } = useClassNames({});

        return (
            <div
                onClick={onClick}
                className={cx(classNames.root, className)}
            >

                <h1> {cellState} </h1>



            </div>
        )
    });

    return { Cell };

})();
