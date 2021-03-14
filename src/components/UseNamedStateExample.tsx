import {useNamedState} from "powerhooks/useNamedState";
import {useCallback} from "react";




export const UseNamedStateExample = ()=>{


    const {count, setCount} = useNamedState("count", 0);

    const clickHandler = useCallback(()=>{
        if(count > 9){
            setCount(0);
            return;
        }

        setCount(count + 1);


    },[setCount, count])


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>useNamedState</h1>

            <button style={{
                width: "200px",
                backgroundColor: "blue",
                color: "white"
            }} onClick={clickHandler}>{count}</button>

        </div>
    )
}