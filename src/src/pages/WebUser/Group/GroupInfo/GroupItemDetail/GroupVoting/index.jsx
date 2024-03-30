/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";

import VoteItem from "pages/WebUser/Group/ChatContainer/MessageContainer/MessageItems/VoteItem";
import { useGetGroupVotes } from "hooks/votes/queries";

export default function GroupVoting() {
  const { channelId } = useParams();
  const { data: votes, isLoading, isSuccess } = useGetGroupVotes(channelId);
  return (
    <div className="overflow-auto">
      {votes?.map((vote) => (
        <VoteItem
          className="border-inherit"
          containerClassName="bg-white rounded-lg w-full p-2 border-2 border-gray-200 m-2"
          message={vote}
          key={vote.id}
        />
      ))}
    </div>
  );
}
