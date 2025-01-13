import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none",
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 6px 10px 0px rgba(0,0,0,0.14)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 6px 10px 0px rgba(0,0,0,0.14)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 6px 10px 0px rgba(0,0,0,0.14)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)'], // Добавлено значение для shadows[1]
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: "#7f42e1",
    },
    background: {
      default: "#121212", // Background color for the entire application
      paper: "#282828",   // Background color for paper surfaces, such as cards
    },
    text: {
      primary: "#FFFFFF", // Primary text color
      secondary: "#B0B0B0", // Secondary text color
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
