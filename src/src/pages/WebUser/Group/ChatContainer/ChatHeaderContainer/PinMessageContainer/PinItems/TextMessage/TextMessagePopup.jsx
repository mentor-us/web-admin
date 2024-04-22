/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import DOMPurify from "dompurify";
import { convertToPlain } from "utils";
import { CloseFillIcon } from "assets/svgs";

function TextMessagePopup({ open, handleClose, message }) {
  const onCancel = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      component={motion.div}
      PaperProps={{
        sx: "!p-0"
      }}
      scroll="body"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle className="!px-0 !py-2">
        <Stack className="!px-4" direction="row" alignItems="center" justifyContent="space-between">
          <Typography className="!text-lg !font-semibold !text-[#333]">Tin nhắn</Typography>
          <IconButton onClick={onCancel} className="!p-0">
            <CloseFillIcon />
          </IconButton>
        </Stack>
        <Divider className="!bg-black !mt-2 !mb-0 !mx-0" />
      </DialogTitle>
      <DialogContent className="!px-2 !py-2">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }} />
      </DialogContent>
      <Divider className="!bg-black !my-0" />
      <DialogActions className="!m-0 !my-2 !py-0">
        <Stack className="w-full" direction="row" justifyContent="space-between">
          <Tooltip title="Sao chép">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(convertToPlain(message.content));
                toast.success("Sao chép vào bộ nhớ đệm");
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Button onClick={onCancel}>Đóng</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

TextMessagePopup.defaultProps = {};

TextMessagePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};

export default TextMessagePopup;
