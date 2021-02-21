import {memo} from "react";
import {createUseClassNames} from "useClassNames";
import {useConstCallback} from "powerhooks/useConstCallback";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useNamedState} from "powerhooks/useNamedState";

type Task = {
    description: string;
    isSelected: boolean;
    id: string;
}

function generateTaskId(){

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const idLength = 15;
    let randomString = "";
    for(let i=0; i<idLength; i++){
        const char = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(char, char+1);
    };

    return randomString;

}

const {useClassNames} = createUseClassNames()(
    ()=> ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "& ul": {
                "paddingInline": 0,
                "width": 400
            }

        },
        "buttonWrapper": {
            "marginTop": 20,
            "backgroundColor": "darkgray",
            "& button": {
                "margin": 10
            }
            
        }
        
    })
)




export const TodoList = ()=>{

    console.log("render general");

    const {setTextInput, textInput} = 
        useNamedState<string, "textInput">("textInput", "");


    const {setTasks, tasks} = useNamedState<Task[], "tasks">("tasks", [
        {
            "description": "make a cake",
            "isSelected": false,
            "id": generateTaskId()
        },
        {
            "description": "piano practice",
            "isSelected": false,
            "id": generateTaskId()

        }

    ]);

    const {selectedTaskIds, setSelectedTaskIds} = 
        useNamedState<string[], "selectedTaskIds">("selectedTaskIds", []);

    const {indexOfTaskBeingEdited, setIndexOfTaskBeingEdited} = useNamedState<
        number | undefined, "indexOfTaskBeingEdited"
    >("indexOfTaskBeingEdited", undefined);

    

    const onChange = useConstCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setTextInput(e.target.value)
    })

    const onSubmit = useConstCallback((e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        if(textInput === ""){
            return;
        }

        setTasks((
            tasks.push({
                "description": textInput,
                "isSelected": false,
                "id": generateTaskId()
            }),
            [...tasks]
        ));

        setTextInput("");

    });


    const onClickFactory = useCallbackFactory(([taskIndex]: [number])=>{

        if(taskIndex === indexOfTaskBeingEdited){
            return;
        }

        setTasks((
            tasks[taskIndex].isSelected = !tasks[taskIndex].isSelected,
            [...tasks]
        ));

        setSelectedTaskIds((()=>{

            const out: string[] = [];

            tasks.forEach(task =>{
                if(!task.isSelected){
                    return;
                }

                out.push(task.id);
            })

            return out;
        })());

    });

    const deleteSelectedTasks = useConstCallback(()=>{


        setTasks((
            selectedTaskIds.forEach(selectedTaskId => {

                tasks.splice(tasks.findIndex(
                    task => task.id === selectedTaskId),1);

            }),
            [...tasks]
        ));

        setSelectedTaskIds([]);
        setIndexOfTaskBeingEdited(undefined);
    });

    const selectOrClearAllFactory = 
        useCallbackFactory(([mode]: ["select" | "clear"])=>{

        switch(mode){
            case "clear" : (()=>{
                tasks.forEach(task =>{
                    if(!task.isSelected){
                        return;
                    }
                    task.isSelected = false;
                });
            })(); break;

            case "select" : (()=>{
                tasks.forEach(task =>{
                    if(task.isSelected){
                        return;
                    }

                    task.isSelected = true;
                    selectedTaskIds.push(task.id);
                })
            })()
        }

        setTasks([...tasks]);
        setSelectedTaskIds(mode === "clear" ? [] : [...selectedTaskIds]);
        setIndexOfTaskBeingEdited(undefined);
    });

    const editTask = useConstCallback(()=>{

        console.assert(selectedTaskIds.length === 1);
        setIndexOfTaskBeingEdited(
            tasks.findIndex(task => task.id === selectedTaskIds[0])
        );

        
    });



    const {classNames} = useClassNames({});


    return (
        <div className={classNames.root}>
            <h2>TodoList example</h2>
            <form onSubmit={onSubmit}>
                <input value={textInput} onChange={onChange} type="text"/>

                <input type="submit"/>
            </form>

            <div className={classNames.buttonWrapper}>
                <button 
                    onClick={deleteSelectedTasks}
                    disabled={selectedTaskIds.length === 0}


                >
                    {`Delete Task${selectedTaskIds.length > 1 ? "s" : ""}`}
                </button>
                <button 
                    onClick={selectOrClearAllFactory("select")}
                    disabled={tasks.length === 0}
                >
                    Select All
                </button>
                <button 
                    onClick={selectOrClearAllFactory("clear")}
                    disabled={selectedTaskIds.length === 0}
                >
                    Clear Selected Tasks
                </button>
                <button
                    onClick={editTask}
                    disabled={selectedTaskIds.length !== 1}
                >
                    Edit Task
                </button>
            </div>


            <ul>
                {
                    tasks.map((task, index) => 
                        <TaskComponent
                            key={`${task}${index}`}
                            task={task}
                            onClick={onClickFactory(index)}
                            isSelected={tasks[index].isSelected}
                            isInEditingMod={indexOfTaskBeingEdited === index}
                        />).reverse()

                }

                

            </ul>
        </div>
    )
}


const {TaskComponent} = (()=>{

    const {useClassNames} = createUseClassNames<{isTaskSelected: boolean}>()(
        (...[, {isTaskSelected}])=>({
            "root": {
                "listStyle": "none",
                "backgroundColor": isTaskSelected ? "blue" : "lightblue",
                "color": isTaskSelected ? "white" : "unset",
                "marginBlock": 0,
                "wordBreak": "break-all",
                "padding": "10px 10px 10px 30px",
                "margin": 10

            }
        })
    )


    type Props = {
        task: Task;
        isSelected: boolean;
        isInEditingMod: boolean;
        onClick(): void;
    }

    const TaskComponent = memo((props: Props)=>{
        console.log("render task");

        
        const {task, onClick, isSelected, isInEditingMod} = props;

       

       
        
        const {classNames} = useClassNames({"isTaskSelected": isSelected});
        return (
            <li 
                onClick={onClick} 
                className={classNames.root}
            >
                {isInEditingMod ? <form >
                    <input type="text"/>
                </form> : task.description}
            </li>
        )

    });

    return {TaskComponent};


})()
