/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import { TaskSquareIcon } from "assets/svgs";

import CreateTaskDialog from "./CreateTaskDialog";

function CreateTaskIconButton(props) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Tooltip title="Tạo công việc" placement="top">
        <IconButton onClick={() => setOpenDialog(true)}>
          <TaskSquareIcon width={30} height={30} />
        </IconButton>
      </Tooltip>
      {openDialog && (
        <CreateTaskDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
}

CreateTaskIconButton.propTypes = {};

export default CreateTaskIconButton;
