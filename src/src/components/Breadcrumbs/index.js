// react-router-dom components
import { memo } from "react";
import { Link } from "react-router-dom";
// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { translateToVNmeseByKey } from "routes";

// Material Dashboard 2 React components
import MDTypography from "components/MDComponents/MDTypography";

function Breadcrumbs({ icon, routes, light }) {
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
      {routes.map((route) => (
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
    </MuiBreadcrumbs>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
  icon: "home"
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node,
  routes: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  light: PropTypes.bool
};

export default memo(Breadcrumbs);
