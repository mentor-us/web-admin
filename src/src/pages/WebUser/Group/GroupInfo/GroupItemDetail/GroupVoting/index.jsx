/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";

import VoteItem from "pages/WebUser/Group/ChatContainer/MessageContainer/MessageItems/VoteItem";
import { useGetChannelVotes } from "hooks/votes/queries";

export default function GroupVoting() {
  const { channelId } = useParams();
  const { data: votes, isLoading, isSuccess } = useGetChannelVotes(channelId);

  return (
    <div className="overflow-auto">
      {votes?.map((vote) => (
        <VoteItem
          className="border-inherit"
          containerClassName="bg-white rounded-lg w-full p-2 border-2 border-gray-200 m-2"
          message={vote}
          isInGroupInfo
          key={vote.id}
        />
      ))}
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
        </Stack>
      )}

      {isSuccess && votes.length === 0 && (
        <p className="flex mt-4 justify-center text-base items-center">Chưa có bình chọn nào</p>
      )}
    </div>
  );
}
