import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "utils";

function ProtectedAuth({ children }) {
  return isAuthenticated() ? children : <Navigate to="/sign-in" replace />;
}

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedAuth;
