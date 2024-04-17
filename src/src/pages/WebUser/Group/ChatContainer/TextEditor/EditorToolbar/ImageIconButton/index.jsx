/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
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
import { MediaIcon } from "assets/svgs";
import MessageApi from "api/MessageApi";

import { useMessageQueryState } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import useMyInfo from "hooks/useMyInfo";
import {
  INIT_TOTAL_REACTION,
  LIMIT_IMAGES,
  MAX_FILE_IMAGE_SIZE,
  MESSAGE_TYPE,
  SUPPORTED_IMAGE_EXT
} from "utils/constants";

function ImageIconButton({ channelId }) {
  const myInfo = useMyInfo();
  const { manualAddNewMessage, updateNewImageMessageStatus } = useMessageQueryState(channelId);

  const { openFilePicker, loading } = useFilePicker({
    accept: SUPPORTED_IMAGE_EXT,
    readAs: "DataURL",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: LIMIT_IMAGES }),
      new FileTypeValidator(SUPPORTED_IMAGE_EXT.map((ext) => ext.substring(1))),
      new FileSizeValidator({ maxFileSize: MAX_FILE_IMAGE_SIZE * 1024 * 1024 /* 5 MB */ })
    ],
    onFilesRejected: ({ errors }) => {
      if (errors.length === 1) {
        const { reason } = errors[0];
        if (reason === "FILE_TYPE_NOT_ACCEPTED") {
          toast.error("Định dạng file không được hỗ trợ");
        } else if (reason === "MAX_AMOUNT_OF_FILES_EXCEEDED") {
          toast.error(`Chỉ được gửi tối đa ${LIMIT_IMAGES} ảnh`);
        } else if (reason === "FILE_SIZE_TOO_LARGE") {
          toast.error(`Vượt quá ${MAX_FILE_IMAGE_SIZE}MB`);
        }
      }
    },
    onFilesSuccessfullySelected: async ({ plainFiles, filesContent }) => {
      if (filesContent.length !== 0) {
        const message = {
          id: `${uuidv4().toString()}`,
          content: "",
          createdDate: new Date().toString(),
          groupId: channelId,
          sender: myInfo,
          type: MESSAGE_TYPE.IMAGE,
          totalReaction: INIT_TOTAL_REACTION,
          images: filesContent.map((file) => ({
            type: MESSAGE_TYPE.IMAGE,
            url: file.content,
            isUploading: true
          })),
          reactions: []
        };

        manualAddNewMessage(message);

        // Upload file
        MessageApi.sendImagesMessage({
          messageId: message.id,
          images: plainFiles,
          groupId: channelId,
          senderId: myInfo.id
        }).then((uploaded) => {
          setTimeout(() => {
            updateNewImageMessageStatus(message, uploaded);
          }, 1000);
        });
      }
    }
  });

  return (
    <Tooltip title="Gửi ảnh" placement="top">
      <IconButton onClick={() => openFilePicker()}>
        {loading ? (
          <CircularProgress color="info" size={30} />
        ) : (
          <MediaIcon width={30} height={30} />
        )}
      </IconButton>
    </Tooltip>
  );
}

ImageIconButton.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default ImageIconButton;
