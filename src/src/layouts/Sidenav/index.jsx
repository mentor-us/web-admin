/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import { setMiniSidenav, setTransparentSidenav, setWhiteSidenav } from "context/index";
import PropTypes from "prop-types";

import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";
import { ROUTE_URL } from "utils/constants";

import SlideNavCollapseList from "./components/SlidenavCollapseList";
import sidenavLogoLabel from "./styles/sidenav";
import SidenavCollapse from "./SidenavCollapse";
import SidenavRoot from "./SidenavRoot";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatchContext] = useMentorUs();
  const navigate = useNavigate();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.split("/");

  const textColor = "dark";

  const closeSidenav = () => setMiniSidenav(dispatchContext, true);

  const checkActive = (key, collapseNameAray) => {
    return collapseNameAray.filter((item) => item.includes(key)).length > 0;
  };

  const openChatPage = () => {
    navigate(ROUTE_URL.CHAT_ROOT);
  };

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatchContext, window.innerWidth < 1200);
      setTransparentSidenav(dispatchContext, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatchContext, window.innerWidth < 1200 ? true : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatchContext, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ collapse, name, icon, key, route, slideNavShow }) => {
    let returnValue;

    if (slideNavShow === true) {
      returnValue = !route ? (
        <SlideNavCollapseList
          key={key}
          name={name}
          icon={icon}
          collapse={collapse}
          active={checkActive(key, collapseName)}
        />
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse
            name={name}
            icon={icon}
            collapse={collapse}
            active={checkActive(key, collapseName)}
          />
        </NavLink>
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={3} textAlign="center">
        <MDBox
          display="none"
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/admin" display="flex" alignItems="center">
          {brand && (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width="2.3rem"
              borderRadius="0.875rem"
              sx={(theme) => {
                const { borders } = theme;
                const { borderRadius } = borders;
                return {
                  borderRadius: borderRadius.md
                };
              }}
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            mx={1.5}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
              sx={{ fontSize: "1.25rem" }}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Box style={{ marginTop: 1 }}>
        <Link to={ROUTE_URL.CHAT_ROOT}>
          <SidenavCollapse name="Nhắn tin" icon={<Icon>chat</Icon>} />
        </Link>
      </Box>
      <Divider
        variant="middle"
        sx={{
          marginTop: 1,
          marginX: 3,
          backgroundColor: "black!important"
        }}
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: ""
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Sidenav;
