import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import ContextDialog from "pages/WebUser/components/SuggestDialog/Context";

// MentorUs React app context
export const MentorUsContext = createContext(null);
export const MentorUsDispatchContext = createContext(null);

// Setting custom name for the context which is visible on react dev tools
MentorUsContext.displayName = "MentorUsContext";
MentorUsDispatchContext.displayName = "MentorUsDispatchContext";

// App initial state
const initialState = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: true,
  sidenavColor: "info",
  transparentNavbar: true,
  fixedNavbar: false,
  /**
   * @deprecated since version 0.1.1
   */
  openConfigurator: false,
  darkMode: false,
  loading: false,
  dialogOpen: false,
  dialogContent: null
};

// App reducer
function appReducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.payload };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.payload };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.payload };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.payload };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.payload };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.payload };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.payload };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.payload };
    }
    case "LOADING": {
      return { ...state, loading: action.payload };
    }
    case "DIALOG_OPEN": {
      return { ...state, dialogOpen: action.payload.open, dialogContent: action.payload.content };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// App context provider
export function MentorUSAppProvider({ children }) {
  const [states, dispatch] = useReducer(appReducer, initialState);

  return (
    <MentorUsContext.Provider value={states}>
      <MentorUsDispatchContext.Provider value={dispatch}>
        {children}
        <ContextDialog />
      </MentorUsDispatchContext.Provider>
    </MentorUsContext.Provider>
  );
}

// Typechecking props for the MentorUSAppProvider
MentorUSAppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// App actions list
export const setMiniSidenav = (dispatch, payload) => dispatch({ type: "MINI_SIDENAV", payload });
export const setTransparentSidenav = (dispatch, payload) =>
  dispatch({ type: "TRANSPARENT_SIDENAV", payload });
export const setWhiteSidenav = (dispatch, payload) => dispatch({ type: "WHITE_SIDENAV", payload });
export const setSidenavColor = (dispatch, payload) => dispatch({ type: "SIDENAV_COLOR", payload });
export const setTransparentNavbar = (dispatch, payload) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", payload });
export const setFixedNavbar = (dispatch, payload) => dispatch({ type: "FIXED_NAVBAR", payload });
/**
 * @deprecated since version 0.1.1
 */
export const setOpenConfigurator = (dispatch, payload) =>
  dispatch({ type: "OPEN_CONFIGURATOR", payload });
export const setDarkMode = (dispatch, payload) => dispatch({ type: "DARKMODE", payload });
export const setLoading = (dispatch, payload) => dispatch({ type: "LOADING", payload });
export const setDialogOpen = (dispatch, payload) => dispatch({ type: "DIALOG_OPEN", payload });
