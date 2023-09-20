import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
// import { checkIsAuthenticated } from "utils";

function ProtectedAuth({ children }) {
  const token = localStorage.getItem("access_token");

  const isAuthenticated = token && token.length > 0;
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedAuth;
