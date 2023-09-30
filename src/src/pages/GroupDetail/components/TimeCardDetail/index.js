import React from "react";
import { Card, Icon } from "@mui/material";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

function TimeCardDetail({ color, icon, time, title, style }) {
  return (
    <Card
      sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}
      style={style}
    >
      <MDBox display="flex" alignItems="center" py={2} px={2}>
        <MDBox mr={2}>
          <MDButton variant="outlined" color={color} iconOnly circular sx={{ cursor: "unset" }}>
            <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
          </MDButton>
        </MDBox>
        <MDBox display="flex" flexDirection="column" sx={{ overflowX: "hidden" }}>
          <MDTypography variant="button" gutterBottom>
            {time && time.length > 0 ? (
              <strong>{time}</strong>
            ) : (
              <i style={{ fontSize: "12px" }}>-- Không có --</i>
            )}{" "}
          </MDTypography>
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {title}{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

TimeCardDetail.defaultProps = {
  style: {},
  color: "primary"
};

TimeCardDetail.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark"
  ]),
  icon: PropTypes.node.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object)
};

export default TimeCardDetail;
