import ChannelApi from "api/ChannelApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getChannelMembers = (groupId) => ChannelApi.getChannelMember(groupId);
const getChannelMedia = (groupId) => ChannelApi.getChannelMedia(groupId);

const channelService = {
  getChannelMembers,
  getChannelMedia
};
export default ErrorWrapper(channelService);
