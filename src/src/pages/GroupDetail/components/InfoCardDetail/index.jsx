import Card from "@mui/material/Card";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

import MDAvatar from "components/MDComponents/MDAvatar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

import "./styles.css";

function InfoCardDetail({ title, subtitle, description, iconURL, style }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
      style={style}
    >
      <MDBox display="flex" flexDirection="row" alignItems="center" py={3} px={2}>
        <MDBox mr={3} ml={3}>
          <MDAvatar
            src={getImageUrlWithKey(iconURL)}
            alt="detail-image"
            shadow="sm"
            size="xl"
            sx={{
              alignSelf: "center",
              background: "white",
              mx: 0
            }}
          />
        </MDBox>
        <MDBox lineHeight={1.75} width="80%" sx={{ overflowX: "hidden" }} ml={2}>
          <MDTypography variant="h6" sx={{ fontSize: "1.2rem" }}>
            {title}{" "}
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ fontSize: "1rem" }}>
            {subtitle}{" "}
          </MDTypography>
          <MDTypography
            variant="subtitle1"
            sx={{
              fontSize: "1rem",
              width: "100%",
              height: description?.length >= 90 ? "4rem" : "auto"
            }}
          >
            {description}{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

InfoCardDetail.defaultProps = {
  title: "",
  subtitle: "",
  iconURL: "",
  style: {},
  description: ""
};

InfoCardDetail.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  description: PropTypes.string
};

export default InfoCardDetail;
