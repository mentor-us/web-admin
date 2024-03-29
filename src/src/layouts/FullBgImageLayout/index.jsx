import PropTypes from "prop-types";

import FullPageLayout from "layouts/FullPageLayout";

/**
 * FullBgImageLayout
 * @description
 * A layout that renders a full page (max width and height) with a background image
 * @param {string} image - The image to be used as background
 * @param {node} children - The children to be rendered
 * @returns {React.JSX.Element}
 */
function FullBgImageLayout({ image, children }) {
  return (
    <FullPageLayout
      position="absolute"
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image &&
          `${linearGradient(
            rgba(gradients.dark.main, 0.6),
            rgba(gradients.dark.state, 0.6)
          )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {children}
    </FullPageLayout>
  );
}

// Typechecking props for the FullBgImageLayout
FullBgImageLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FullBgImageLayout;
