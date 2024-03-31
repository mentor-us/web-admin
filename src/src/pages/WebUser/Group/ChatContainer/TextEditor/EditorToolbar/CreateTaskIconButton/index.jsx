/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { TaskSquareIcon } from "assets/svgs";

import CreateTaskDialog from "./CreateTaskDialog";

function CreateTaskIconButton(props) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpenDialog(true)}>
        <TaskSquareIcon width={30} height={30} />
      </IconButton>
      {openDialog && (
        <CreateTaskDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
}

CreateTaskIconButton.propTypes = {};

export default CreateTaskIconButton;
