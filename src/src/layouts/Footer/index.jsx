import React from "react";
import { Stack } from "@mui/material";

import logo from "assets/images/logo.png";
import typography from "assets/theme/base/typography";

import MDBox from "components/MDComponents/MDBox";

function Footer() {
  const { size } = typography;

  return (
    <Stack
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "center", lg: "center" }}
      px={1.5}
      pt={1.5}
      sx={{ marginTop: "auto", marginBottom: "1rem" }}
    >
      <img alt="logo" src={logo} height="50px" style={{ objectFit: "contain" }} />
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        Dự án tốt nghiệp được tạo ra bởi nhóm 5D1N khóa 2019 và nhóm Agent Bee khóa 2020 - Kỹ thuật
        phần mềm
      </MDBox>
    </Stack>
  );
}

export default Footer;
