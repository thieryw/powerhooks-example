
import { createUseClassNamesFactory } from "tss-react";
import useTheme from "@material-ui/core/styles/useTheme";


export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });