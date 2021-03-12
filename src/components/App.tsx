import {Header} from "./Header";
import {createUseClassNames} from "theme/useClassNames";

const {useClassNames} = createUseClassNames()(
    (theme)=>({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "textAlign": "center",

            "& p": {
                "width": "70%",
                "border": `solid ${theme.palette.type === "dark" ? "white" : "black"} 1px`,
                "padding": 20
            },

            "& h1": {
                "width": 600
            }


        }
    })
)

export const App = ()=>{



    const {classNames} = useClassNames({});


    return (
        <div className={classNames.root}>
            <Header/>

            <h1>An Implementation of a dark mode controller with the useGlobalState Power hook and Material-ui theme</h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Curabitur sollicitudin urna dictum purus condimentum, 
                vel varius est vestibulum. Curabitur posuere, nisl in 
                lobortis sodales, mauris nisi dapibus turpis, vitae cursus 
                tortor quam sit amet nunc. Maecenas mollis finibus arcu, non 
                fringilla massa bibendum a. Mauris at augue egestas, finibus 
                dui in, tincidunt quam. Donec arcu magna, laoreet eu molestie 
                nec, congue sed dolor. Vestibulum fringilla, est ac rutrum lobortis, 
                lectus lacus luctus dolor, eget malesuada turpis est ut odio. 
                Pellentesque posuere, magna vel venenatis facilisis, tellus ligula 
                ornare elit, at mattis lorem quam sed quam. Vestibulum viverra quam id 
                nibh aliquam rutrum. Nunc pulvinar iaculis sapien, commodo semper 
                velit semper eget. Mauris vitae metus vulputate, blandit eros eu, 
                facilisis metus. 
            </p>

        </div>
    )
}