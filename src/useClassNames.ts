
import { createUseClassNamesFactory } from "jss-emotion";
export { css, cx, keyframes } from "jss-emotion";

const theme = {
    "primaryColor": "blue"
} as const;

function useTheme(){
    return theme;
}

export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });