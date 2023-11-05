import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";

/**
 * FullPageLayout
 * @description
 * A layout that renders a full page (max width and height) wrapping the children
 * @param {?string} [background] - The image to be used as background
 * @param {node} children - The children to be rendered
 * @param {?object} sx - The sx prop from Theme UI
 * @param {object} rest - The rest props
 * @returns {React.JSX.Element}
 */
function FullPageLayout({ background, children, sx, ...rest }) {
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden", ...sx }}
      {...rest}
    >
      {children}
    </MDBox>
  );
}

// Setting default values for the props for FullPageLayout
FullPageLayout.defaultProps = {
  background: "default",
  sx: {}
};

// Typechecking props for the FullPageLayout
FullPageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
};

export default FullPageLayout;
