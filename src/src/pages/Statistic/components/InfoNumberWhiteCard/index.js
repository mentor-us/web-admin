import { Icon } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

// import MDAvatar from "components/MDComponents/MDAvatar";
import "./styles.css";

function InfoNumberWhiteCard({ title, info, iconURL, style, color, isText }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: isText ? "100px" : "115px",
        background: "#fff",
        overflow: "hidden"
      }}
      style={style}
    >
      <MDBox
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%"
        }}
      >
        <MDBox className="statistic__white-card-container-image">
          <MDButton variant="outlined" color={color} size="large" iconOnly circular>
            <Icon sx={{ fontWeight: "bold" }} fontSize="large">
              {iconURL}
            </Icon>
          </MDButton>
        </MDBox>
        <MDBox display="flex" flexDirection="column" sx={{ overflowX: "hidden", ml: 0.5 }}>
          <MDTypography
            variant="button"
            color={color}
            sx={{ fontSize: isText ? "18px" : "26px", mb: isText ? 1 : 0.5 }}
          >
            {info && info.length > 0 ? (
              <strong>{info}</strong>
            ) : (
              <i style={{ fontSize: "14px" }}>-- Không có --</i>
            )}{" "}
          </MDTypography>
          <MDTypography
            variant="caption"
            fontWeight="regular"
            color="text"
            sx={{ fontSize: isText ? "12px" : "14px" }}
          >
            {title}{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

InfoNumberWhiteCard.defaultProps = {
  title: "",
  info: "",
  iconURL: "",
  style: {},
  color: "error",
  isText: false
};

InfoNumberWhiteCard.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.instanceOf(Object),
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
  isText: PropTypes.bool
};

export default InfoNumberWhiteCard;
