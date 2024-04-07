/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { images } from "assets/images";
import { LockRedIcon } from "assets/svgs";

import VoteDetailDialog from "pages/WebUser/components/VoteDetailDialog";
import useMyInfo from "hooks/useMyInfo";
import { VOTE_STATUS } from "utils/constants";

function VoteItem({ message, containerClassName }) {
  const myInfo = useMyInfo();
  const [openVoteDetail, setOpenVoteDetail] = useState(false);

  let { vote } = message;
  if (!vote) {
    vote = message;
  }

  const [noOfDiffVoters, voteTotal] = useMemo(() => {
    const allVotersId = vote.choices.flatMap((choice) => choice.voters);

    if (allVotersId.every((item) => typeof item === "string" || item instanceof String)) {
      return [new Set(allVotersId).size, allVotersId.length];
    }

    return [new Set(allVotersId.flatMap((voter) => voter.id)).size, allVotersId.length];
  }, [vote]);

  const renderVoteItems = useMemo(
    () =>
      vote?.choices.map((item) => {
        let votePercent = "0%";
        if (voteTotal) {
          votePercent = `${((item.voters.length / voteTotal) * 100).toFixed(2)}%`;
        }

        return (
          <Box className="vote-message-item h-8" key={item.id}>
            <motion.div
              className="vote-percent-line !z-10"
              initial={{ width: votePercent }}
              animate={{
                width: votePercent
              }}
              transition={{
                duration: 0.2
              }}
            />
            <Box className="vote-option-text line-clamp-2 !z-20">
              <Tooltip title={item.name}>
                <Typography className="!text-sm">{item.name}</Typography>
              </Tooltip>
            </Box>
            <Stack className="!z-20" direction="row" spacing={1}>
              {(item.voters.includes(myInfo.id) ||
                item.voters.flatMap((voter) => voter.id).includes(myInfo.id)) && (
                <CheckCircleIcon className="!z-20" color="info" />
              )}
              <Typography className="vote-option-number line-clamp-1 !text-sm">
                {item.voters.length}
              </Typography>
            </Stack>
          </Box>
        );
      }),
    [vote?.choices, voteTotal]
  );

  return (
    <>
      <Box
        className="vote-message-container cursor-pointer"
        onClick={() => setOpenVoteDetail(true)}
      >
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
            <Box
              marginTop={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
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

          {voteTotal === 0 ? (
            <Typography className="!text-[#006EDC] !text-sm !mb-2">
              Chưa có người tham gia bình chọn!
            </Typography>
          ) : (
            <Typography className="!text-[#006EDC] !text-sm !mb-2">
              {noOfDiffVoters} người đã bình chọn.
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
      {openVoteDetail && (
        <VoteDetailDialog
          open={openVoteDetail}
          handleClose={() => setOpenVoteDetail(false)}
          voteId={vote?.id}
        />
      )}
    </>
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
