import {createTheme} from "./createTheme";
import {useMemo} from "react";
import {ThemeProvider as MuiThemeProvider, StylesProvider} from "@material-ui/core/styles";
import {useIsDarkModeEnabled} from "./useIsDarkModeEnabled";
import CssBaseLine from "@material-ui/core/CssBaseline";


export function ThemeProvider(props: {
    children: React.ReactNode;
}){

    const {children} = props;
    const {isDarkModeEnabled} = useIsDarkModeEnabled();

    const {theme} = useMemo(
        () => createTheme({isDarkModeEnabled})
    ,[isDarkModeEnabled])


    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseLine>
                <StylesProvider injectFirst>
                    {children}
                </StylesProvider>
            </CssBaseLine>
        </MuiThemeProvider>
    )
    
}