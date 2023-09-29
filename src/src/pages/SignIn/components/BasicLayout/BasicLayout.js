import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDComponents/MDBox";
import FullPageLayout from "layouts/LayoutContainers/FullPageLayout";

function BasicLayout({ image, children }) {
  return (
    <FullPageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
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
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item>{children}</Grid>
        </Grid>
      </MDBox>
    </FullPageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default BasicLayout;
