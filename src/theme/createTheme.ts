import type {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createMuiTheme} from "@material-ui/core/styles";




export function createTheme(params: {
    isDarkModeEnabled: boolean;
}): {theme: Theme}{

    const {isDarkModeEnabled} = params;

    const theme = createMuiTheme({
        "palette": {
            "type": isDarkModeEnabled ? "dark" : "light"
        }
    });

    return {theme};

}