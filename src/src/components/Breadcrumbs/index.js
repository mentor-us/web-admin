// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { translateToVNmeseByKey } from "routes";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
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
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="regular"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {translateToVNmeseByKey(el)}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="regular"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {translateToVNmeseByKey(title)}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        fontWeight="bold"
        variant="h6"
        color={light ? "white" : "dark"}
        sx={{ mt: 0.5, fontSize: "1.12rem" }}
        noWrap
      >
        {translateToVNmeseByKey(title)}
      </MDTypography>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  light: PropTypes.bool
};

export default Breadcrumbs;
