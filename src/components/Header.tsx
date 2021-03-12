import IconButton from "@material-ui/core/IconButton";
import DarkModIcon from "@material-ui/icons/Brightness4";
import LightModIcon from "@material-ui/icons/Brightness7";
import {useIsDarkModeEnabled} from "../theme/useIsDarkModeEnabled";
import {useCallback} from "react";
import {createUseClassNames} from "theme/useClassNames";

const {useClassNames} = createUseClassNames()(
    (theme)=> ({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "borderBottom": `solid ${theme.palette.type === "dark" ? "white" : "black"} 1px`,
            "width": "100%"
        }

    })
)

export const Header = ()=>{

    const {isDarkModeEnabled, setIsDarkModeEnabled} = useIsDarkModeEnabled();


    const toggleDarkMode = useCallback(
        ()=> setIsDarkModeEnabled(!isDarkModeEnabled)
    ,[isDarkModeEnabled, setIsDarkModeEnabled])

    const {classNames} = useClassNames({});

    return(
        <header className={classNames.root}>
            <IconButton onClick={toggleDarkMode}>
                {
                    isDarkModeEnabled ? 
                    <DarkModIcon /> : 
                    <LightModIcon />

                }

            </IconButton>
        </header>
    )
}