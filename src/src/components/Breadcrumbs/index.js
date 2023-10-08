import { Link } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

import { translateToVNmeseByKey } from "routes";

import MDTypography from "components/MDComponents/MDTypography";

/**
 * Breadcrumbs
 * @description
 * Breadcrumbs for pages header. Show current page and path to it.
 * @param {PropTypes.node} icon - home icon
 * @param {Object[]} routes - array of routes
 * @param {boolean} light - light mode
 * @returns {React.JSX.Element}
 */
function Breadcrumbs({ icon, routes, light }) {
  const lastRoute = routes[routes.length - 1];
  const remainRoutes = routes.slice(0, -1);

  return (
    <MuiBreadcrumbs
      sx={{
        "& .MuiBreadcrumbs-separator": {
          color: ({ palette: { white, grey } }) => (light ? white.main : grey[600])
        }
      }}
    >
      <Link to="/">
        <MDTypography
          component="span"
          variant="body2"
          color={light ? "white" : "dark"}
          opacity={light ? 0.8 : 0.5}
          sx={{ lineHeight: 0 }}
        >
          <Icon fontSize="medium">{icon}</Icon>
        </MDTypography>
      </Link>
      {remainRoutes.map((route) => (
        <Link to={`/${route}`} key={route}>
          <MDTypography
            component="span"
            variant="button"
            fontWeight="regular"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            {translateToVNmeseByKey(route)}
          </MDTypography>
        </Link>
      ))}
      <MDTypography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        sx={{ lineHeight: 0 }}
      >
        {translateToVNmeseByKey(lastRoute)}
      </MDTypography>
    </MuiBreadcrumbs>
  );
}

Breadcrumbs.defaultProps = {
  light: false,
  icon: "home"
};

Breadcrumbs.propTypes = {
  icon: PropTypes.node,
  routes: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  light: PropTypes.bool
};

export default Breadcrumbs;
