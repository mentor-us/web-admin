/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { images } from "assets/images";
import { LockRedIcon } from "assets/svgs";

const VOTE_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};

function VoteItem({ message }) {
  const { vote } = message;

  const voterNumber = vote?.choices
    .flatMap((choice) => choice.voters)
    .filter((value, index, array) => array.indexOf(value) === index).length;

  const renderVoteItems = useMemo(
    () =>
      vote?.choices.map((item) => {
        let votePercent = "0%";
        if (voterNumber) {
          votePercent = `${((item.voters.length / voterNumber) * 107).toFixed(2)}%`;
        }

        return (
          <Box key={item.id}>
            <Box />
            <Box>
              <Typography>{item.name}</Typography>
            </Box>
            <Box>
              <Typography>{item.voters.length}</Typography>
            </Box>
          </Box>
        );
      }),
    [vote?.choices, voterNumber]
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box className="bg-white rounded-md w-[70%] p-4">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <img
            src={images.ColumnChartImage}
            alt="Chart icon"
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
          <Typography className="font-bold color-[#333] text-base line-clamp-3">
            {vote?.question}
          </Typography>
        </Box>

        {vote?.status === VOTE_STATUS.CLOSED && (
          <Box>
            <LockRedIcon width={15} height={15} />
            <Typography>Bình chọn đã kết thúc!</Typography>
          </Box>
        )}

        <Box
          sx={{
            height: "2px",
            backgroundColor: "#ccc",
            elevation: 1,
            marginVertical: 5
          }}
        />

        {voterNumber === 0 ? (
          <Typography>Chưa có người tham gia bình chọn!</Typography>
        ) : (
          <Typography>{voterNumber} người đã bình chọn.</Typography>
        )}

        <Box>{renderVoteItems}</Box>
        {vote?.status === VOTE_STATUS.OPEN ? (
          <Button>
            <Typography>BÌNH CHỌN</Typography>
          </Button>
        ) : (
          <Button>
            <Typography>XEM BÌNH CHỌN</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}

VoteItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default VoteItem;
