import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "LOADING": {
      return { ...state, loading: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    layout: "dashboard",
    darkMode: false,
    loading: false
  };

  const [controller, dispatchContext] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatchContext], [controller, dispatchContext]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Context module functions
const setMiniSidenav = (dispatchContext, value) => dispatchContext({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatchContext, value) =>
  dispatchContext({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatchContext, value) =>
  dispatchContext({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatchContext, value) =>
  dispatchContext({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatchContext, value) =>
  dispatchContext({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatchContext, value) => dispatchContext({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatchContext, value) =>
  dispatchContext({ type: "OPEN_CONFIGURATOR", value });
const setLayout = (dispatchContext, value) => dispatchContext({ type: "LAYOUT", value });
const setDarkMode = (dispatchContext, value) => dispatchContext({ type: "DARKMODE", value });
const setLoading = (dispatchContext, value) => dispatchContext({ type: "LOADING", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setLayout,
  setDarkMode,
  setLoading
};
