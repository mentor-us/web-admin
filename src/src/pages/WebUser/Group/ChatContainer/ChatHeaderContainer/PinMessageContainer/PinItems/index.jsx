/* eslint-disable simple-import-sort/imports */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import { PinnedMessageIcon } from "assets/svgs";

import { MESSAGE_TYPE } from "utils/constants";
import { useParams } from "react-router-dom";
import { useRemovePinMessageMutation } from "hooks/groups/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { GetGroupDetailKey } from "hooks/groups/keys";
import { images as imagesStatic } from "assets/images";
import PinVote from "./PinVote";
import TextMessage from "./TextMessage";

function PinMessageItem({ message }) {
  const { channelId } = useParams();
  const { mutateAsync } = useRemovePinMessageMutation();
  const queryClient = useQueryClient();

  const renderPinMessage = () => {
    switch (message?.type) {
      case MESSAGE_TYPE.TEXT:
        return <TextMessage message={message} />;
      case MESSAGE_TYPE.IMAGE: {
        const searchParams = new URLSearchParams();
        const { images } = message;
        if (!images || images.length === 0) {
          return null;
        }
        searchParams.append("key", images[0]?.url ?? "");

        return (
          <Box>
            <Typography className="!text-xs !font-bold">
              [Hình ảnh] - {message?.images.length} ảnh
            </Typography>
            <Typography className="!line-clamp-1 !text-xs !text-[#7589A3]">{`Tin nhắn của ${message.sender.name}`}</Typography>
          </Box>
        );
      }
      case MESSAGE_TYPE.VOTE: {
        return <PinVote message={message} />;
      }
      case MESSAGE_TYPE.FILE:
        return (
          <Box>
            <Typography className="!text-xs !font-bold !line-clamp-1">
              [Tập tin] - {message?.file?.filename}
            </Typography>
            <Typography className="!line-clamp-1 !text-xs !text-[#7589A3]">{`Tin nhắn của ${message.sender.name}`}</Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  const renderIcon = () => {
    switch (message?.type) {
      case MESSAGE_TYPE.VOTE: {
        return (
          <img
            src={imagesStatic.ColumnChartImage}
            alt="Chart icon"
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
        );
      }

      default:
        return (
          <Box className="mr-2">
            <PinnedMessageIcon />
          </Box>
        );
    }
  };

  const unpinMessage = async () => {
    mutateAsync(
      {
        channelId,
        messageId: message?.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetGroupDetailKey(channelId)
          });
        },
        onError: () => {}
      }
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      className="[&_*]:!z-20 !w-full flex-1"
      spacing={1}
    >
      <Box>{renderIcon()}</Box>
      <Box className="!w-[80%] flex-grow">{renderPinMessage()}</Box>
      <Tooltip title="Bỏ ghim">
        <IconButton className="hover:!bg-gray-200 !w-8 !h-8" onClick={unpinMessage}>
          <ClearIcon color="error" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

PinMessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default PinMessageItem;
