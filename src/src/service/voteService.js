import VoteApi from "api/VoteApi";

const VoteService = {
  createVote: (vote) => VoteApi.createVote(vote),
  getChannelVotes: async (channelId, currentUserId) => {
    const votes = await VoteApi.getChannelVotes(channelId);

    return votes.map((vote) => {
      const allVotersId = vote.choices
        .flatMap((choice) => choice.voters)
        .flatMap((voter) => voter.id);
      return {
        ...vote,
        choices: vote.choices.map((choice) => ({
          ...choice,
          isChosen: choice.voters.flatMap((voter) => voter.id).includes(currentUserId)
        })),
        voteTotal: allVotersId.length,
        noOfVoters: new Set(allVotersId).size
      };
    });
  },
  getVoteDetail: async (voteId, currentUserId) => {
    const voteDetail = await VoteApi.getVoteDetail(voteId);
    const allVotersId = voteDetail.choices
      .flatMap((choice) => choice.voters)
      .flatMap((voter) => voter.id);

    return {
      ...voteDetail,
      choices: voteDetail.choices.map((choice) => ({
        ...choice,
        isChosen: choice.voters.flatMap((voter) => voter.id).includes(currentUserId)
      })),
      voteTotal: allVotersId.length,
      noOfVoters: new Set(allVotersId).size
    };
  },
  updateVote: (voteId, payload) => VoteApi.updateVote(voteId, payload),
  doVoting: (voteId, payload) => VoteApi.doVoting(voteId, payload),
  close: (voteId) => VoteApi.close(voteId),
  reopenVote: (voteId) => VoteApi.reopenVote(voteId)
};

export default VoteService;
