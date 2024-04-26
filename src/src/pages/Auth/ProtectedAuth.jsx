import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "utils";

import AccessDenied from "pages/AccessDenied";
import useMyInfo from "hooks/useMyInfo";
import { ROLE, ROUTE_URL } from "utils/constants";

const checkRoles = (myInfo, routeRoles) => {
  const isSupperAdmin = myInfo?.roles?.includes(ROLE.SUPER_ADMIN);
  if (isSupperAdmin) {
    return true;
  }

  const isAdmin = myInfo?.roles?.includes(ROLE.ADMIN);
  if (isAdmin && routeRoles.includes(ROLE.SUPER_ADMIN)) {
    return false;
  }

  const isUser = myInfo?.roles?.includes(ROLE.USER);
  if (isUser && (routeRoles.includes(ROLE.SUPER_ADMIN) || routeRoles.includes(ROLE.ADMIN))) {
    return false;
  }

  return true;
};

function ProtectedAuth({ children, roles }) {
  const location = useLocation();
  const myInfo = useMyInfo();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTE_URL.SIGN_IN} state={{ from: location }} />;
  }

  const userHasRequiredRole = !!(myInfo && checkRoles(myInfo, roles));

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
}

ProtectedAuth.defaultProps = {
  roles: []
};

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(String)
};

export default ProtectedAuth;
