import { Icon } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

// import MDAvatar from "components/MDComponents/MDAvatar";
import "./styles.css";

function InfoNumberCard({ title, info, iconURL, style }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "115px",
        background: "linear-gradient(135deg, #ffb88c, #de6262)",
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
        <MDBox mr={2} className="statistic__card-container-image">
          <Icon fontSize="large" sx={{ mr: 2 }}>
            {iconURL}
          </Icon>
        </MDBox>
        <MDBox display="flex" flexDirection="column" sx={{ overflowX: "hidden", ml: 1 }}>
          <MDTypography variant="button" color="white" sx={{ fontSize: "26px", mb: 0.5 }}>
            {info && info.length > 0 ? (
              <strong>{info}</strong>
            ) : (
              <i style={{ fontSize: "12px" }}>-- Không có --</i>
            )}{" "}
          </MDTypography>
          <MDTypography
            variant="caption"
            color="white"
            fontWeight="regular"
            sx={{ fontSize: "14px" }}
          >
            {title}{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

InfoNumberCard.defaultProps = {
  title: "",
  info: "",
  iconURL: "",
  style: {}
};

InfoNumberCard.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.instanceOf(Object)
};

export default InfoNumberCard;
