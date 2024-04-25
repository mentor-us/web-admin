/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";

import VoteItem from "pages/WebUser/Group/ChatContainer/MessageContainer/MessageItems/VoteItem";
import { useGetGroupFaqs } from "hooks/faqs/queries";
import { useGetChannelVotes } from "hooks/votes/queries";

import FaqItem from "./FaqItem";

export default function GroupFaq() {
  const { groupId } = useParams();
  const { data: faqs, isLoading, isSuccess } = useGetGroupFaqs(groupId);

  return (
    <div className="overflow-auto">
      {faqs?.map((faq) => (
        <FaqItem faq={faq} />
      ))}
    </div>
  );
}
