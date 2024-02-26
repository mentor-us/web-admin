/* eslint-disable no-unused-vars */
import { Card, Icon, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";
import useConfiguration from "hooks/useConfiguration";

import ConfiguratorDrawer from "./ConfiguratorDrawer";
import EditConfiguratorButton from "./EditConfiguratorButton";
import "./styles.css";

function Configurator({ open, onClose }) {
  const { maxLearningYear, status } = useConfiguration();

  const renderBody = () => {
    if (status === "loading") {
      return (
        <MDBox display="flex" justifyContent="center">
          <CircularProgress color="info" size="2rem" />
        </MDBox>
      );
    }

    if (status === "succeeded") {
      return (
        <MDBox className="configuration__container">
          <MDBox sx={{ mb: 2, width: "100%", gap: 2 }} display="flex" flexDirection="column">
            {/* <Card sx={{ p: 2, background: "#DFF6FF" }}>
              <MDBox
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <MDTypography variant="h6">Các domain email hợp lệ</MDTypography>
                {emailDomainsValid.description && (
                  <TooltipCustom placement="left" title={emailDomainsValid.description}>
                    <Icon fontSize="xl" sx={{ cursor: "pointer" }}>
                      info
                    </Icon>
                  </TooltipCustom>
                )}
              </MDBox>
              <Divider />
              {emailDomainsValid.value.length > 0 && (
                <List dense>
                  {emailDomainsValid.value.map((item) => (
                    <ListItem key={item}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Card> */}

            <Card sx={{ p: 2, background: "#DFF6FF" }}>
              <MDBox
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h6">Khoảng thời gian tối đa</MDTypography>
                {maxLearningYear.description && (
                  <TooltipCustom placement="left" title={maxLearningYear.description}>
                    <Icon fontSize="xl" sx={{ cursor: "pointer" }}>
                      info
                    </Icon>
                  </TooltipCustom>
                )}
              </MDBox>
              <Divider />
              <MDTypography variant="h6" sx={{ fontWeight: "300" }}>
                {maxLearningYear.value} năm
              </MDTypography>
            </Card>
          </MDBox>
          <EditConfiguratorButton sx={{ mt: 1 }} />
        </MDBox>
      );
    }

    return (
      <MDBox display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography color="error" variant="h6">
          Có lỗi xảy ra
        </Typography>
        <Typography color="error" variant="h6">
          Vui lòng thử lại sau
        </Typography>
      </MDBox>
    );
  };

  return (
    <ConfiguratorDrawer open={open} onClose={onClose}>
      <MDBox px={2} py={4}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox>
            <MDTypography variant="h5">Cấu hình MentorUS</MDTypography>
          </MDBox>

          <Icon
            sx={({ typography: { size }, palette: { dark } }) => ({
              fontSize: `${size.xl} !important`,
              color: dark.main,
              stroke: "currentColor",
              cursor: "pointer"
            })}
            onClick={onClose}
          >
            close
          </Icon>
        </MDBox>

        <Divider />
        {renderBody()}
      </MDBox>
    </ConfiguratorDrawer>
  );
}

Configurator.defaultProps = {};

Configurator.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Configurator;
