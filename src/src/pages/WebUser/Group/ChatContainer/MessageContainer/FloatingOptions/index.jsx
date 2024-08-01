/* eslint-disable react/forbid-prop-types */
import React, { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AutoFixHigh } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import { Box, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import SuggestDialog from "pages/WebUser/components/SuggestDialog";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useDeleteMessageMutation } from "hooks/chats/mutation";
import useChatStore from "hooks/client/useChatStore";
import { GetGroupDetailKey } from "hooks/groups/keys";
import { usePinMessageMutation, useRemovePinMessageMutation } from "hooks/groups/mutation";
import { useGetGroupDetail } from "hooks/groups/queries";
import useMyInfo from "hooks/useMyInfo";
import { MESSAGE_TYPE } from "utils/constants";

import { ForwardContext } from "../../ForwardContext";

// import ForwardMessageDialog from "../ForwardMessageDialog";

const ITEM_HEIGHT = 48;

function FloatingOptions({ message, isShow }) {
  const myInfo = useMyInfo();
  const [openSuggestDialog, setOpenSuggestDialog] = useState(false);

  const { channelId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const { data: channelDetail } = useGetGroupDetail(channelId);
  const { mutateAsync: pinMessageAsync } = usePinMessageMutation();
  const { mutateAsync: unpinMessageAsync } = useRemovePinMessageMutation();
  const { mutateAsync: deleteMessageAsync } = useDeleteMessageMutation();
  const forward = useContext(ForwardContext);
  const chatStore = useChatStore();
  const isOwner = useMemo(() => myInfo?.id === message?.sender?.id, [message, myInfo]);

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
          queryClient.invalidateQueries({
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

  const onUnpinMessage = () => {
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
          toast.success("Bỏ ghim tin nhắn thành công", {
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

  const onDeleteMessage = () => {
    deleteMessageAsync(
      { messageId: message?.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetAllChatMessageInfinityKey(channelId)
          });
          if (chatStore.isReplyMessage) {
            chatStore.clearReplyMessage();
          }
          if (chatStore.isEditMessage) {
            chatStore.clearEditMessage();
          }
        },
        onError: () => {}
      }
    );
    handleClose();
  };
  const onForwardMessage = () => {
    forward(message);
    handleClose();
  };
  const onEditMessage = () => {
    chatStore.setIsEditMessage(true);
    chatStore.setEditMessage(message);
  };

  const onReplyClick = () => {
    chatStore.setIsReplyMessage(true);
    chatStore.setReplyMessage(message);
    handleClose();
  };

  const onSuggest = () => {
    handleClose();
    setOpenSuggestDialog(true);
  };

  const handleSuggestDialogClose = () => {
    setOpenSuggestDialog(false);
  };
  const isVideo = (mes) => {
    const url = mes?.images?.[0]?.url ?? "";
    return url.toLowerCase().endsWith(".mp4");
  };
  return (
    <Box
      className={`bg-transparent !z-0 ${isOwner ? "mr-2" : "ml-2"} ${
        isShow ? "inline-block" : "opacity-0"
      }`}
    >
      <Stack
        className="h-full "
        spacing={1}
        direction={isOwner ? "row-reverse" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        {message?.type === MESSAGE_TYPE.TEXT && (
          <Tooltip title="Trả lời" placement="top">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              className="hover:!bg-[#d5d5d5] !w-7 !h-7"
              onClick={onReplyClick}
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Xem thêm" placement="top">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="hover:!bg-[#d5d5d5] !w-7 !h-7"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        {message?.type === MESSAGE_TYPE.TEXT && (
          <Tooltip title="Đề xuất" placement="top">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              className="hover:!bg-[#d5d5d5] !w-7 !h-7"
              onClick={onSuggest}
            >
              <AutoFixHigh
                sx={{
                  width: "20px",
                  height: "20px"
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            maxHeight: ITEM_HEIGHT * 4.5,
            sx: {
              backgroundColor: "red",
              padding: "6px"
            },
            width: "20ch"
          }
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        {message?.sender?.id === myInfo?.id && (
          <MenuItem className="!font-normal !text-black" onClick={onDeleteMessage}>
            Xóa
          </MenuItem>
        )}
        {message?.sender?.id === myInfo?.id && message?.type === MESSAGE_TYPE.TEXT && (
          <MenuItem className="!font-normal !text-black" onClick={onEditMessage}>
            Chỉnh sửa
          </MenuItem>
        )}
        {!isVideo(message) && (
          <MenuItem className="!font-normal !text-black" onClick={onForwardMessage}>
            Chuyển tiếp
          </MenuItem>
        )}

        <MenuItem
          className="!font-normal !text-black"
          onClick={
            channelDetail?.pinnedMessageIds.includes(message?.id) ? onUnpinMessage : onPinMessage
          }
        >
          {channelDetail?.pinnedMessageIds.includes(message?.id) ? "Bỏ ghim " : "Ghim "}
        </MenuItem>
      </Menu>
      {openSuggestDialog && (
        <SuggestDialog
          open={openSuggestDialog}
          onClose={handleSuggestDialogClose}
          content={message?.content}
        />
      )}
    </Box>
  );
}

FloatingOptions.defaultProps = {
  isShow: false
};

FloatingOptions.propTypes = {
  isShow: PropTypes.bool,
  message: PropTypes.object.isRequired
};

export default FloatingOptions;
