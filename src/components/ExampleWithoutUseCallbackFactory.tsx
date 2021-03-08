import {useState, memo, useCallback} from "react";

type Task = {
    description: string;
    isInEditingState: boolean;
}

export const ExampleWithoutUseCallbackFactory = ()=>{

    const [tasks, setTasks] = useState<Task[]>(
        [
            {
                "description": "piano practice",
                "isInEditingState": false
            },
            {
                "description": "clean the house",
                "isInEditingState": false
            },
            {
                "description": "make a cake",
                "isInEditingState": false
            }
        ]
    );

    const onClick = useCallback(
        (params: {index: number})=>{
            const {index} = params;

            if(tasks[index].isInEditingState){
                return;
            }

            setTasks((()=>{
                const newTasks = [...tasks];

                newTasks[index].isInEditingState = true;

                return newTasks;
            })());
        }
    ,[tasks]);


    const onEditTask = useCallback(
        (
            params: {
                index: number;
                newDescription: string;
            }
        )=>{
            const {newDescription, index} = params;

            setTasks((()=>{

                const newTasks = [...tasks];

                newTasks[index].description = newDescription;
                newTasks[index].isInEditingState = false;

                return newTasks;

            })())

         

        }
    ,[tasks]);





    return(
        <div>
            <h1>Example without useCallbackFactory:</h1>
            <ul>
                {
                    tasks.map(
                        (task, index)=> 
                        <TaskComponent 
                            description={task.description} 
                            isInEditingState={task.isInEditingState} 
                            onClick={onClick}
                            onEditTask={onEditTask}
                            key={`${task.description}+${index}`}
                            index={index}
                        />
                    )
                }
            </ul>
        </div>
    )
}


const {TaskComponent} = (()=>{
    type Props = Task & {
        onClick(params: {
            index: number;
        }): void;
        onEditTask(
            params: {
                newDescription: string;
                index: number;
            }
        ): void;
        index: number;
    };

    const TaskComponent = memo((props: Props)=>{


        const {
            description, 
            isInEditingState, 
            onClick, 
            onEditTask,
            index
        } = props;


        const [textInput, setTextInput] = useState("");


        console.log(`render ${description}`);

        const onChange= useCallback(
            (e: React.ChangeEvent<HTMLInputElement>)=>{
                setTextInput(e.target.value);
            }
        ,[])

        const onSubmit = useCallback(
            (e: React.FormEvent<HTMLFormElement>)=>{
                if(textInput === ""){
                    return;
                }

                e.preventDefault();

                onEditTask({
                    "newDescription": textInput,
                    index
                });

                setTextInput("");
            }
        ,[onEditTask, textInput, index])

        const handleClick = useCallback(()=>{
            onClick({index})
        },[index, onClick])


        return (
            <li onClick={handleClick}>
                {
                    isInEditingState ? <form onSubmit={onSubmit}>
                        <input 
                            autoFocus 
                            onChange={onChange} 
                            value={textInput} 
                            type="text"
                        />
                    </form> : description
                }
            </li>
        )
    });

    return {TaskComponent};
})()