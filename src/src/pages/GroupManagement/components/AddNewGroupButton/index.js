import { useState } from "react";
import { Icon } from "@mui/material";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import AddNewGroupModal from "../Modals/AddNewGroupModal";

/**
 * AddNewGroupButton
 * @description
 * This component will render a button for admin to add new group
 *
 * Clicking on this button will open a modal
 * @returns {React.JSX.Element}
 */
function AddNewGroupButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MDButton sx={{ mr: 1 }} onClick={handleOpen} variant="gradient" color="success">
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Thêm
        </MDTypography>
      </MDButton>

      {open && <AddNewGroupModal open={open} onClose={handleClose} />}
    </div>
  );
}

export default AddNewGroupButton;
