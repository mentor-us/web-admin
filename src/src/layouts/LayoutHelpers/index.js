import { useState } from "react";
import { Icon } from "@mui/material";
import { setMiniSidenav, setOpenConfigurator } from "context/index";

import { useMentorUs } from "hooks";
import routes from "routes";
import logo from "assets/images/logo_mentorus.jpg";

import Sidenav from "layouts/Sidenav/index";
import Configurator from "components/Configurator";
import MDBox from "components/MDComponents/MDBox";

function LayoutHelper() {
  const [controller, dispatchContext] = useMentorUs();
  const { miniSidenav, sidenavColor, openConfigurator } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatchContext, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatchContext, true);
      setOnMouseEnter(false);
    }
  };

  // Đóng mở cấu hình
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatchContext, !openConfigurator);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="#B9E9FC"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2.4rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    localStorage.getItem("access_token") && (
      <>
        <Sidenav
          color={sidenavColor}
          brand={logo}
          brandName="MentorUS"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
        {configsButton}
      </>
    )
  );
}

export default LayoutHelper;
