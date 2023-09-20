import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

import configs from "./configs";

function ReportsBarChart({ color, title, description, date, chart, height }) {
  const isTransparent = color === "none";
  const { data, options } = configs(
    chart.labels || [],
    chart.datasets || {},
    chart.title || "",
    isTransparent
  );

  const renderChart = (
    <MDBox py={1}>
      {useMemo(
        () => (
          <MDBox
            variant="gradient"
            bgColor={color}
            borderRadius="lg"
            coloredShadow={color}
            py={2}
            pr={0.5}
            height={height}
          >
            <Bar data={data} options={options} />
          </MDBox>
        ),
        [chart, color]
      )}
      {title || description ? (
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      ) : null}
    </MDBox>
  );
  return title || description ? <Card sx={{ height: "100%" }}>{renderChart}</Card> : renderChart;
}

ReportsBarChart.defaultProps = {
  color: "info",
  description: "",
  title: "",
  date: "",
  height: "15rem"
};

ReportsBarChart.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none"
  ]),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
  ).isRequired
};

export default ReportsBarChart;
