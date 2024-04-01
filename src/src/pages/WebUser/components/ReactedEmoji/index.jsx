/* eslint-disable react/forbid-prop-types */
import { Stack } from "@mui/material";
import PropTypes from "prop-types";

import { EMOJI_ICONS } from "utils/constants";

function ReactedEmoji({ className, reactions }) {
  if (!reactions) {
    return null;
  }
  const { data, total } = reactions;

  if (!total || total === 0) return null;

  return (
    <div className={className}>
      <Stack direction="row" spacing={total > 99 ? 1 : 0} justifyItems="center" alignItems="center">
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
    </div>
  );
}

ReactedEmoji.propTypes = {
  className: PropTypes.string,
  reactions: PropTypes.object
};

ReactedEmoji.defaultProps = {
  className: "",
  reactions: undefined
};

export default ReactedEmoji;
