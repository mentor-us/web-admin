import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import { logout } from "features/myInfo/slice";

import ProfileDialog from "pages/WebUser/components/ProfileDialog";
import MDAvatar from "components/MDComponents/MDAvatar";
import useMyInfo from "hooks/useMyInfo";
import { ROLE, ROUTE_URL } from "utils/constants";

import ListGroup from "../ListGroup";

export default function SideBar() {
  const [openProfile, setOpenProfile] = React.useState(false);
  const myInfo = useMyInfo();
  const dispatch = useDispatch();
  const handleProfileOpen = () => {
    setOpenProfile(true);
    // console.log("message sender: ", message?.sender);
  };
  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleSettingClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate(ROUTE_URL.SIGN_IN, { replace: true });
  };

  const onLogoutClick = () => {
    handleLogout();
    handleSettingClose();
  };

  const onOpenAdminPageClick = () => {
    navigate(ROUTE_URL.ADMIN_ROOT);
    handleSettingClose();
  };

  return (
    <div className="flex flex-col justify-between h-full" style={{ backgroundColor: "#0091FF" }}>
      <div className="h-20 flex flex-col hover:bg-sky-600">
        <Tooltip title={myInfo.name} placement="right">
          <Button onClick={handleProfileOpen}>
            <MDAvatar
              src={myInfo.imageUrl}
              alt="detail-image"
              shadow="md"
              size="md"
              sx={{
                alignSelf: "center",
                background: "white",
                mx: 0,
                border: "1px solid white",
                "border-radius": "5px"
              }}
            />
          </Button>
        </Tooltip>
        {openProfile && (
          <ProfileDialog open={openProfile} onClose={handleProfileClose} user={myInfo} />
        )}
      </div>
      {/* <hr /> */}
      <div className="grow overflow-y-scroll no-scrollbar">
        <ListGroup />
      </div>
      <div className="">
        <div className="flex justify-center items-center h-16 text-white hover:bg-sky-600">
          <NavLink
            to="calendar"
            className={({ isActive }) =>
              `w-full h-full flex justify-center items-center ${isActive ? "bg-sky-600" : ""}`
            }
          >
            {({ isActive }) => (
              <IconButton color="white" aria-label="Setting">
                {isActive ? (
                  <CalendarMonthIcon fontSize="medium" />
                ) : (
                  <CalendarMonthOutlinedIcon fontSize="medium" />
                )}
              </IconButton>
            )}
          </NavLink>
        </div>
        <div className="flex justify-center items-center h-16 text-white hover:bg-sky-600">
          {/* <SettingsIcon /> */}
          <IconButton
            color="white"
            aria-label="Setting"
            onClick={handleSettingClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {anchorEl ? (
              <SettingsIcon fontSize="medium" />
            ) : (
              <SettingsOutlinedIcon fontSize="medium" />
            )}
          </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleSettingClose}
          onClick={handleSettingClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mb: 20,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: 0,
                left: 12,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {(myInfo?.roles?.includes(ROLE.SUPER_ADMIN) || myInfo?.roles?.includes(ROLE.ADMIN)) && (
            <MenuItem onClick={onOpenAdminPageClick}>
              <ListItemIcon>
                <TableChartOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Chuyển sang giao diện quản lí</Typography>
              </ListItemText>
            </MenuItem>
          )}

          <MenuItem onClick={onLogoutClick}>
            <ListItemIcon>
              <Logout color="error" fontSize="small" />
            </ListItemIcon>
            <Typography color="error" fontSize="small">
              Đăng xuất
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
