import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";

function FullPageCenter({ children }) {
  return (
    <MDBox px={1} width="100%" height="100vh" mx="auto">
      <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
        <Grid item>{children}</Grid>
      </Grid>
    </MDBox>
  );
}
// Typechecking props for the FullPageCenter
FullPageCenter.propTypes = {
  children: PropTypes.node.isRequired
};

export default FullPageCenter;
