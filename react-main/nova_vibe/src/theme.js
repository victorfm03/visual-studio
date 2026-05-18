// theme.js o similar
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1976d2" },
          }
        : {
            primary: { main: "#90caf9" },
          }),
    },
  });
