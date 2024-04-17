/* eslint-disable react/forbid-prop-types */
import { useParams } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { CloseRoundIcon } from "assets/svgs";

import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useAddReactMutation, useRemoveReactMutation } from "hooks/chats/mutation";
import useMyInfo from "hooks/useMyInfo";
import { EMOJI_ICONS } from "utils/constants";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const emojiList = [
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.LIKE),
    src: EMOJI_ICONS.LIKE
  },
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.LOVE_EYE),
    src: EMOJI_ICONS.LOVE_EYE
  },
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.SMILE),
    src: EMOJI_ICONS.SMILE
  },
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.CRY_FACE),
    src: EMOJI_ICONS.CRY_FACE
  },
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.CURIOUS),
    src: EMOJI_ICONS.CURIOUS
  },
  {
    id: getKeyByValue(EMOJI_ICONS, EMOJI_ICONS.ANGRY_FACE),
    src: EMOJI_ICONS.ANGRY_FACE
  }
];

function ReactionBar({ className, message }) {
  const { mutateAsync: addReactionAsync } = useAddReactMutation();
  const { mutateAsync: removeReactionAsync } = useRemoveReactMutation();
  const queryClient = useQueryClient();
  const myInfo = useMyInfo();
  const { channelId } = useParams();

  const onAddReaction = (emojiId) => {
    addReactionAsync(
      {
        messageId: message.id,
        senderId: myInfo.id,
        emojiId
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetAllChatMessageInfinityKey(channelId)
          });
        }
      }
    );
  };

  const onRemoveReaction = () => {
    removeReactionAsync(
      {
        messageId: message.id,
        senderId: myInfo.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetAllChatMessageInfinityKey(channelId)
          });
        }
      }
    );
  };

  return (
    <motion.div className={className}>
      <Stack
        className="reaction-toolbar-emoji-list"
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        {emojiList.map((emoji, index) => {
          return (
            <motion.img
              onClick={() => onAddReaction(emoji.id)}
              // eslint-disable-next-line react/no-array-index-key
              key={`emoji-icon-${index}`}
              alt="emoji-icon"
              src={emoji.src}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.1 }}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1
                },
                hidden: {
                  opacity: 0,
                  scale: 0
                }
              }}
              style={{
                width: "24px",
                height: "24px"
              }}
            />
          );
        })}
      </Stack>
      {message.totalReaction.ownerReacted.length > 0 && (
        <IconButton className="!p-0 !ml-2" onClick={onRemoveReaction}>
          <CloseRoundIcon width={24} height={24} />
        </IconButton>
      )}
    </motion.div>
  );
}

ReactionBar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

ReactionBar.defaultProps = {
  className: ""
};

export default ReactionBar;
