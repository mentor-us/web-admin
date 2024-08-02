/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
import React, { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AutoFixHigh } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import { Box, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { MentorUsDispatchContext, setDialogOpen } from "context";
import { getImageUrlWithKey, isCheckVideo } from "utils";

import SuggestDialog from "pages/WebUser/components/SuggestDialog";
import whisperServices from "service/whisperServices";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useDeleteMessageMutation } from "hooks/chats/mutation";
import useChatStore from "hooks/client/useChatStore";
import { GetGroupDetailKey } from "hooks/groups/keys";
import { usePinMessageMutation, useRemovePinMessageMutation } from "hooks/groups/mutation";
import { useGetGroupDetail } from "hooks/groups/queries";
import useMyInfo from "hooks/useMyInfo";
import { MESSAGE_TYPE } from "utils/constants";

import { ForwardContext } from "../../ForwardContext";

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
  const isMP3 = (url) => {
    const voiceMemoryExtensions = [".mp3", ".wav", ".m4a"];
    return voiceMemoryExtensions.some((extension) => url.toLowerCase().endsWith(extension));
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
  const dispatch = useContext(MentorUsDispatchContext);

  const onSuggest = () => {
    handleClose();
    setOpenSuggestDialog(true);
  };

  const handleSuggestDialogClose = () => {
    setOpenSuggestDialog(false);
  };

  const handleSuggestWhisper = (data) => {
    handleClose();
    setDialogOpen(dispatch, {
      open: true,
      content: data.text,
      currentChannelId: channelId
    });
  };

  const onConvertSpeechToText = async () => {
    handleClose();

    const loadingToastId = toast.loading("Đang chuyển đổi giọng nói...", {
      position: "bottom-right"
    });

    try {
      const fileUrl = getImageUrlWithKey(message?.file?.url);

      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Không thể tải tệp âm thanh");
      }

      const fileBlob = await response.blob();
      const file = new File([fileBlob], "audio.mp3", { type: "audio/mpeg" });

      const data = await whisperServices.transcribeAudio(file);
      console.log("Văn bản chuyển đổi:", data.text);

      toast(
        (t) => (
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#333"
              }}
            >
              Chuyển đổi giọng nói thành văn bản thành công
            </p>
            {/* <p
              style={{
                color: "#555",
                marginBottom: "10px",
                // whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 40px)", // Ensures it fits within the container
                padding: "5px 0"
              }}
              title={data.text} // Optional: shows full text on hover
            >
              {data.text}
            </p> */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  console.log("Văn bản chuyển đổi:", data.text);
                  toast.dismiss(t.id);
                  handleSuggestWhisper(data);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Mở file
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#cc0000")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
              >
                Đóng
              </button>
            </div>
          </div>
        ),
        {
          id: loadingToastId,
          position: "bottom-right",
          duration: Infinity
        }
      );
    } catch (error) {
      console.error("Lỗi khi chuyển đổi giọng nói thành văn bản:", error);
      toast.error("Chuyển đổi giọng nói thành văn bản thất bại", {
        id: loadingToastId,
        position: "bottom-right",
        style: {
          minWidth: "400px",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }
      });
    }
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
        {message?.type === MESSAGE_TYPE.FILE && isMP3(message?.file.filename) && (
          <Tooltip title="Sử dụng whisper AI" placement="top">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              className="hover:!bg-[#d5d5d5] !w-7 !h-7"
              onClick={onConvertSpeechToText}
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
        {(message.type !== "IMAGE" || !isCheckVideo(message.images[0].url)) && (
          <MenuItem className="!font-normal !text-black" onClick={onForwardMessage}>
            Chuyển tiếp
          </MenuItem>
        )}

        {/* {Array.isArray(message.images) &&
          message.images.length > 0 &&
          !isCheckVideo(message.images[0].url) && (
            <MenuItem className="!font-normal !text-black" onClick={onForwardMessage}>
              Chuyển tiếp
            </MenuItem>
          )} */}

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
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default FloatingOptions;
