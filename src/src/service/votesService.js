import VoteApi from "api/VoteApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllVotesByGroupId = (channelId) => VoteApi.getAllVotesByGroupId(channelId);

const votesService = {
  getAllVotesByGroupId
};
export default ErrorWrapper(votesService);
