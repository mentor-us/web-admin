import React from "react";
import { Card, Divider } from "@mui/material";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

function ConfirmLogout({ name, onLogout, onCancel }) {
  return (
    <Card sx={{ width: "50vw" }}>
      <MDBox
        sx={{
          width: "100%",
          height: "max-content",
          px: 4,
          py: 4,
          background: "white",
          borderRadius: "10px",
          zIndex: 1
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MDTypography component="p" fontSize="4rem" className="not-found___text">
          Xác nhận thoát
        </MDTypography>
        <Divider sx={{ width: "100%" }} />
        <MDTypography component="p" fontSize="1.5rem" className="not-found___text">
          Bạn đã đăng nhập với tên <b>{name}</b>, cần đăng xuất trước khi đăng nhập tài khoản khác.
        </MDTypography>
        <MDBox
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <MDButton
            variant="gradient"
            color="error"
            sx={{ m: 1, textTransform: "none", fontSize: "1rem" }}
            onClick={onLogout}
          >
            Thoát
          </MDButton>
          <MDButton
            variant="gradient"
            color="secondary"
            sx={{ m: 1, textTransform: "none", fontSize: "1rem" }}
            onClick={onCancel}
          >
            Hủy bỏ
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ConfirmLogout.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmLogout;
