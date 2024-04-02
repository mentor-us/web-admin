/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { images } from "assets/images";
import { LockRedIcon } from "assets/svgs";

import { VOTE_STATUS } from "utils/constants";

function VoteItem({ message, containerClassName }) {
  let { vote } = message; // Define vote variable outside the if-else block

  if (vote === undefined) {
    vote = message;
  }

  const voterNumber = vote?.choices
    .flatMap((choice) => choice.voters)
    .filter((value, index, array) => array.indexOf(value) === index).length;

  const renderVoteItems = useMemo(
    () =>
      vote?.choices.map((item) => {
        let votePercent = "0%";
        if (voterNumber) {
          votePercent = `${((item.voters.length / voterNumber) * 100).toFixed(2)}%`;
        }

        return (
          <Box className="vote-message-item h-8" key={item.id}>
            <Box
              className="vote-percent-line !z-10"
              sx={{
                width: votePercent
              }}
            />
            <Box className="vote-option-text line-clamp-2 !z-20">
              <Tooltip title={item.name}>
                <Typography className="!text-sm">{item.name}</Typography>
              </Tooltip>
            </Box>
            <Box className="!z-20">
              <Typography className="vote-option-number line-clamp-1 !text-sm">
                {item.voters.length}
              </Typography>
            </Box>
          </Box>
        );
      }),
    [vote?.choices, voterNumber]
  );

  return (
    <Box className="vote-message-container">
      <Box
        className={
          containerClassName !== "" ? containerClassName : "bg-white rounded-lg w-[70%] p-4"
        }
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <img
            src={images.ColumnChartImage}
            alt="Chart icon"
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
          <Typography className="!font-bold !text-[#333] !text-base !line-clamp-3">
            {vote?.question}
          </Typography>
        </Box>

        {vote?.status === VOTE_STATUS.CLOSED && (
          <Box marginTop={1} display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
            <LockRedIcon width={15} height={15} />
            <Typography className="!text-base">Bình chọn đã kết thúc!</Typography>
          </Box>
        )}

        <Box
          className="my-2"
          sx={{
            height: "2px",
            backgroundColor: "#ccc",
            elevation: 1
          }}
        />

        {voterNumber === 0 ? (
          <Typography className="!text-[#006EDC] !text-sm !mb-2">
            Chưa có người tham gia bình chọn!
          </Typography>
        ) : (
          <Typography className="!text-[#006EDC] !text-sm !mb-2">
            {voterNumber} người đã bình chọn.
          </Typography>
        )}

        <Box className="mb-2 space-y-2">{renderVoteItems}</Box>

        <Button
          size="small"
          className="w-full !mt-2 focus:!text-[#fff]"
          sx={{
            backgroundColor: "#006EDC",
            textAlign: "center",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#006EDC",
              color: "#fff",
              opacity: 0.8
            }
          }}
        >
          {vote?.status === VOTE_STATUS.OPEN ? (
            <Typography className="!text-sm">BÌNH CHỌN</Typography>
          ) : (
            <Typography className="!text-sm">XEM BÌNH CHỌN</Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
}

VoteItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  containerClassName: PropTypes.string
};

VoteItem.defaultProps = {
  containerClassName: ""
};

export default VoteItem;
