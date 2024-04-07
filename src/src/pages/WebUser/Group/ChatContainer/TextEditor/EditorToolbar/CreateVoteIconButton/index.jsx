import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";

import { ChartSquareIcon } from "assets/svgs";

import CreateVoteDialog from "./CreateVoteDialog";

function CreateVoteIconButton() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Tooltip title="Tạo bình chọn" placement="top">
        <IconButton onClick={() => setOpenDialog(true)}>
          <ChartSquareIcon width={30} height={30} />
        </IconButton>
      </Tooltip>
      {openDialog && (
        <CreateVoteDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
}

CreateVoteIconButton.propTypes = {};

export default CreateVoteIconButton;
