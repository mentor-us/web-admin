// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";

function FullPageLayout({ background, children }) {
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </MDBox>
  );
}

// Setting default values for the props for FullPageLayout
FullPageLayout.defaultProps = {
  background: "default"
};

// Typechecking props for the FullPageLayout
FullPageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired
};

export default FullPageLayout;
