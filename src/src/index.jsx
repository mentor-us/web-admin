import ReactDOM from "react-dom/client";
import { Provider as ReduxStoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MentorUSAppProvider } from "context/index";

import "config";
import theme from "assets/theme";

import ensureEnvFileVar from "utils/ensureEnvVar";

import store from "redux/store";

import App from "./App";
import "./index.css";

// Ensure .env file variables
ensureEnvFileVar();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MentorUSAppProvider>
      <ReduxStoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ReduxStoreProvider>
    </MentorUSAppProvider>
  </BrowserRouter>
);
