
import { createUseClassNamesFactory } from "./tools/@emotion_jss";
export { css, cx, keyframes } from "./tools/@emotion_jss";

const theme = {
    "primaryColor": "blue"
} as const;

function useTheme(){
    return theme;
}

export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });