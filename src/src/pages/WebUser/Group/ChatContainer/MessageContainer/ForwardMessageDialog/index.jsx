import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import PropTypes from "prop-types";

import { useGetAllChannelsCanForward } from "hooks/channels/queries";

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
  const { data: listChannel } = useGetAllChannelsCanForward(textSearch);
  // console.log("listChannel");
  // console.log(listChannel);

  const onCancel = () => {
    handleClose();
  };
  const handleSubmit = () => {
    console.log("Submit");
    setListChannelForward();
    console.log(listChannelForward);
  };
  const toggleChoseChannel = (channelId) => {
    console.log("listChannelForward");
    console.log(listChannelForward.includes(channelId));
    if (listChannelForward.includes(channelId)) {
      // eslint-disable-next-line eqeqeq
      setListChannelForward((pre) => pre.filter((id) => id != channelId));
    } else {
      setListChannelForward((pre) => [...pre, channelId]);
    }
  };
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
              onChange={(text) => setTextSearch(text)}
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
          <div className="div h-24 overflow-y-scroll pl-2 pr-2">
            <div
              className="bg-slate-50 p-3 text-black"
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          </div>
        </div>
      </DialogContent>
      <hr />
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button
          type="submit"
          disabled={!listChannel || !listChannel.length}
          onClick={() => handleSubmit([])}
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
