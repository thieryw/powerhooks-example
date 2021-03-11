import {useArrayDiff} from "powerhooks/useArrayDiff";
import {useState, useCallback} from "react";


export const UseArrayDiffExample = ()=>{

    const [textInput, setTextInput] = useState("");

    const [tasks, setTasks] = useState<string[]>([
        "go to the grocery store",
        "clean the house",
        "stroke the cat"
    ]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{

        setTextInput(e.target.value);

    },[]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{

        if(textInput === "") return;

        e.preventDefault();


        setTasks(tasks => [...tasks, textInput]);

        setTextInput("");


    },[textInput]);


    useArrayDiff({
        "array": tasks,
        "watchFor": "addition",
        "callback": ({added})=>{
            alert(`<${added}> has been added to your list`);
        }

    });


    return (
        <div>
            <h1>useArrayDiff Example</h1>

            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={textInput} type="text"/>
                <input type="submit"/>
            </form>

            {
                tasks.map(
                    (task, index) => 
                    <p key={JSON.stringify(task + index)}>{task}</p>
                ).reverse()
            }


        </div>
    )

}


