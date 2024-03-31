import { useState } from "react";
import { IconButton } from "@mui/material";

import { ChartSquareIcon } from "assets/svgs";

import CreateVoteDialog from "./CreateVoteDialog";

function CreateVoteIconButton() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpenDialog(true)}>
        <ChartSquareIcon width={30} height={30} />
      </IconButton>
      {openDialog && (
        <CreateVoteDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
}

CreateVoteIconButton.propTypes = {};

export default CreateVoteIconButton;
