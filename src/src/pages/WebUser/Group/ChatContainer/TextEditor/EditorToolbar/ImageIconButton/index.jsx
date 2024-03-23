/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { CircularProgress, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useFilePicker } from "use-file-picker";
import { FileAmountLimitValidator, FileSizeValidator } from "use-file-picker/validators";

import { v4 as uuidv4 } from "uuid";
import { MediaIcon } from "assets/svgs";
import MessageApi from "api/MessageApi";

import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import useMyInfo from "hooks/useMyInfo";

const SUPPORTED_IMAGE_EXT = [
  ".jpg",
  ".jpeg",
  ".jpe",
  ".jif",
  ".jfif",
  ".jfi",
  ".png",
  ".gif",
  ".webp",
  ".tiff",
  ".tif",
  ".heif",
  ".heic"
];

const NO_LIMIT_IMAGES = 5; // Max 5 image can send

const MAX_FILE_IMAGE_SIZE = 5; // 5MB

function ImageIconButton({ channelId }) {
  const queryClient = useQueryClient();
  const myInfo = useMyInfo();

  const { openFilePicker, loading } = useFilePicker({
    accept: "image/*",
    readAs: "DataURL",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: NO_LIMIT_IMAGES }),
      // new FileTypeValidator(SUPPORTED_IMAGE_EXT),
      new FileSizeValidator({ maxFileSize: MAX_FILE_IMAGE_SIZE * 1024 * 1024 /* 5 MB */ })
    ],
    onFilesRejected: ({ errors }) => {
      if (errors.length === 1) {
        const { reason } = errors[0];
        if (reason === "FILE_TYPE_NOT_ACCEPTED") {
          toast.error("Định dạng file không được hỗ trợ");
        } else if (reason === "MAX_AMOUNT_OF_FILES_EXCEEDED") {
          toast.error(`Chỉ được gửi tối đa ${NO_LIMIT_IMAGES} ảnh`);
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
          groupId: channelId.id,
          sender: myInfo,
          type: "IMAGE",
          totalReaction: {
            data: [],
            ownerReacted: [],
            total: 0
          },
          images: filesContent.map((file) => ({
            type: "IMAGE",
            url: file.content,
            isUploading: true
          })),
          reactions: []
        };

        queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
          if (data?.pages) {
            data?.pages[0].unshift(message);
          }

          return {
            pages: data.pages,
            pageParams: data.pageParams
          };
        });

        // Upload file
        MessageApi.sendImagesMessage({
          messageId: message.id,
          images: plainFiles,
          groupId: channelId,
          senderId: myInfo.id
        }).then((uploaded) => {
          setTimeout(() => {
            queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
              const pages = [...data.pages];

              if (pages && pages.length >= 1) {
                // eslint-disable-next-line no-param-reassign
                pages[0] = [
                  ...pages[0].map((item) => {
                    if (item.id === message.id) {
                      return {
                        ...item,
                        uploadFailed: !uploaded,
                        images: item.images?.map((img) => ({
                          ...img,
                          isUploading: false
                        }))
                      };
                    }

                    return item;
                  })
                ];
              }

              return {
                pages,
                pageParams: data.pageParams
              };
            });
          }, 1000);
        });
      }
    }
  });

  return (
    <IconButton onClick={() => openFilePicker()}>
      {loading ? <CircularProgress color="info" size={30} /> : <MediaIcon width={30} height={30} />}
    </IconButton>
  );
}

ImageIconButton.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default ImageIconButton;
