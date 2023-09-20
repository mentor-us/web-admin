import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, MenuItem } from "@mui/material";

import MDBox from "components/MDComponents/MDBox";
import DeleteGroupButton from "../DeleteGroupButton";
import EditGroupButton from "../EditGroupButton";
import DisableGroupButton from "../DisableGroupButton/DisableGroupButton";
import EnableGroupButton from "../EnableGroupButton/EnableGroupButton";

function MenuOption({ data }) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleEdit = (event) => {
    event.stopPropagation();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
  };

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
      <MenuItem onClick={handleEdit} sx={{ minWidth: "unset" }}>
        <EditGroupButton data={data} setState={setMenu} />
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ minWidth: "unset" }}>
        <DeleteGroupButton data={data} setState={setMenu} />
      </MenuItem>

      {data.status !== "DISABLED" && (
        <MenuItem sx={{ minWidth: "unset" }}>
          <DisableGroupButton data={data} setState={setMenu} typeButton="menu" />
        </MenuItem>
      )}

      {data.status === "DISABLED" && (
        <MenuItem sx={{ minWidth: "unset" }}>
          <EnableGroupButton data={data} setState={setMenu} typeButton="menu" />
        </MenuItem>
      )}
    </Menu>
  );
  return (
    data.status !== "DELETED" && (
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
  data: PropTypes.instanceOf(Object).isRequired
};

export default MenuOption;
