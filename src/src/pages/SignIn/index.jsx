import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "features/myInfo/slice";

import { isAuthenticated, isEmptyObject } from "utils";
import bgImage from "assets/images/hcmus.jpg";

import FullPageCenter from "layouts/components/FullPageCenter";
import FullBgImageLayout from "layouts/FullBgImageLayout";
import useMyInfo from "hooks/useMyInfo";

import ConfirmLogout from "./components/ConfirmLogout";
import SignInCard from "./components/SignInCard";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myInfo = useMyInfo();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate("/admin/sign-in", { replace: true });

    // if (myInfo.provider === "google") {
    //   window.location.assign(
    //     `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${WEB_URL}sign-in`
    //   );
    // } else if (myInfo.provider === "azure") {
    //   window.location.assign(
    //     `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${WEB_URL}sign-in&client_id=`
    //   );
    // } else {
    //   navigate("/sign-in", { replace: true });
    // }
  };

  const renderBody = () => {
    const isAuth = isAuthenticated();

    // NOTE: Based on previous logic
    // Has token and not expired
    if (isAuth) {
      // Some error happens when get myInfo => return empty div
      if (isEmptyObject(myInfo)) {
        return <div />;
      }

      // Confirm logout when user logged in
      return (
        <ConfirmLogout name={myInfo.name} onLogout={handleLogout} onCancel={() => navigate(-1)} />
      );
    }

    // No token or expired => show sign in card
    return <SignInCard />;
  };

  return (
    <FullBgImageLayout image={bgImage}>
      <FullPageCenter>{renderBody()}</FullPageCenter>
    </FullBgImageLayout>
  );
}

export default SignIn;
