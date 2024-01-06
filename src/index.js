import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";
import { store } from "./redux/store";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d63741",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d63741",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
