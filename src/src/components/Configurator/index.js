import { Card, Icon } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";
import useConfiguration from "hooks/useConfiguration";

import ConfiguratorDrawer from "./ConfiguratorDrawer";
import EditConfiguratorButton from "./EditConfiguratorButton";
import "./styles.css";

function Configurator({ open, onClose }) {
  const { maxLearningYear, emailDomainsValid } = useConfiguration();

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

        <MDBox className="configuration__container">
          <MDBox sx={{ mb: 2, width: "100%", gap: 2 }} display="flex" flexDirection="column">
            <Card sx={{ p: 2, background: "#DFF6FF" }}>
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
            </Card>

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
