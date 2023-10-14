import React from "react";
import { Card } from "@mui/material";

import googleLogo from "assets/images/google.png";
import microsoftLogo from "assets/images/microsoft.png";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { googleSignInURL, microsoftSignInURL } from "utils/constants";

import "./style.css";

function SignInCard() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        mb={1}
        p={2}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Đăng nhập
        </MDTypography>
      </MDBox>
      <MDBox mt={4} mb={4} px={3}>
        <MDButton
          component="a"
          rel="noreferrer"
          variant="outlined"
          size="medium"
          color="info"
          href={googleSignInURL}
          fullWidth
        >
          <img src={googleLogo} alt="Google Logo" style={{ width: "20px", marginRight: "10px" }} />
          <span style={{ fontSize: "1rem" }}>Đăng nhập bằng Google</span>
        </MDButton>
      </MDBox>
      <MDBox px={3}>
        <MDBox className="signin__line-border">
          <hr className="signin__line" />
          <MDTypography
            variant="h4"
            fontWeight="regular"
            fontSize="small"
            color="dark"
            mt={1}
            mx={1}
            className="signin__text-or"
            sx={({ palette: { white } }) => ({
              backgroundColor: white.main
            })}
          >
            <span>hoặc</span>
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={4} mb={4} px={3}>
        <MDButton
          component="a"
          rel="noreferrer"
          variant="outlined"
          size="medium"
          color="info"
          href={microsoftSignInURL}
          fullWidth
        >
          <img
            src={microsoftLogo}
            alt="Microsoft Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "1rem" }}>Đăng nhập bằng Microsoft</span>
        </MDButton>
      </MDBox>
    </Card>
  );
}

export default SignInCard;
