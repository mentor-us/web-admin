/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import { ClockIcon } from "assets/svgs";

import BookMeetingDialog from "./BookMeetingDialog";

function BookMeetingIconButton(props) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Tooltip title="Tạo lịch hẹn" placement="top">
        <IconButton onClick={() => setOpenDialog(true)}>
          <ClockIcon width={30} height={30} />
        </IconButton>
      </Tooltip>
      {openDialog && (
        <BookMeetingDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
}

BookMeetingIconButton.propTypes = {};

export default BookMeetingIconButton;
