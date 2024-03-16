/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { Avatar, IconButton, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import { useGetWorkSpace } from "hooks/groups/queries";

function ChatContainerHeader({
  isOpenChannelInfo,
  toggleOpenChannelInfo,
  channelName,
  isLoadingGroupDetail
}) {
  const { groupId } = useParams();
  const { data: workspace, isLoading } = useGetWorkSpace(groupId);

  return (
    <div className="flex flex-row justify-between items-center bg-white sticky px-4 h-16">
      <div className="flex justify-center items-center space-x-2 max-w-md">
        {isLoading ? (
          <Skeleton variant="circular" width={48} height={48} />
        ) : (
          <AsyncMDAvatar alt="Remy Sharp" src={workspace?.imageUrl} />
        )}
        {!isLoadingGroupDetail && <Typography className="line-clamp-1">{channelName}</Typography>}
      </div>
      <div className="flex justify-center items-center text-white">
        <IconButton
          size="medium"
          variant="text"
          color={isOpenChannelInfo ? "info" : "default"}
          onClick={() => toggleOpenChannelInfo()}
        >
          <ViewSidebarOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

ChatContainerHeader.propTypes = {
  channelName: PropTypes.string,
  isOpenChannelInfo: PropTypes.bool,
  toggleOpenChannelInfo: PropTypes.func,
  isLoadingGroupDetail: PropTypes.bool
};

ChatContainerHeader.defaultProps = {
  channelName: "",
  isOpenChannelInfo: false,
  toggleOpenChannelInfo: null,
  isLoadingGroupDetail: false
};

export default ChatContainerHeader;
