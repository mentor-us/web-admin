import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";

import "config";
import { MentorUSAppProvider } from "context/index";
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
        <App />
      </ReduxStoreProvider>
    </MentorUSAppProvider>
  </BrowserRouter>
);
