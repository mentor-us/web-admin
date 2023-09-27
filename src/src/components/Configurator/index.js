import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import { Card, Icon } from "@mui/material";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";

// getEmailDomainsValidSelector
import { getFromToRangeSelector } from "redux/configuration/selector";
import { getAllConfiguration } from "redux/configuration/slice";

import { isExpiredToken } from "utils";

import { setOpenConfigurator } from "context/index";
import { useMentorUs } from "hooks";
import ConfiguratorRoot from "./ConfiguratorRoot";

import "./styles.css";
import EditConfiguratorButton from "./EditConfiguratorButton";

function Configurator() {
  const [controller, dispatchContext] = useMentorUs();
  const { openConfigurator } = controller;
  const dispatch = useDispatch();
  const fromToRange = useSelector(getFromToRangeSelector);
  // const emailDomainsValid = useSelector(getEmailDomainsValidSelector);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token && !isExpiredToken(token)) {
      dispatch(getAllConfiguration());
    }
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatchContext, false);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={4}
        pb={0.5}
        px={2}
      >
        <MDBox>
          <MDTypography variant="h5">Cấu hình MentorUS</MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark } }) => ({
            fontSize: `${size.xl} !important`,
            color: dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)"
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pb={3} px={2} className="configuration__container">
        <MDBox display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {/* <Card sx={{ my: 1, width: "100%", px: 2, py: 1, background: "#DFF6FF" }}>
            <MDBox
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <MDTypography variant="h6">Các domain email hợp lệ</MDTypography>
              <TooltipCustom placement="left" title={emailDomainsValid.description}>
                <Icon fontSize="xl" sx={{ cursor: "pointer" }}>
                  info
                </Icon>
              </TooltipCustom>
            </MDBox>
            <Divider />
            {emailDomainsValid.value.length > 0 && (
              <List dense sx={{ mb: 1 }}>
                {emailDomainsValid.value.map((item) => (
                  <ListItem key={item} sx={{ my: 0.5 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            )}
          </Card> */}
          <Card sx={{ my: 1, width: "100%", px: 2, py: 1, background: "#DFF6FF" }}>
            <MDBox
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <MDTypography variant="h6">Khoảng thời gian tối đa</MDTypography>
              <TooltipCustom placement="left" title={fromToRange.description ?? ""}>
                <Icon fontSize="xl" sx={{ cursor: "pointer" }}>
                  info
                </Icon>
              </TooltipCustom>
            </MDBox>
            <Divider />
            <MDTypography variant="h6" sx={{ mb: 1, fontWeight: "300" }}>
              {fromToRange.value} năm
            </MDTypography>
          </Card>
        </MDBox>
        <EditConfiguratorButton data={{ fromToRange }} />
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
