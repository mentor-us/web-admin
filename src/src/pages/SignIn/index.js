import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, isEmptyObject } from "utils";
import bgImage from "assets/images/hcmus.jpg";

import FullPageCenter from "layouts/components/FullPageCenter";
import FullBgImageLayout from "layouts/FullBgImageLayout";

import { getCurrentUserSelector } from "redux/currentUser/selector";
import { logout } from "redux/currentUser/slice";

import ConfirmLogout from "./components/ConfirmLogout";
import SignInCard from "./components/SignInCard";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate("/sign-in", { replace: true });

    // if (currentUser.provider === "google") {
    //   window.location.assign(
    //     `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${WEB_URL}sign-in`
    //   );
    // } else if (currentUser.provider === "azure") {
    //   window.location.assign(
    //     `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${WEB_URL}sign-in&client_id=`
    //   );
    // } else {
    //   navigate("/sign-in", { replace: true });
    // }
  };

  // eslint-disable-next-line no-unused-vars
  const renderBody = () => {
    const isAuth = isAuthenticated();

    // NOTE: Dua theo logic cu cua nhom truoc day
    // Co token va ko het han => da dang nhap
    if (isAuth) {
      // Da dang nhap, nhung chua co thong tin user => quay ve trang dang nhap
      if (isEmptyObject(currentUser)) {
        return <div />;
      }

      // Da dang nhap va co thong tin user => hien thi popup xac nhan logout
      return (
        <ConfirmLogout
          name={currentUser.name}
          onLogout={handleLogout}
          onCancel={() => navigate(-1)}
        />
      );
    }

    // Ko co hoac het han token => quay ve trang dang nhap
    return <SignInCard />;
  };

  return (
    <FullBgImageLayout image={bgImage}>
      <FullPageCenter>{renderBody()}</FullPageCenter>
    </FullBgImageLayout>
  );
}

export default SignIn;
