import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import channelService from "service/channelService";
import { useGetAllChannelsCanForward } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";

import ChannelCheckBox from "./ChannelCheckBox";

function generateData(numItems) {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numItems; i++) {
    const item = {
      id: `id_${i}`,
      name: `name_${i}`,
      group: {
        id: `group_id_${i}`,
        name: `group_name_${i}`,
        imageUrl: `https://example.com/image_${i}.jpg`
      },
      groupName: `group_name_${i}`
    };
    data.push(item);
  }
  return data;
}
function ForwardMessageDialog({ open, handleClose, message = null }) {
  const [textSearch, setTextSearch] = useState("");
  const [listChannelForward, setListChannelForward] = useState([]);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: listChannel } = useGetAllChannelsCanForward(search.trim());
  const queryClient = useQueryClient();
  const param = useParams();
  const channelIdFw = param.channelId;
  const onCancel = () => {
    handleClose();
  };
  const submitForm = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        channelService
          .forward(message.id, listChannelForward)
          .then(() => {
            handleClose();
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelIdFw)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: `Đang chuyển tiếp tin nhắn...`,
        success: `Chuyển tiếp tin nhắn thành công`,
        error: `Chuyển tiếp tin nhắn thất bại`
      }
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (isSubmitting) {
      const submitAsync = async () => {
        await submitForm();
      };
      submitAsync();
    }
  }, [isSubmitting]);
  const toggleChoseChannel = (channelId) => {
    if (listChannelForward.includes(channelId)) {
      // eslint-disable-next-line eqeqeq
      setListChannelForward((pre) => pre.filter((id) => id != channelId));
    } else {
      setListChannelForward((pre) => [...pre, channelId]);
    }
  };
  // eslint-disable-next-line no-shadow
  const getContentFw = (msg) => {
    switch (msg.type) {
      case "TEXT":
        return msg.content;
      case "IMAGE":
        return `Chuyển tiếp ${message.images?.length} hình ảnh`;
      case "FILE":
        return "Chuyển tiếp 1 file";
      default:
        return msg.content;
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      if (search !== textSearch) {
        setSearch(textSearch);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [textSearch]);
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={onCancel}
      PaperProps={{
        component: "form",
        className: "!px-2 text-black"
      }}
    >
      <DialogTitle alignSelf="center">Chuyển tiếp tin nhắn</DialogTitle>
      <hr />
      <DialogContent>
        <div className="flex flex-col">
          <div className="w-full">
            <TextField
              id="outlined-basic"
              value={textSearch}
              onChange={(event) => setTextSearch(event.target.value)}
              fullWidth
              label="TÌm kiếm nhóm cần chuyển tiếp"
              variant="outlined"
              type="search"
            />
          </div>
          <div className="flex flex-col h-80 overflow-y-scroll p-4 gap-y-2">
            {
              // eslint-disable-next-line array-callback-return
              (listChannel ?? generateData(15)).map((channel) => {
                return (
                  <ChannelCheckBox
                    key={`check-box-${channel.id}`}
                    channel={channel}
                    listChannelForward={listChannelForward}
                    toggleChoseChannel={toggleChoseChannel}
                  />
                );
              })
            }
          </div>
          <hr />
          <div className="p-2 text-black">
            <strong>Nội dung chuyển tiếp</strong>
          </div>
          <div className="div max-h-24 overflow-y-scroll pl-2 pr-2">
            <div
              className="bg-slate-50 p-3 text-black"
              dangerouslySetInnerHTML={{ __html: getContentFw(message) }}
            />
          </div>
        </div>
      </DialogContent>
      <hr />
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button
          type="submit"
          disabled={isSubmitting || !listChannel || !listChannel.length}
          onClick={(event) => handleSubmit(event)}
        >
          Chuyển tiếp
        </Button>
      </DialogActions>
    </Dialog>
  );
}
ForwardMessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default ForwardMessageDialog;
