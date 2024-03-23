// Mutation Key
export const CreateChannelMutationKey = "create-channel";
export const DeleteChannelMutationKey = "delete-channel";

// Query Key
export const GetGroupsMembersKey = (groupId) => ["group-members", groupId];
export const GetChannelMembersKey = (channelId) => ["channel-members", channelId];
export const GetChannelMediaKey = (channelId) => ["channel-media", channelId];
