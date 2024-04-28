import { Navigate, useLocation } from "react-router-dom";

import { ServerError } from "errors";

import { ErrorAlert } from "components/SweetAlert";
import { ROLE, ROUTE_URL } from "utils/constants";

function Auth() {
  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);

  // If token is existed, save it to local storage and redirect to groups page
  const tokenValue = urlSearchParams.get("token");
  const roles = urlSearchParams.get("roles");
  if (tokenValue) {
    localStorage.setItem("access_token", tokenValue);

    if (roles.includes(ROLE.SUPER_ADMIN) || roles.includes(ROLE.ADMIN)) {
      return <Navigate to={ROUTE_URL.GROUP_ROOT} replace />;
    }

    return <Navigate to={ROUTE_URL.CHAT_ROOT} replace />;
  }

  // If error occur on server, show error alert and redirect to sign in page
  const errorCodeValue = new URLSearchParams(search).get("error");
  const serverError = new ServerError(errorCodeValue);
  ErrorAlert(serverError.message);
  return <Navigate to={ROUTE_URL.SIGN_IN} replace />;
}

export default Auth;
