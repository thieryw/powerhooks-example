import {useClickOut} from "../customHooks/useClickOut";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import { useRef, memo} from "react";
import React, {useState} from "react";
import {css} from "jss-emotion";
import {useConstCallback} from "powerhooks";


type Task = {
    description: string;
    isSelected: boolean;
}

export const UseClickOutExample = ()=>{

    const [tasks, setTasks] = useState<(Task)[]>(
        [
            {
                "description": "clean the house",
                "isSelected": false
            },
            {
                "description": "piano practice",
                "isSelected": false
            },
            {
                "description": "drink a glass of water",
                "isSelected": false
            }
        ]
    )


    const buttonRef = useRef<HTMLButtonElement>(null);
    

    const onClickFactory = useCallbackFactory(([taskIndex]: [number])=>{

        tasks[taskIndex].isSelected = !tasks[taskIndex].isSelected;
        setTasks([...tasks]);
        
    });

    const selectAll = useConstCallback(()=>{

        setTasks(tasks.map(task => {
            task.isSelected = true;
            return task;
        }));

    });

    useClickOut({
        "refs": [buttonRef],
        "onClickOut": ()=>{
            setTasks(tasks.map(task => {
                task.isSelected = false;
                return task;
            }));
        }
    })

    return (
        <div className={css({
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center"
        })} >
            <h1>UseClickOut example</h1>

            <button 
                className={css({
                    "width": 100,
                    "marginBottom": 30
                })}
                onClick={selectAll}
                ref={buttonRef}
            >
                Select All
            </button>

            <div 
                className={css({
                    "border": "solid black 1px",
                    "width": 400,
                })}
            >
                {
                    tasks.map(
                        (task, index) => 
                        <TaskComponent 
                            description={task.description}
                            isSelected={task.isSelected}
                            onClick={onClickFactory(index)}
                            key={JSON.stringify(task.description + index)}
                        />
                    )
                }
            </div>

        </div>
    )

}


const {TaskComponent} = (()=>{
    type Props = Task & {
        onClick(): void;
    }

    const TaskComponent = memo((props: Props)=>{

        console.log("render");

        const {isSelected, description, onClick} = props;

        return(
            <p onClick={onClick} className={css({
                "backgroundColor": isSelected ? "black" : "lightblue",
                "color": isSelected ? "white" : "black",
                "padding": 10
            })}>
                {
                    description
                }
            </p>
        )
    });

    return { TaskComponent }
        
})();