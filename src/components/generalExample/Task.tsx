import {Task} from "./TodoList";
import {memo, useEffect} from "react";
import {useNamedState} from "powerhooks/useNamedState";
import {useConstCallback} from "powerhooks/useConstCallback";
import {createUseClassNames} from "useClassNames";
import {useClick} from "powerhooks/useClick";

const {useClassNames} = createUseClassNames<{isTaskSelected: boolean; isTaskValidated: boolean}>()(
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
        editTask, 
        isSelected, 
        isInEditingState,
        isTaskValidated
    } = props;
    const {setTextInput, textInput} = 
        useNamedState<string, "textInput">("textInput", "");

    const onChange = useConstCallback(
        (e: React.ChangeEvent<HTMLInputElement>)=>
            setTextInput(e.target.value)
   )

    const onEditSubmit = useConstCallback(
        (e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            editTask({"newDescription": textInput})
            setTextInput("");
        }
    );

     useEffect(()=> {
        setTextInput("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isInEditingMod]);

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
                        />
                    </form> 
                    : 
                    description
            }
        </li>
    )

});


