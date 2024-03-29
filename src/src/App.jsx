/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  allCategoriesSelector,
  getCategoryPermissionsSelector
} from "features/groupsCategory/selector";
import { getAllCategory, getPermissions } from "features/groupsCategory/slice";

import { privateRoutes, publicRoutes } from "routes";
import { isAuthenticated } from "utils";

import ProtectedAuth from "pages/Auth/ProtectedAuth";

import "./index.css";

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
        element={<ProtectedAuth>{route.element}</ProtectedAuth>}
        key={route.path}
      />
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
    <Routes>
      {publicRoutesRender(publicRoutes)}
      {privateRoutesRender(privateRoutes)}
      {/* {getRoutes(routes)} */}
      <Route path="/" element={<Navigate to="/admin/groups" replace />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default App;
