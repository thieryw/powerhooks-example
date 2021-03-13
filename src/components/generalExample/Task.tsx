import {Task} from "./TodoList";
import {memo, useEffect, useRef} from "react";
import {useNamedState} from "powerhooks/useNamedState";
import {useConstCallback} from "powerhooks/useConstCallback";
import {createUseClassNames} from "theme/useClassNames";
import {useClick} from "powerhooks/useClick";
import ListItem from "@material-ui/core/ListItem";



const {useClassNames} = createUseClassNames<{isTaskSelected: boolean; isTaskValidated: boolean}>()(
    (theme, {isTaskSelected, isTaskValidated})=>({

        "root": {
            "listStyle": "none",
            "backgroundColor": (()=>{

                let out: any = "";
                
                switch(theme.palette.type){
                    case "dark" : out = isTaskSelected ? "#09134f" : theme.palette.background.paper; break;
                    case "light" : out = isTaskSelected ? "#eb742a" : theme.palette.background.paper; break;
                }

                return out;

            })(),
            "marginBlock": 0,
            "wordBreak": "break-all",
            "padding": "10px 10px 10px 30px",
            "textDecoration": `${isTaskValidated ? "line-through" : "unset"}`,
            "transition": "background-color 300ms, color 300ms",
            ":hover": {
                "cursor": "pointer",
                "backgroundColor": isTaskSelected ? "" : theme.palette.grey[300],
                "color": isTaskSelected ? "" : "black"
            }
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
                case "down": onClick(); break;
                case "double": onDoubleClick(); break;
            }

        }
    })
    

    const {classNames} = useClassNames({
        "isTaskSelected": isSelected, 
        isTaskValidated
    });
     return (
        <ListItem                     
            className={classNames.root}
            {...getOnMouseProps()}
        >
            {
                 isInEditingState ? 
                     <form onSubmit={onEditSubmit} >
                        <input 
                            autoFocus 
                            onChange={onChange} 
                            value={textInput} 
                            ref={inputRef}
                            type="text"
                            
                        />
                    </form> 
                    : 
                    description
            }
        </ListItem>
    )

});


