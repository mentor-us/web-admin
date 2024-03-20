/* eslint-disable no-unused-vars */
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { ChartSquareIcon } from "assets/svgs";

function CreateVoteIconButton(props) {
  return (
    <IconButton>
      <ChartSquareIcon width={30} height={30} />
    </IconButton>
  );
}

CreateVoteIconButton.propTypes = {};

export default CreateVoteIconButton;
