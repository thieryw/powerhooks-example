import DarkModeIcon from "@material-ui/icons/Brightness4";
import LightModeIcon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import {useIsDarkModeEnabled} from "theme/useIsDarkModeEnabled";
import {useCallback} from "react";
import {createUseClassNames} from "theme/useClassNames";

const {useClassNames} = createUseClassNames()(
    (theme)=>({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "width": "100vw",
            "borderBottom": `solid ${theme.palette.type === "dark" ? "white" : "black"} 1px`
            
        }
    })
)


export const Header = ()=>{

    const {isDarkModeEnabled, setIsDarkModeEnabled} = useIsDarkModeEnabled();

    const onClick = useCallback(()=>{
        setIsDarkModeEnabled(!isDarkModeEnabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isDarkModeEnabled]);


    const {classNames} = useClassNames({});

    return(
        <header className={classNames.root}>
            <IconButton onClick={onClick}>
                {
                    isDarkModeEnabled ? <DarkModeIcon/> : <LightModeIcon/>
                }
            </IconButton>
        </header>
    )

}