import {Task} from "./TodoList";
import {memo, useEffect, useRef} from "react";
import {useNamedState} from "powerhooks/useNamedState";
import {useConstCallback} from "powerhooks/useConstCallback";
import {createUseClassNames} from "useClassNames";
import {useClick} from "powerhooks/useClick";

/*const {useClassNames} = createUseClassNames<{isTaskSelected: boolean; isTaskValidated: boolean}>()(
    (...[, {isTaskSelected, isTaskValidated}])=>({
        "root": {
            "listStyle": "none",
            "backgroundColor": isTaskSelected ? "blue" : "lightblue",
            "color": isTaskSelected ? "white" : "unset",
            "marginBlock": 0,
            "wordBreak": "break-all",
            "padding": "10px 10px 10px 30px",
            "margin": 10,
            "textDecoration": `${isTaskValidated ? "line-through" : "unset"}`

        },
    })
)*/

const {useClassNames} = createUseClassNames<{isTaskSelected: boolean; isTaskValidated: boolean}>()(
    (theme, {isTaskSelected, isTaskValidated})=>({

        "root": {
            "listStyle": "none",
            "backgroundColor": isTaskSelected ? "blue" : "lightblue",
            "color": isTaskSelected ? "white" : "unset",
            "marginBlock": 0,
            "wordBreak": "break-all",
            "padding": "10px 10px 10px 30px",
            "margin": 10,
            "textDecoration": `${isTaskValidated ? "line-through" : "unset"}`


        }


    })
)


type Props = Omit<Task,"id"> & {
    onEditTask(
        params: {
           newDescription: string;
        }
    ): void;
    onClick(): void;
    onDoubleClick(): void;
}

export const TaskComponent = memo((props: Props)=>{
    console.log("render task");
    const {
        description, 
        onClick, 
        onDoubleClick, 
        onEditTask, 
        isSelected, 
        isInEditingState,
        isTaskValidated
    } = props;
    const {setTextInput, textInput} = 
        useNamedState<string, "textInput">("textInput", description);

    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = useConstCallback(
        (e: React.ChangeEvent<HTMLInputElement>)=>
            setTextInput(e.target.value)
   )

    const onEditSubmit = useConstCallback(
        (e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            onEditTask({"newDescription": textInput})
            setTextInput("");
        }
    );

    useEffect(()=> {
        setTextInput(description);
        if(!inputRef.current){
            return;
        }

        inputRef.current.select();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isInEditingState]);

     const {getOnMouseProps} = useClick({
        "doubleClickDelayMs": 200,
        "callback": ({type})=>{
            switch(type){
                case "down" : onClick(); break;
                case "double": onDoubleClick(); break;
            }

         }
    })
     const {classNames} = useClassNames({
         "isTaskSelected": isSelected, 
         isTaskValidated
     });
     return (
        <li                     
            {...getOnMouseProps()}
            className={classNames.root}
        >
            {
                 isInEditingState ? 
                     <form onSubmit={onEditSubmit} >
                        <input 
                            autoFocus 
                            onChange={onChange} 
                            value={textInput} 
                            type="text"
                            ref={inputRef}
                            
                        />
                    </form> 
                    : 
                    description
            }
        </li>
    )

});


