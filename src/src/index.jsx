import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxStoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MentorUSAppProvider } from "context/index";
import store from "features/store";

import "config";
import theme from "assets/theme";

import ensureEnvFileVar from "utils/ensureEnvVar";

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
          <Toaster position="top-center" />
        </ThemeProvider>
      </ReduxStoreProvider>
    </MentorUSAppProvider>
  </BrowserRouter>
);
