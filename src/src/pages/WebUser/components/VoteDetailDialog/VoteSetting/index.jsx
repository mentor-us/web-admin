/* eslint-disable react/forbid-prop-types */
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { GetGroupDetailKey } from "hooks/groups/keys";
import { usePinMessageMutation, useRemovePinMessageMutation } from "hooks/groups/mutation";
import { useGetGroupDetail } from "hooks/groups/queries";
import { GetAllVotesInChannelKey, GetVoteDetailKey } from "hooks/votes/key";
import { useToggleBlockVote } from "hooks/votes/mutation";
import { VOTE_STATUS } from "utils/constants";

function VoteSetting({ message, vote }) {
  const { channelId } = useParams();
  const queryClient = useQueryClient();
  const { data: channelDetail } = useGetGroupDetail(channelId);
  const { mutateAsync: pinMessageAsync } = usePinMessageMutation();
  const { mutateAsync: unpinMessageAsync } = useRemovePinMessageMutation();
  const { mutateAsync: toggleVoteStatusAssync } = useToggleBlockVote();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPinMessage = () => {
    if (channelDetail?.pinnedMessageIds.includes(message.id)) {
      toast.error("Tin nhắn này đã được ghim!", {
        style: {
          minWidth: "400px"
        }
      });
      return;
    }

    if (channelDetail?.pinnedMessages.length >= 5) {
      toast.error("Bạn chỉ có thể ghim tối đa 5 tin nhắn!", {
        style: {
          minWidth: "400px"
        }
      });
      return;
    }

    pinMessageAsync(
      {
        channelId,
        messageId: message.id
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: GetGroupDetailKey(channelId)
          });

          toast.success("Ghim tin nhắn thành công", {
            style: {
              minWidth: "400px"
            }
          });
        }
      }
    );
    handleClose();
  };

  const onUnpinMessage = async () => {
    unpinMessageAsync(
      {
        channelId,
        messageId: message?.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetGroupDetailKey(channelId)
          });
          toast.success("Bỏ ghim bình chọn thành công", {
            style: {
              minWidth: "400px"
            }
          });
        },
        onError: () => {}
      }
    );
    handleClose();
  };

  const toggleBlockVote = () => {
    toggleVoteStatusAssync(
      {
        voteId: vote?.id,
        currentStatus: vote?.status
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetAllChatMessageInfinityKey(channelId)
          });
          queryClient.invalidateQueries({
            queryKey: GetAllVotesInChannelKey(channelId)
          });
          queryClient.invalidateQueries({
            queryKey: GetVoteDetailKey(vote?.id)
          });
        }
      }
    );
    handleClose();
  };

  if (!message) {
    return null;
  }

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        className="border"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
        slotProps={{
          paper: {
            className: "!p-2 !border !shadow-lg !drop-shadow-lg"
          }
        }}
      >
        <MenuItem
          className="!font-normal !text-black"
          onClick={
            channelDetail?.pinnedMessageIds.includes(message?.id) ? onUnpinMessage : onPinMessage
          }
        >
          {channelDetail?.pinnedMessageIds.includes(message?.id) ? "Bỏ ghim " : "Ghim "}
          bình chọn
        </MenuItem>
        <MenuItem className="!font-normal !text-black" onClick={toggleBlockVote}>
          {vote?.status === VOTE_STATUS.OPEN ? "Khóa " : "Mở khóa "}
          bình chọn
        </MenuItem>
      </Menu>
    </>
  );
}

VoteSetting.defaultProps = {
  message: null
};

VoteSetting.propTypes = {
  message: PropTypes.object,
  vote: PropTypes.object.isRequired
};

export default VoteSetting;
