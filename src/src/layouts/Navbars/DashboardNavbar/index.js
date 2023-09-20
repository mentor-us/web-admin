import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
import MDAvatar from "components/MDComponents/MDAvatar";
import MDTypography from "components/MDComponents/MDTypography";
import Breadcrumbs from "components/Breadcrumbs";
import TooltipCustom from "components/Tooltip";

import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";

import { getCurrentUserSelector } from "redux/currentUser/selector";
import { logout } from "redux/currentUser/slice";

import { getValueOfList } from "utils";
import { roleAccountList } from "utils/constants";
// import { WEB_URL } from "config";

import admin from "assets/images/admin.png";
import { navbar, navbarContainer, navbarRow, navbarIconButton } from "./styles";

function DashboardNavbar({ absolute, light, isMini }) {
  /// --------------------- Khai báo Biến, State -------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatchContext] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);
  const currentUser = useSelector(getCurrentUserSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const getTitle = () => {
    if (route.length > 1 && route.some((item) => item.includes("detail"))) {
      route.pop();
    }

    return route[route.length - 1];
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatchContext, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatchContext, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatchContext, !miniSidenav);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    // if (currentUser.provider === "google") {
    //   window.location.assign(
    //     `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${WEB_URL}sign-in`
    //   );
    // } else if (currentUser.provider === "azure") {
    //   window.location.assign(
    //     `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${WEB_URL}sign-in&client_id=`
    //   );
    // } else {
    //   navigate("/sign-in", { replace: true });
    // }
    navigate("/sign-in", { replace: true });
  };

  const menuBox = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            minWidth: "250px"
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ justifyContent: "center", opacity: "1!important" }} disabled>
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            mt={0.5}
            lineHeight={1}
          >
            <MDAvatar
              src={currentUser.imageUrl || admin}
              alt="profile-image"
              shadow="sm"
              size="lg"
              sx={{
                alignSelf: "center",
                mb: 1,
                mx: 0
              }}
            />
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <MDTypography variant="h5" fontWeight="medium" sx={{ mb: 1 }}>
                {currentUser.name}{" "}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular" fontSize="small">
                {getValueOfList(roleAccountList, currentUser.role, "textValue", "role")}{" "}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem>
          <ListItemIcon>
            <Icon fontSize="medium">account_circle</Icon>
          </ListItemIcon>
          <NavLink key={currentUser.id} to={`/account-management/account-detail/${currentUser.id}`}>
            <MDTypography variant="subtitle2" fontSize="medium">
              Hồ sơ cá nhân
            </MDTypography>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Icon fontSize="medium">logout</Icon>
          </ListItemIcon>
          <MDTypography variant="subtitle2" fontSize="medium">
            Đăng xuất
          </MDTypography>
        </MenuItem>
      </Menu>
    );
  };

  /// --------------------------------------------------------

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={getTitle()} route={route} light={light} />
        </MDBox>
        <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
          <MDBox color={light ? "white" : "inherit"}>
            <TooltipCustom title={miniSidenav ? "Chế độ menu thu nhỏ" : "Chế độ menu mở rộng"}>
              <IconButton size="large" disableRipple color="inherit" onClick={handleMiniSidenav}>
                <Icon fontSize="medium">{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
            </TooltipCustom>
            <IconButton sx={navbarIconButton} size="medium" onClick={handleClick}>
              <MDAvatar
                src={currentUser.imageUrl || admin}
                alt="profile-image"
                size="sm"
                shadow="sm"
              />
            </IconButton>
            {menuBox()}
          </MDBox>
        </MDBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool
};

export default DashboardNavbar;
