/* eslint-disable import/no-unresolved */
import toast from "react-hot-toast";
import { CircularProgress, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileSizeValidator,
  FileTypeValidator
} from "use-file-picker/validators";

import { v4 as uuidv4 } from "uuid";
import { AttachmentIcon } from "assets/svgs";
import MessageApi from "api/MessageApi";

import { useMessageQueryState } from "hooks/channels/queries";
import useMyInfo from "hooks/useMyInfo";
import {
  INIT_TOTAL_REACTION,
  MAX_FILE_IMAGE_SIZE,
  MESSAGE_TYPE,
  SUPPORTED_FILE_UPLOAD,
  UPLOAD_STATUS
} from "utils/constants";

function FileIconButton({ channelId }) {
  const myInfo = useMyInfo();
  const { manualAddNewMessage, updateNewFileMessageStatus } = useMessageQueryState(channelId);

  const { openFilePicker, loading } = useFilePicker({
    accept: SUPPORTED_FILE_UPLOAD,
    readAs: "DataURL",
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(SUPPORTED_FILE_UPLOAD.map((ext) => ext.substring(1))),
      new FileSizeValidator({ maxFileSize: MAX_FILE_IMAGE_SIZE * 1024 * 1024 })
    ],
    onFilesRejected: ({ errors }) => {
      if (errors.length === 1) {
        const { reason } = errors[0];
        if (reason === "FILE_TYPE_NOT_ACCEPTED") {
          toast.error("Định dạng file không được hỗ trợ");
        } else if (reason === "MAX_AMOUNT_OF_FILES_EXCEEDED") {
          toast.error(`Chỉ được gửi tối đa ${1} tập tin`);
        } else if (reason === "FILE_SIZE_TOO_LARGE") {
          toast.error(`Vượt quá ${MAX_FILE_IMAGE_SIZE}MB`);
        }
      }
    },
    onFilesSuccessfullySelected: async ({ plainFiles, filesContent }) => {
      if (filesContent.length !== 0) {
        const uploadFile = plainFiles[0];
        const message = {
          id: `${uuidv4().toString()}`,
          content: "",
          createdDate: new Date().toString(),
          groupId: channelId,
          sender: myInfo,
          type: MESSAGE_TYPE.FILE,
          totalReaction: INIT_TOTAL_REACTION,
          file: {
            size: uploadFile.size,
            filename: uploadFile.name,
            path: uploadFile.path,
            uploadStatus: UPLOAD_STATUS.UPLOADING
          },
          reactions: []
        };

        manualAddNewMessage(message);

        toast.promise(
          new Promise((resolve, reject) => {
            MessageApi.sendFileMessage({
              messageId: message.id,
              groupId: channelId,
              senderId: myInfo.id,
              file: plainFiles[0]
            })
              .then((newUrl) => {
                setTimeout(() => {
                  updateNewFileMessageStatus(message, newUrl);
                  resolve();
                }, 1000);
              })
              .catch(reject);
          }),
          {
            loading: "Đang tải lên...",
            success: "Tải lên thành công",
            error: "Tải lên thất bại"
          },
          {
            style: {
              minWidth: "250px"
            }
          }
        );
      }
    }
  });

  return (
    <IconButton onClick={openFilePicker}>
      {loading ? (
        <CircularProgress color="info" size={30} />
      ) : (
        <AttachmentIcon width={30} height={30} />
      )}
    </IconButton>
  );
}

FileIconButton.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default FileIconButton;
