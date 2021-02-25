import {useMemo} from "react";
import {createUseClassNames} from "useClassNames";
import {useConstCallback} from "powerhooks/useConstCallback";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useNamedState} from "powerhooks/useNamedState";
import {TaskComponent} from "./Task";

export type Task = {
    description: string;
    isSelected: boolean;
    isInEditingState: boolean;
    isTaskValidated: boolean;
    id: string;
}

function generateTaskId(){

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const idLength = 15;
    let randomString = "";
    for(let i=0; i<idLength; i++){
        const charIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(charIndex, charIndex+1);
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
            "id": generateTaskId(),
            "isInEditingMod": false,
            "isTaskValidated": false

        },
        {
            "description": "piano practice",
            "isSelected": false,
            "id": generateTaskId(),
            "isInEditingMod": false,
            "isTaskValidated": false


        }

    ]);

    const indexOfTaskInEditingMod: number | undefined = useMemo(
        () => {
            const out = tasks.findIndex(task => task.isInEditingMod);

            if(out === -1){
                return undefined;
            }

            return out;

        }
    , [tasks])

    const {selectedTaskIds, setSelectedTaskIds} = 
        useNamedState<string[], "selectedTaskIds">("selectedTaskIds", []);

        

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
                "id": generateTaskId(),
                "isInEditingMod": false,
                "isTaskValidated": false
            }),
            [...tasks]
        ));

        setTextInput("");

    });


    const onClickFactory = useCallbackFactory(([taskIndex]: [number])=>{

        if(tasks[taskIndex].isInEditingMod){
            return;
        }

        if(indexOfTaskInEditingMod !== undefined){

            tasks[indexOfTaskInEditingMod].isInEditingMod = false;

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

    const onDoubleClickFactory = useCallbackFactory(([taskIndex]: [number])=>{

        setSelectedTaskIds([tasks[taskIndex].id]);

        setTasks((()=>{
            if(indexOfTaskInEditingMod !== undefined){
                tasks[indexOfTaskInEditingMod].isInEditingMod = false;
            }

            tasks.forEach(task => {
                if(task.isSelected){
                    task.isSelected = false;
                }
            })

            tasks[taskIndex].isInEditingMod = true;
            tasks[taskIndex].isSelected = true;
        

            return [...tasks];
        })());



    })

    const deleteSelectedTasks = useConstCallback(()=>{


        setTasks((
            selectedTaskIds.forEach(selectedTaskId => {

                tasks.splice(tasks.findIndex(
                    task => task.id === selectedTaskId),1);

            }),
            [...tasks]
        ));

        setSelectedTaskIds([]);
    });

    const selectOrClearAllTasksFactory = 
        useCallbackFactory(([mode]: ["select" | "clear"])=>{

            if(indexOfTaskInEditingMod !== undefined){
                tasks[indexOfTaskInEditingMod].isInEditingMod = false;
            }



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
        }
    );

    const setSelectedTaskToEditionMod = useConstCallback(()=>{


        if(selectedTaskIds.length !== 1){
            return;
        }

        
        setTasks((
            tasks[
                tasks.findIndex(task => task.id === selectedTaskIds[0])
            ].isInEditingMod = true,
            [...tasks]
        ));
        
    });

    const editTaskFactory = useCallbackFactory(
        (
            [indexOfTaskBeingEdited]: [number | undefined],
            [args]: [{
                e: React.FormEvent<HTMLFormElement>;
                textInput: string;
            }]
        )=>{

            const {e, textInput} = args;

            e.preventDefault();
            if(textInput === "" || indexOfTaskBeingEdited === undefined){
                return;
            }

            setTasks((
                tasks[indexOfTaskBeingEdited].description = textInput,
                tasks[indexOfTaskBeingEdited].isInEditingMod = false,
                [...tasks]
            ));

        
        }
    )


    const toggleTaskValidation = useConstCallback(()=>{

        if(indexOfTaskInEditingMod !== undefined){
            return;
        };
        
        setTasks((
            selectedTaskIds.forEach(selectedTaskId => {

                const index = tasks.findIndex(task => task.id === selectedTaskId);

                tasks[index].isTaskValidated = !tasks[index].isTaskValidated;


            }),
            [...tasks]
        ))

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
                    onClick={selectOrClearAllTasksFactory("select")}
                    disabled={tasks.length === 0}
                >
                    Select All
                </button>
                <button 
                    onClick={selectOrClearAllTasksFactory("clear")}
                    disabled={selectedTaskIds.length === 0}
                >
                    {`Clear Selected Task${selectedTaskIds.length > 1 ? "s" : ""}`}
                </button>
                <button
                    onClick={setSelectedTaskToEditionMod}
                    disabled={selectedTaskIds.length !== 1 || indexOfTaskInEditingMod !== undefined}
                >
                    Edit Task
                </button>
                <button
                    onClick={toggleTaskValidation}
                    disabled={selectedTaskIds.length < 1 || indexOfTaskInEditingMod !== undefined}

                >
                    Toggle Task Validation
                </button>
            </div>


            <ul>
                {
                    tasks.map((task, index) => 
                        <TaskComponent
                            key={task.id}
                            description={task.description}
                            onClick={onClickFactory(index)}
                            onDoubleClick={onDoubleClickFactory(index)}
                            isSelected={tasks[index].isSelected}
                            isInEditingMod={tasks[index].isInEditingMod}
                            editTask={editTaskFactory(index)}
                            isTaskValidated={task.isTaskValidated}
                        />).reverse()

                }

                

            </ul>
        </div>
    )
}


