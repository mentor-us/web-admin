import React, { useState } from "react";
import { Icon, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";

import DeleteDetailButton from "../DeleteDetailButton";
import SetRoleButton from "../SetRoleButton";

function MenuOption({ type, data, isDeleted }) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          width: "fit-content",
          filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.3))",
          mt: 0.5
        }
      }}
    >
      <MenuItem sx={{ minWidth: "unset" }}>
        <SetRoleButton data={data} type={type} setState={setMenu} />
      </MenuItem>
      <MenuItem sx={{ minWidth: "unset" }}>
        <DeleteDetailButton data={data} type={type} setState={setMenu} />
      </MenuItem>
    </Menu>
  );
  return (
    !isDeleted && (
      <>
        <MDBox color="text" display="flex" alignItems="center">
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </>
    )
  );
}

MenuOption.propTypes = {
  type: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  isDeleted: PropTypes.bool.isRequired
};

export default MenuOption;
