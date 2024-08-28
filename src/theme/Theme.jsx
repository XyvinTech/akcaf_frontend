import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0070f3",
    },
    secondary: {
      main: "#1db954",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",

    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "22px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "18px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 600,
    },
    h6: {
      fontSize: "14px",
      fontWeight: 400,
    },
    h7: {
      fontSize: "12px",
      fontWeight: 400,
    },
    h8: {
      fontSize: "10px",
      fontWeight: 600,
    },
  },
});

export default theme;
