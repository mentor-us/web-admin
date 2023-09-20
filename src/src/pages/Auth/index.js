import { ErrorAlert } from "components/SweetAlert";
import { Navigate, useLocation } from "react-router-dom";
import getMessage from "utils/message";

function Auth() {
  const { search } = useLocation();
  const tokenValue = new URLSearchParams(search).get("token");
  const errorCodeValue = new URLSearchParams(search).get("error");

  if (tokenValue) {
    localStorage.setItem("access_token", tokenValue);
    return <Navigate to="/groups" replace />;
  }

  if (errorCodeValue) {
    ErrorAlert(getMessage(parseInt(errorCodeValue, 10)));
    return <Navigate to="/sign-in" replace />;
  }
}

export default Auth;
