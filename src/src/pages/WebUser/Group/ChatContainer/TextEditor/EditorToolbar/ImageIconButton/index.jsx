/* eslint-disable import/no-unresolved */
import React, { forwardRef, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
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
import GroupApi from "api/GroupApi";
import MessageApi from "api/MessageApi";

import { GetChannelMediaKey } from "hooks/channels/keys";
import { GetAllHomeGroupInfinityKey, GetWorkspaceQueryKey } from "hooks/groups/keys";
import useMyInfo from "hooks/useMyInfo";
import {
  ACTION_IMAGE,
  INIT_TOTAL_REACTION,
  LIMIT_IMAGES,
  MAX_FILE_IMAGE_SIZE,
  MESSAGE_TYPE,
  SUPPORTED_IMAGE_EXT
} from "utils/constants";

const ImageIconButton = forwardRef(({ channelId, type = ACTION_IMAGE.SEND_IMAGE }, ref) => {
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const buttonRef = ref || useRef(null);

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

        // Upload file
        if (type === ACTION_IMAGE.SEND_IMAGE) {
          toast.promise(
            MessageApi.sendImagesMessage({
              messageId: message.id,
              images: plainFiles,
              groupId: channelId,
              senderId: myInfo.id
            }),
            {
              loading: "Đang tải lên...",
              success: () => {
                queryClient.refetchQueries({ queryKey: GetChannelMediaKey(channelId) });

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
        if (type === ACTION_IMAGE.UPDATE_AVATAR) {
          toast.promise(
            GroupApi.updateAvatarGroup({
              image: plainFiles[0],
              groupId: channelId
            }),
            {
              loading: "Đang tải lên...",
              success: () => {
                queryClient.invalidateQueries({ queryKey: GetWorkspaceQueryKey(groupId) });
                queryClient.refetchQueries({ queryKey: GetAllHomeGroupInfinityKey });

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
    }
  });

  return (
    <Tooltip title="Gửi ảnh" placement="top">
      <IconButton ref={buttonRef} onClick={() => openFilePicker()}>
        {loading ? (
          <CircularProgress color="info" size={30} />
        ) : (
          <MediaIcon width={30} height={30} />
        )}
      </IconButton>
    </Tooltip>
  );
});

ImageIconButton.propTypes = {
  channelId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string
};

export default ImageIconButton;
