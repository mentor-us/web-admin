import { useState } from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import EditConfigurationModal from "./EditConfigurationModal";
import "./styles.css";

function EditConfiguratorButton({ sx }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// --------------------------------------------------------
  return (
    <>
      <MDButton variant="contained" color="info" onClick={handleOpen} sx={sx}>
        <Icon fontSize="medium" sx={{ mr: 1 }}>
          edit
        </Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white">
          Cập nhật
        </MDTypography>
      </MDButton>
      {open && <EditConfigurationModal open={open} onClose={handleClose} />}
    </>
  );
}

EditConfiguratorButton.defaultProps = {
  sx: {}
};

EditConfiguratorButton.propTypes = {
  sx: PropTypes.instanceOf(Object)
};

export default EditConfiguratorButton;
