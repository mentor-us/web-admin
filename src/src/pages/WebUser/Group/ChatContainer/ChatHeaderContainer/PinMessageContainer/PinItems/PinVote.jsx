/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import VoteDetailDialog from "pages/WebUser/components/VoteDetailDialog";

function PinVote({ message }) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <Box onClick={() => setOpenDetail(true)} className="cursor-pointer">
        <Typography className="!text-xs !font-bold">Bình chọn</Typography>
        <Typography className="!line-clamp-1 !text-xs !text-[#7589A3]">
          {message.vote.question}
        </Typography>
      </Box>
      {openDetail && (
        <VoteDetailDialog
          open={openDetail}
          voteId={message?.vote?.id}
          handleClose={() => {
            setOpenDetail(false);
          }}
        />
      )}
    </>
  );
}

PinVote.propTypes = {
  message: PropTypes.object.isRequired
};

export default PinVote;
