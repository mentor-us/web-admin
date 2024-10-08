/* eslint-disable import/no-unresolved */
import toast from "react-hot-toast";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileSizeValidator,
  FileTypeValidator
} from "use-file-picker/validators";

import { v4 as uuidv4 } from "uuid";
import { AttachmentIconNoBG } from "assets/svgs";
import MessageApi from "api/MessageApi";

import { GetChannelMediaKey } from "hooks/channels/keys";
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
  const queryClient = useQueryClient();

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

        toast.promise(
          MessageApi.sendFileMessage({
            messageId: message.id,
            groupId: channelId,
            senderId: myInfo.id,
            file: plainFiles[0]
          }),
          {
            loading: "Đang tải lên...",
            success: () => {
              queryClient.refetchQueries({
                queryKey: GetChannelMediaKey(channelId)
              });
              return "Tải lên thành công";
            },
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
    <Tooltip title="Gửi tập tin" placement="top">
      <IconButton onClick={openFilePicker}>
        {loading ? (
          <CircularProgress color="info" size={30} />
        ) : (
          <AttachmentIconNoBG width={30} height={30} />
        )}
      </IconButton>
    </Tooltip>
  );
}

FileIconButton.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default FileIconButton;
