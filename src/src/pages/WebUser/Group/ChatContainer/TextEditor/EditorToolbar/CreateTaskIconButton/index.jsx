/* eslint-disable no-unused-vars */
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { TaskSquareIcon } from "assets/svgs";

function CreateTaskIconButton(props) {
  return (
    <IconButton>
      <TaskSquareIcon width={30} height={30} />
    </IconButton>
  );
}

CreateTaskIconButton.propTypes = {};

export default CreateTaskIconButton;
