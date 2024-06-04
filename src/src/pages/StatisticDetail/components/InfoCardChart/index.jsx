import Card from "@mui/material/Card";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

import MDAvatar from "components/MDComponents/MDAvatar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

function InfoCardChart({ title, subtitle, iconURL, style }) {
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
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        lineHeight={1.75}
        py={2}
        px={4}
      >
        <MDBox mb={2}>
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
        <MDTypography variant="h6" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
          {title}{" "}
        </MDTypography>
        <MDTypography variant="subtitle1" sx={{ fontSize: "1rem", textAlign: "center" }}>
          {subtitle}{" "}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

InfoCardChart.defaultProps = {
  title: "",
  subtitle: "",
  iconURL: "",
  style: {}
};

InfoCardChart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.instanceOf(Object)
};

export default InfoCardChart;
