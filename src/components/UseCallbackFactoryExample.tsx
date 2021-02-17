import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useArrayDiff } from "powerhooks/useArrayDiff";
import { memo, useEffect, useState, useCallback } from "react";





/*export const UseCallbackFactoryExample = ()=>{

    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const {shape, setShape} = useNamedState<"crosse" | "circle", "shape">("shape", "crosse");

    useEffect(()=>{
        console.log("update");
    })

    const onClick = useCallback((n: number)=>{

        forceUpdate();
        console.log(n);

    },[])

   

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>useCallbackFactory</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridGap: "3px",
                backgroundColor: "black",
                width: "400px",
                border: "solid black 3px"
            }}>

                {
                    [0,1,2,3,4,5,6,7,8].map((cellNumber) => <Cell onClick={onClick} key={cellNumber} cellNumber={cellNumber}/>)
                }
            </div>
        </div>
    )
}

let renderCounts = [0,0,0,0,0,0,0,0,0];


type CellProps = {
    cellNumber: number;
    onClick: (cellNumber: number)=>void;
}

const Cell = memo((props: CellProps)=>{

    const {cellNumber, onClick} = props;

    const [, forceUpdate] = useReducer(x=>x+1, 0);

    


    useEffect(()=>{

        renderCounts[cellNumber]++;
    })

    /*const handleClick = useCallback(()=>{

        onClick(cellNumber)


    }, [onClick, cellNumber])


    return(
        <div onClick={() => onClick(cellNumber)} style={{
            backgroundColor: "white",
            height: "100px"
        }}>

                <p>
                    render count:
                    {
                        renderCounts[cellNumber]
                    }
                </p>
            
        </div>
    )
})
*/



type Props = {
  priority: number;
  task: string;
  onClick(action: "DELETE" | "EDIT"): void;
};


const Item = memo((props: Props) => {


  const { priority, task, onClick } = props;

  console.log(`render ${task}`);

  const onEditClick = useConstCallback(() => onClick("EDIT"));
  const onDeleteClick = useConstCallback(() => onClick("DELETE"));

  return (
    <div>
      <h1>Priority: {priority}: {task}</h1>
      <button onClick={onEditClick}>EDIT</button>
      <button onClick={onDeleteClick}>DELETE</button>
    </div>
  )

});

//====================


export const UseCallbackFactoryExample = () => {

  const [todos, setTodos] = useState<{ priority: number; task: string; }[]>(
    [
      { "priority": 8, "task": "Fuck my phather" },
      { "priority": 9, "task": "Drink water" }
    ]
  );

  useEffect(
    () => {

      setTimeout(
        () => {

          console.log("================About to add a item...")

          setTodos(todos => [...todos, { "priority": 3, "task": "Empty trash" }]);

        },
        5000
      );


    },
    []
  );

  useArrayDiff({
    "watchFor": "addition",
    "array": todos,
    "callback": ({ added }) => alert(`${added.join(", ")} was added to our todo list`)
  });


  /*
  const onClick = useCallback(
    (action: "DELETE" | "EDIT", task: string)=> {
      alert(`Click on "${task}", action requested: ${action}`)
    },
    []
  );
  */


  const onClickFactory = useCallbackFactory(
    (
      [task, priority]: [string, number],
      [action]: Parameters<Props["onClick"]>
    ) => alert(`Click on "${task}${priority}", action requested: ${action}`)
  );



  const onMyButtonClick = useConstCallback(() => alert(`I have currently ${todos.length} in my list`));


  return (
    <div>
      <MyButton onClick={onMyButtonClick} text="TODO COUNT" />

      <div>
        {
          todos.map(({ priority, task }) =>
            <Item
              key={task}
              priority={priority}
              task={task}
              //onClick={action=> onClick(action, task)}
              onClick={onClickFactory(task, priority)}
            />
          )
        }
      </div>

    </div>

  )
}

type MyButtonProps = {
  text: string;
  onClick(): void;
}

const MyButton = memo((props: MyButtonProps) => {

  const { onClick, text } = props;

  console.log("!!!!!!!! Render button !!!!!!! ");

  return (
    <button onClick={onClick}>{text}</button>
  );

});