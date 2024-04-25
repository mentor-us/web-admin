/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, List, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { useGetGroupDetail } from "hooks/groups/queries";

import PinMessageItem from "./PinItems";

function PinMessageContainer(props) {
  const { channelId } = useParams();
  const { data: channelInfo } = useGetGroupDetail(channelId);
  const [isExpanded, setIsExpanded] = useState(false);

  const onShowMore = () => {
    setIsExpanded(true);
  };

  const onShowLess = () => {
    setIsExpanded(false);
  };

  return (
    <div className="h-12 w-full bg-white border-t-2 px-4 border-b-2 flex items-center relative">
      {!isExpanded ? (
        <>
          <Box className="hover:cursor-pointer w-full">
            <PinMessageItem message={channelInfo?.pinnedMessages[0]} />
          </Box>
          {channelInfo?.pinnedMessages.length > 1 && (
            <Box
              className="w-fit ml-2 hover:bg-[#e5efff]"
              sx={{
                minWidth: "8rem",
                height: "24px",
                fontSize: ".875rem",
                borderRadius: "3px",
                cursor: "pointer",
                padding: "0 16px",
                backgroundColor: "transparent",
                color: "#0068ff",
                border: "1px solid #0068ff"
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                onClick={onShowMore}
              >
                <span>{(channelInfo?.pinnedMessages.length || 1) - 1} ghim khác</span>
                <ArrowDropDownIcon />
              </Stack>
            </Box>
          )}
        </>
      ) : (
        <div className="absolute top-0 left-0 right-0 z-50 bg-white h-fit">
          <Stack>
            <Stack
              className="px-4 py-1 bg-[#eaedf0]"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="!text-xs">Danh sách ghim</Typography>
              <Stack
                className="cursor-pointer"
                direction="row"
                alignItems="center"
                onClick={onShowLess}
              >
                <Typography className="!text-xs mr-1">Thu gọn</Typography>
                <ArrowDropUpIcon />
              </Stack>
            </Stack>
            <List>
              {channelInfo?.pinnedMessages.map((message) => {
                return (
                  <Box className="mb-1 hover:!bg-[#f3f5f6] px-4 py-2 cursor-pointer">
                    <PinMessageItem key={message.id} message={message} />
                  </Box>
                );
              })}
            </List>
          </Stack>
        </div>
      )}
    </div>
  );
}

PinMessageContainer.propTypes = {};

export default PinMessageContainer;
