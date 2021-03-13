import {createTheme} from "./createTheme";
import {ThemeProvider as MuiThemeProvider, StylesProvider} from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import {useIsDarkModeEnabled} from "./useIsDarkModeEnabled";
import {useMemo} from "react";


export function ThemeProvider(
    props: {
        children: React.ReactNode;
    }
){
    const {children} = props;

    const {isDarkModeEnabled} = useIsDarkModeEnabled();

    const {theme} = useMemo(
        ()=> createTheme({
            isDarkModeEnabled
        })
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