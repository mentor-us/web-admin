import { ErrorAlert } from "components/SweetAlert";
import { ServerError } from "errors";
import { Navigate, useLocation } from "react-router-dom";

function Auth() {
  const { search } = useLocation();

  // If token is existed, save it to local storage and redirect to groups page
  const tokenValue = new URLSearchParams(search).get("token");
  if (tokenValue) {
    localStorage.setItem("access_token", tokenValue);
    return <Navigate to="/groups" replace />;
  }

  // If error occur on server, show error alert and redirect to sign in page
  const errorCodeValue = new URLSearchParams(search).get("error");
  const serverError = new ServerError(errorCodeValue);
  ErrorAlert(serverError.message);
  return <Navigate to="/sign-in" replace />;
}

export default Auth;
