import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import { useTimeline } from "../context/index";

import horizontalTimelineItem from "./styles";

function HorizontalTimelineItem({ color, icon, title, info, lastItem }) {
  const isDark = useTimeline();

  return (
    <MDBox
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={(theme) => horizontalTimelineItem(theme, { lastItem, isDark })}
    >
      <MDButton
        variant="contained"
        color={color}
        size="large"
        iconOnly
        circular
        sx={{ m: 1, zIndex: 2 }}
      >
        <Icon sx={{ fontWeight: "bold" }} fontSize="large">
          {icon}
        </Icon>
      </MDButton>
      <MDBox
        p={1}
        lineHeight={0}
        maxWidth="30rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MDTypography variant="button" color={color} sx={{ fontSize: "26px", mb: 0.5 }}>
          {info && info.length > 0 ? (
            <strong>{info}</strong>
          ) : (
            <i style={{ fontSize: "14px" }}>-- Không có --</i>
          )}{" "}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text" sx={{ fontSize: "14px" }}>
          {title}{" "}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

HorizontalTimelineItem.defaultProps = {
  color: "info",
  lastItem: false
};

HorizontalTimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light"
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lastItem: PropTypes.bool
};

export default HorizontalTimelineItem;
