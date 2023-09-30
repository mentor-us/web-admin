import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icon, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

import MDBox from "components/MDComponents/MDBox";

import { getCurrentUserSelector } from "redux/currentUser/selector";

import DeleteButton from "./components/DeleteButton";
import DisableAccountButton from "./components/DisableAccountButton";
import EditAccountButton from "./components/EditAccountButton";
import EnableAccountButton from "./components/EnableAccountButton";

function EditDelete({ data }) {
  const [menu, setMenu] = useState(null);
  const currentUser = useSelector(getCurrentUserSelector);
  const isCurrentAccount = currentUser.id === data.id;
  const canDelete = !isCurrentAccount && !(currentUser.role === "ADMIN" && data.role === "ADMIN");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleEdit = () => {};

  const handleDelete = () => {};

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
        <EditAccountButton data={data} setState={setMenu} isCurrentAccount={isCurrentAccount} />
      </MenuItem>
      {canDelete && (
        <MenuItem onClick={handleDelete} sx={{ minWidth: "unset" }}>
          <DeleteButton data={data} setState={setMenu} />
        </MenuItem>
      )}
      {!isCurrentAccount && data.status && (
        <MenuItem sx={{ minWidth: "unset" }}>
          <DisableAccountButton data={data} setState={setMenu} />
        </MenuItem>
      )}
      {!isCurrentAccount && !data.status && (
        <MenuItem sx={{ minWidth: "unset" }}>
          <EnableAccountButton data={data} setState={setMenu} />
        </MenuItem>
      )}
    </Menu>
  );
  return (
    <>
      <MDBox color="text" display="flex" alignItems="center">
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
          more_vert
        </Icon>
      </MDBox>
      {renderMenu}
    </>
  );
}

EditDelete.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default EditDelete;
