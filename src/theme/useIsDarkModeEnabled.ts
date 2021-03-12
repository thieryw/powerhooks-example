import {createUseGlobalState} from "powerhooks/useGlobalState";


export const {useIsDarkModeEnabled} = createUseGlobalState(
    "isDarkModeEnabled",
    () => (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ),
    {"persistance": "localStorage"}
);