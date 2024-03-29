// prop-types is a library for typechecking of props.
import Icon from "@mui/material/Icon";
// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

// Custom styles for the SidenavCollapse
import { useMentorUs } from "hooks";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";

import {
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText
} from "./styles/sidenavCollapse";

// Material Dashboard 2 React context

function SidenavCollapse({ icon, name, active, ...rest }) {
  const [controller] = useMentorUs();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  return (
    <ListItem component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            isList: false,
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
      </MDBox>
    </ListItem>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default SidenavCollapse;
