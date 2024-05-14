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

function ForwardMessageDialog({ open, handleClose, message = null }) {
  const [listChannel, setListChannel] = useState([]);
  const onCancel = () => {
    handleClose();
  };
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
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
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </div>
          <div className="h-80">List Channel</div>
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
        <Button type="submit" disabled={!listChannel.length} onClick={() => setListChannel([])}>
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
