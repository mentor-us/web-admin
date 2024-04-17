import { Navigate, useLocation } from "react-router-dom";

import { ServerError } from "errors";

import { ErrorAlert } from "components/SweetAlert";
import { ROUTE_URL } from "utils/constants";

function Auth() {
  const { search } = useLocation();

  // If token is existed, save it to local storage and redirect to groups page
  const tokenValue = new URLSearchParams(search).get("token");
  if (tokenValue) {
    localStorage.setItem("access_token", tokenValue);
    return <Navigate to="/admin/groups" replace />;
  }

  // If error occur on server, show error alert and redirect to sign in page
  const errorCodeValue = new URLSearchParams(search).get("error");
  const serverError = new ServerError(errorCodeValue);
  ErrorAlert(serverError.message);
  return <Navigate to={ROUTE_URL.SIGN_IN} replace />;
}

export default Auth;
