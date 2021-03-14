import {useMemo, useRef} from "react";
import {createUseClassNames} from "theme/useClassNames";
import {useConstCallback} from "powerhooks/useConstCallback";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useNamedState} from "powerhooks/useNamedState";
import {TaskComponent} from "./Task";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useClickOut} from "customHooks/useClickOut";

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
            },

        },
        "buttonWrapper": {
            "marginTop": 20,
            "& button": {
                "margin": 10
            }
            
        },
        "list": {
            "border": "solid black 1px",
            "padding": "0 10px 0 10px",
            "& li": {
                "marginLeft":0
            }
        }
        
    })
)




export const TodoList = ()=>{

    console.log("render general");

    const {setTextInput, textInput} = useNamedState("textInput", "");


    const listRef = useRef<HTMLUListElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);


    const {setTasks, tasks} = useNamedState<Task[], "tasks">("tasks", [
        {
            "description": "clean the house",
            "isSelected": false,
            "id": generateTaskId(),
            "isInEditingState": false,
            "isTaskValidated": false

        },
        {
            "description": "piano practice",
            "isSelected": false,
            "id": generateTaskId(),
            "isInEditingState": false,
            "isTaskValidated": false


        }

    ]);

    const indexOfTaskInEditingMod: number | undefined = useMemo(
        () => {
            const out = tasks.findIndex(task => task.isInEditingState);

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
                "isInEditingState": false,
                "isTaskValidated": false
            }),
            [...tasks]
        ));

        setTextInput("");

    });


    const onClickFactory = useCallbackFactory(([taskIndex]: [number])=>{

        if(tasks[taskIndex].isInEditingState){
            return;
        }

        if(indexOfTaskInEditingMod !== undefined){

            tasks[indexOfTaskInEditingMod].isInEditingState = false;

        }

        setTasks((
            tasks[taskIndex].isSelected = !tasks[taskIndex].isSelected,
            [...tasks]
        ));

        setSelectedTaskIds((()=>{

            const out: string[] = [];

            tasks.filter(task => task.isSelected)
                .forEach(task => out.push(task.id));

            return out;
        })());

    });

    const onDoubleClickFactory = useCallbackFactory(
        (
            [taskIndex]: [number]
        )=>{

        setSelectedTaskIds([tasks[taskIndex].id]);

        setTasks((()=>{
            if(indexOfTaskInEditingMod !== undefined){
                tasks[indexOfTaskInEditingMod].isInEditingState = false;
            }


            tasks.filter(task => task.isSelected)
                .forEach(task => task.isSelected = false);

            tasks[taskIndex].isInEditingState = true;
            tasks[taskIndex].isSelected = true;
        

            return [...tasks];
        })());



    })

    const deleteSelectedTasks = useConstCallback(()=>{
        

        setTasks(tasks.filter(task => !task.isSelected));

        setSelectedTaskIds([]);

    });

    const selectOrClearAllTasksFactory = 
        useCallbackFactory(([mode]: ["select" | "clear"])=>{

            if(indexOfTaskInEditingMod !== undefined){
                tasks[indexOfTaskInEditingMod].isInEditingState = false;
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

    const setSelectedTaskToEditionState = useConstCallback(()=>{


        if(selectedTaskIds.length !== 1){
            return;
        }

        
        setTasks((
            tasks[
                tasks.findIndex(task => task.id === selectedTaskIds[0])
            ].isInEditingState = true,
            [...tasks]
        ));
        
    });

    const onEditTaskFactory = useCallbackFactory(
        (
            [indexOfTaskBeingEdited]: [number | undefined],
            [args]: [{
                newDescription: string;
            }]
        )=>{

            const {newDescription} = args;

            if(newDescription === "" || indexOfTaskBeingEdited === undefined){
                return;
            }

            setTasks((
                tasks[indexOfTaskBeingEdited].description = newDescription,
                tasks[indexOfTaskBeingEdited].isInEditingState = false,
                [...tasks]
            ));

        
        }
    )


    const toggleTaskValidation = useConstCallback(()=>{

        if(indexOfTaskInEditingMod !== undefined){
            return;
        };

        setTasks((()=>{

            const newTasks = [...tasks];

            selectedTaskIds.map(selectedTaskId => 
                tasks.findIndex(tasks => tasks.id === selectedTaskId)
            ).forEach(
                index => newTasks[index].isTaskValidated = !newTasks[index].isTaskValidated
            );

            return[...newTasks];
        })())
        
    });


    useClickOut({
        "refs": [buttonsRef, listRef],
        "onClickOut": selectOrClearAllTasksFactory("clear")
    })




    const {classNames} = useClassNames({});


    return (
        <div className={classNames.root}>
            <h2>Todo List With Power Hooks</h2>
            <form onSubmit={onSubmit}>
                <TextField color="secondary" variant="outlined" value={textInput} onChange={onChange} type="text"/>

                <TextField color="secondary" variant="outlined" type="submit"/>
            </form>

            <div ref={buttonsRef} className={classNames.buttonWrapper}>
                <Button 
                    onClick={deleteSelectedTasks}
                    disabled={selectedTaskIds.length === 0}
                >
                    {`Delete Task${selectedTaskIds.length > 1 ? "s" : ""}`}
                </Button>
                <Button 
                    onClick={selectOrClearAllTasksFactory("select")}
                    disabled={tasks.length === 0}
                >
                    Select All
                </Button>
                <Button 
                    onClick={selectOrClearAllTasksFactory("clear")}
                    disabled={selectedTaskIds.length === 0}
                >
                    {`Clear Selected Task${selectedTaskIds.length > 1 ? "s" : ""}`}
                </Button>
                <Button
                    onClick={setSelectedTaskToEditionState}
                    disabled={selectedTaskIds.length !== 1 || indexOfTaskInEditingMod !== undefined}
                >
                    Edit Task
                </Button>
                <Button
                    onClick={toggleTaskValidation}
                    disabled={selectedTaskIds.length < 1 || indexOfTaskInEditingMod !== undefined}

                >
                    Toggle Task Validation
                </Button>
               
            </div>


            <ul ref={listRef} className={classNames.list}>
                {
                    tasks.map((task, index) => 
                        <TaskComponent
                            key={task.id}
                            description={task.description}
                            onClick={onClickFactory(index)}
                            onDoubleClick={onDoubleClickFactory(index)}
                            isSelected={tasks[index].isSelected}
                            isInEditingState={tasks[index].isInEditingState}
                            onEditTask={onEditTaskFactory(index)}
                            isTaskValidated={task.isTaskValidated}
                        />).reverse()

                }

                

            </ul>
        </div>
    )
}


