// prop-types is a library for typechecking of props
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

function DefaultNavbarLink({ icon, name, route, light }) {
  return (
    <MDBox
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <Icon
        sx={{
          color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
          verticalAlign: "middle"
        }}
      >
        {icon}
      </Icon>
      <MDTypography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired
};

export default DefaultNavbarLink;
