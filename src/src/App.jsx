/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  allCategoriesSelector,
  getCategoryPermissionsSelector
} from "features/groupsCategory/selector";
import { getAllCategory, getPermissions } from "features/groupsCategory/slice";
import { ConfirmProvider } from "material-ui-confirm";

import { privateRoutes, publicRoutes } from "routes";
import { isAuthenticated } from "utils";

import ProtectedAuth from "pages/Auth/ProtectedAuth";
import ContextDialog from "pages/WebUser/components/SuggestDialog/Context";

import "./index.css";
import "./App.css";

const publicRoutesRender = (publicRoutesList) =>
  publicRoutesList.map((route) => {
    return <Route exact path={route.path} element={route.element} key={route.path} />;
  });

const privateRoutesRender = (privateRoutesList) =>
  privateRoutesList.map((route) => {
    return (
      <Route
        exact
        path={route.path}
        element={<ProtectedAuth roles={route?.roles}>{route.element}</ProtectedAuth>}
        key={route.path}
      >
        {route?.children?.map((childRoute) => (
          <Route
            exact
            index={childRoute?.index}
            path={childRoute?.path}
            key={childRoute?.key}
            element={childRoute?.element}
          />
        ))}
      </Route>
    );
  });

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.path) {
      return <Route exact path={route.path} element={route.element} key={route.key} />;
    }

    return null;
  });

const queryClient = new QueryClient();

function App() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categories = useSelector(allCategoriesSelector);
  const permissions = useSelector(getCategoryPermissionsSelector);
  const token = localStorage.getItem("access_token");

  /// --------------------------------------------------------
  /// --------------------- Các hàm event --------------------

  // Scroll về đầu trang khi chuyển route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Lấy các thông tin tổng
  useEffect(() => {
    if (isAuthenticated()) {
      if (categories.length === 0) {
        dispatch(getAllCategory());
      }
      if (permissions.length === 0) {
        dispatch(getPermissions());
      }
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider
        defaultOptions={{
          title: "Bạn có chắc chắn không?",
          confirmationText: "Xác nhận",
          cancellationText: "Hủy"
        }}
      >
        <Routes>
          {publicRoutesRender(publicRoutes)}
          {privateRoutesRender(privateRoutes)}
          {/* {getRoutes(routes)} */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
        <ContextDialog />
      </ConfirmProvider>
    </QueryClientProvider>
  );
}

export default App;
