import { PaletteMode, Direction } from "@mui/material";
import { blue, deepOrange, grey, pink, red } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode, direction: Direction) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for dark mode
          primary: {
            main: blue[700],
            contrastText: blue[200],
            dark: blue[900],
            light: blue[300],
          },
          secondary: {
            main: red[700],
            contrastText: red[200],
            dark: red[900],
            light: red[300],
          },
          divider: grey[400],
          background: {
            // default: white[900],
            // paper: grey[900],
          },
          text: {
            primary: grey[800],
            secondary: grey[500],
            disabled: grey[500],
          },
          direction,
        }
      : {
          // palette values for dark mode
          primary: {
            main: deepOrange[700],
            contrastText: deepOrange[200],
            dark: deepOrange[900],
            light: deepOrange[300],
          },
          secondary: {
            main: pink[700],
            contrastText: pink[200],
            dark: pink[900],
            light: pink[300],
          },
          divider: grey[800],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: "#ffffff",
            secondary: grey[300],
          },
          direction,
        }),
  },
});
