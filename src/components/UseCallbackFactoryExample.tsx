import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useState, memo} from "react";


type Task = {
    description: string;
    isSelected: boolean;

}

export const UseCallbackFactoryExample = ()=>{

    const [tasks, setTasks] = useState<Task[]>([
        {
            "description": "go to the gym",
            "isSelected": false
        },
        {
            "description": "feed the cat",
            "isSelected": false
        },
        {
            "description": "clean the house",
            "isSelected": false
        }

    ]);

    const onClickFactory = useCallbackFactory(
        ([taskIndex]: [number])=>{

            tasks[taskIndex].isSelected = !tasks[taskIndex].isSelected;

            setTasks([...tasks]);
        }
    )


    return (
        <>
            <h1>useCallbackFactory example</h1>
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
        </>
    )
}


const TaskComponent = memo((
    props: Task &
    {
        onClick(): void;
    }
)=>{

    const {description, isSelected, onClick} = props;

    console.log("render " + description);

    return(
        <div onClick={onClick} style={{
            "backgroundColor": isSelected ?  "black" : "lightblue",
            "color": isSelected ? "white" : "black"
        }}>
            <p>{description}</p>
        </div>
    )

})
