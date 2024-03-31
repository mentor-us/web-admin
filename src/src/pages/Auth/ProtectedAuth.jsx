import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "utils";

import { ROUTE_URL } from "utils/constants";

function ProtectedAuth({ children }) {
  return isAuthenticated() ? children : <Navigate to={ROUTE_URL.SIGN_IN} replace />;
}

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedAuth;
