import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import theme from "assets/theme";

import routes from "routes";

import {
  allCategoriesSelector,
  getCategoryPermissionsSelector
} from "redux/groupsCategory/selector";
import { getAllCategory, getPermissions } from "redux/groupsCategory/slice";

import { getCurrentUserSelector } from "redux/currentUser/selector";
import { isExpiredToken } from "utils";

import { getCurrentUserSlice } from "redux/currentUser/slice";
import "./index.css";

function App() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categories = useSelector(allCategoriesSelector);
  const currentUser = useSelector(getCurrentUserSelector);
  const permissions = useSelector(getCategoryPermissionsSelector);
  const token = localStorage.getItem("access_token");

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  /// --------------------------------------------------------
  /// --------------------- Các hàm event --------------------

  // Scroll về đầu trang khi chuyển route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Lấy các thông tin tổng
  useEffect(() => {
    // dispatch(getAllUser());
    if (token && categories.length === 0 && !isExpiredToken(token)) {
      dispatch(getAllCategory());
    }
  }, [token]);

  useEffect(() => {
    if (token && Object.values(currentUser).length === 0 && !isExpiredToken(token)) {
      dispatch(getCurrentUserSlice());
    }
  }, [token]);

  useEffect(() => {
    if (token && permissions.length === 0 && !isExpiredToken(token)) {
      dispatch(getPermissions());
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route
          path="/"
          element={
            isExpiredToken(token) ? (
              <Navigate to="/sign-in" replace />
            ) : (
              <Navigate to="/groups" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
