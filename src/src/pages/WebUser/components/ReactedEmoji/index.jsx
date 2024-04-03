/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { Box, Stack, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import useMyInfo from "hooks/useMyInfo";
import { EMOJI_ICONS } from "utils/constants";

import ReactedEmojiDialog from "./ReactedEmojiDialog";

// eslint-disable-next-line no-unused-vars
function ReactedEmoji({ className, reactions, totalReaction }) {
  const myInfo = useMyInfo();
  const [open, setOpen] = useState(false);

  if (!totalReaction) {
    return null;
  }
  const { data, total } = totalReaction;

  const getTooltipText = () => {
    return reactions
      .map((react) => {
        if (react.userId === myInfo.id) {
          return "Bạn";
        }

        return react.name;
      })
      .join("\n");
  };

  if (!total || total === 0) return null;

  return (
    <>
      <div className={className}>
        <Tooltip
          title={
            <div style={{ whiteSpace: "pre-line", textAlign: "left" }}>{getTooltipText()}</div>
          }
          disableHoverListener={reactions.length === 0}
        >
          <Box onClick={() => setOpen(true)}>
            <Stack
              sx={{
                cursor: "pointer"
              }}
              direction="row"
              spacing={total > 99 ? 1 : 0}
              justifyItems="center"
              alignItems="center"
            >
              <Stack direction="row">
                {data?.map((emoji, index) => {
                  if (index > 2 || total < 1) return null;
                  return (
                    <img
                      // eslint-disable-next-line react/no-array-index-key
                      key={`reacted-emoji-icon-${index}-${emoji.id}`}
                      alt="emoji-icon"
                      src={EMOJI_ICONS[emoji.id]}
                      style={{
                        width: "14px",
                        height: "14px"
                      }}
                    />
                  );
                })}
              </Stack>
              <span className="text-xs">{total > 99 ? "99+" : total}</span>
            </Stack>
          </Box>
        </Tooltip>
      </div>
      <ReactedEmojiDialog open={open} handleClose={() => setOpen(false)} reactions={reactions} />
    </>
  );
}

ReactedEmoji.propTypes = {
  className: PropTypes.string,
  reactions: PropTypes.array,
  totalReaction: PropTypes.object
};

ReactedEmoji.defaultProps = {
  className: "",
  reactions: [],
  totalReaction: undefined
};

export default ReactedEmoji;
