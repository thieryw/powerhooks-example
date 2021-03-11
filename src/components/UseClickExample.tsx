import {useClick} from "powerhooks/useClick";
import {useState, useCallback, useRef, useEffect} from "react";


type Task = {
    description: string;
    isSelected: boolean;
    isInEditingState: boolean
}

export const UseClickExample = ()=>{


    const [task, setTask] = useState<Task>({
        "description": "stroke the cat",
        "isInEditingState": false,
        "isSelected": false
    });

    const [textInput, setTextInput] = useState(task.description);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!task.isInEditingState) return;
        if(!inputRef.current) return;

        inputRef.current.select();


    },[task.isInEditingState])

    
    const clickHandler = (type: "simple" | "double")=>{
        switch(type){
            case "double": task.isInEditingState = !task.isInEditingState; break;
            case "simple": !task.isInEditingState && 
                            (task.isSelected = !task.isSelected); 
                            break;
        }

        setTask({...task});
    };





    const {getOnMouseProps} = useClick({
        "doubleClickDelayMs": 200,
        "callback": ({type})=>{
            switch(type){
                case "double": clickHandler("double"); break;
                case "down": clickHandler("simple"); break;
            }

        }
    });

    const handleChange= useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setTextInput(e.target.value);
    },[])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        if(textInput === ""){
            task.isInEditingState = false;
            setTextInput(task.description);
            setTask({...task});
            return;
        }


        task.description = textInput;

        task.isInEditingState = false;

        setTask({...task});




    },[task, textInput]);




    return(
        <div>
            <h1>useClick example</h1>

            <div {...getOnMouseProps()} style={{
                "backgroundColor": task.isSelected ? "blue" : "lightblue",
                "color": task.isSelected ? "white" : "black"
            }}>
                {
                    task.isInEditingState ? 
                    <form onSubmit={handleSubmit}>
                        <input 
                            ref={inputRef}
                            onChange={handleChange}
                            type="text"
                            value={textInput}
                            autoFocus
                        />
                    </form> : 
                    <p>{task.description}</p>
                }
            </div>

        </div>
    )
}






