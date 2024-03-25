import ChannelApi from "api/ChannelApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const createChannel = (channel) => ChannelApi.createChannel(channel);
const getAllChannelsByGroupId = (groupId) => ChannelApi.getAllChannelsByGroupId(groupId);
const getChannelMembers = (groupId) => ChannelApi.getChannelMember(groupId);
const getChannelMedia = (groupId) => ChannelApi.getChannelMedia(groupId);
const deleteChannel = (channelId) => ChannelApi.deleteChannel(channelId);

const channelService = {
  createChannel,
  getAllChannelsByGroupId,
  getChannelMembers,
  getChannelMedia,
  deleteChannel
};
export default ErrorWrapper(channelService);
