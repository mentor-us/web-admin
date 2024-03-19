import ChannelApi from "api/ChannelApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getChannelMembers = (groupId) => ChannelApi.getChannelMember(groupId);

const channelService = {
  getChannelMembers
};
export default ErrorWrapper(channelService);
