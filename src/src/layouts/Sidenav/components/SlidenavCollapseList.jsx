import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// @mui material components
import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Custom styles for the SidenavCollapse
import { useMentorUs } from "hooks";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";

import SidenavCollapse from "../SidenavCollapse";
import {
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText
} from "../styles/sidenavCollapse";

// Material Dashboard 2 React context

function SlideNavCollapseList({ collapse, icon, name, active, ...rest }) {
  const [controller] = useMentorUs();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [open, setOpen] = useState(active);
  const location = useLocation();
  const collapseName = location.pathname.split("/");

  const checkActive = (key, collapseNameAray) => {
    return collapseNameAray.includes(key);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const renderCollapse = (collapseList) => {
    return collapseList.map((item) => {
      if (item.collapse && item.collapse.length > 0) return renderCollapse(item.collapse);

      return (
        <NavLink key={item.key} to={item.route}>
          <SidenavCollapse
            name={item.name}
            icon={item.icon}
            collapse={item.collapse}
            active={checkActive(item.key, collapseName)}
          />
        </NavLink>
      );
    });
  };

  return (
    <>
      <ListItem onClick={handleClick}>
        <MDBox
          {...rest}
          sx={(theme) =>
            collapseItem(theme, {
              active,
              isList: true,
              whiteSidenav,
              sidenavColor
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active
              })
            }
          />

          {open ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>expand_less</Icon>
          ) : (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>expand_more</Icon>
          )}
        </MDBox>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ pl: 1 }}>{renderCollapse(collapse)}</List>
      </Collapse>
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SlideNavCollapseList.defaultProps = {
  active: false
};

// Typechecking props for the SidenavCollapse
SlideNavCollapseList.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  collapse: PropTypes.instanceOf(Array).isRequired,
  active: PropTypes.bool
};

export default SlideNavCollapseList;
