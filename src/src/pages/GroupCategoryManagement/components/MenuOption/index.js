import React, { useState } from "react";
import { Icon, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";

import DeleteCategoryButton from "../DeleteCategoryButton";
import EditCategoryButton from "../EditCategoryButton";

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
        <EditCategoryButton data={data} setState={setMenu} />
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ minWidth: "unset" }}>
        <DeleteCategoryButton data={data} setState={setMenu} />
      </MenuItem>
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
