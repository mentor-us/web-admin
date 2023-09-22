import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

// ReportsLineChart configurations
import configs from "./configs";

// Tree-shaking ChartJS components.
// More info: https://react-chartjs-2.js.org/docs/migration-to-v4#tree-shaking
ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler
);

function ReportsLineChart({ color, title, description, date, chart, height }) {
  const isTransparent = color === "none";
  const { data, options } = configs(
    chart.labels || [],
    chart.datasets || [],
    chart.tiltle || "",
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
            <Line data={data} options={options} />
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

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
  title: "",
  date: "",
  height: "15rem"
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
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

export default ReportsLineChart;
