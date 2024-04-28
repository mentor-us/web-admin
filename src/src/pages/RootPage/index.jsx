import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectMyInfoState } from "features/myInfo/slice";
import PropTypes from "prop-types";

import { isAuthenticated } from "utils";

import useMyInfo from "hooks/useMyInfo";
import { ROLE, ROUTE_URL } from "utils/constants";

function RootPage({ children }) {
  const myInfo = useMyInfo();
  const myInfoState = useSelector(selectMyInfoState);

  if (isAuthenticated()) {
    if (myInfoState.status === "idle") {
      return null;
    }

    if (Object.keys(myInfo).length !== 0) {
      const { roles } = myInfo;
      if (roles.includes(ROLE.SUPER_ADMIN) || roles.includes(ROLE.ADMIN)) {
        return <Navigate to={ROUTE_URL.GROUP_ROOT} replace />;
      }

      return <Navigate to={ROUTE_URL.CHAT_ROOT} replace />;
    }
  }

  return children;
}

RootPage.defaultProps = {};

RootPage.propTypes = {
  children: PropTypes.node.isRequired
};

export default RootPage;
