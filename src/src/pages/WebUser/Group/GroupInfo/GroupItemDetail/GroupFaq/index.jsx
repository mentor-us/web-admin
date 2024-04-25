/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";
import { Box, Skeleton, Stack } from "@mui/material";

import { useGetGroupFaqs } from "hooks/faqs/queries";

import FaqItem from "./FaqItem";

export default function GroupFaq() {
  const { groupId } = useParams();
  const { data: faqs, isLoading, isSuccess } = useGetGroupFaqs(groupId);

  return (
    <Box className="overflow-auto">
      {faqs?.map((faq) => (
        <FaqItem key={faq.id} faq={faq} />
      ))}

      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
        </Stack>
      )}

      {isSuccess && faqs.length === 0 && (
        <p className="flex mt-4 justify-center text-base items-center">Chưa có câu hỏi nào</p>
      )}
    </Box>
  );
}
