import React from "react";
// import PropTypes from "prop-types";
import MDBox from "components/MDComponents/MDBox";
import typography from "assets/theme/base/typography";
import logo from "assets/images/logo.png";

function Footer() {
  const { size } = typography;

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "center", lg: "flex-end" }}
      px={1.5}
      pt={1.5}
      sx={{ marginTop: "auto" }}
    >
      <MDBox height="50px" mb={{ xs: 1, lg: 0 }} sx={{ opacity: "1" }}>
        <img alt="logo" src={logo} height="50px" style={{ objectFit: "contain" }} />
      </MDBox>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        Dự án tốt nghiệp được tạo ra bởi nhóm 5D1N khóa 2019 - Kỹ thuật phần mềm
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
// Footer.defaultProps = {
// };

// Typechecking props for the Footer
// Footer.propTypes = {
// };

export default Footer;
