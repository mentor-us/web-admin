/* eslint-disable react/forbid-prop-types */
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  Stack,
  Typography
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useConfirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import { getMomentTime } from "utils";
import { v4 as uuidv4 } from "uuid";
import { images } from "assets/images";
import { CloseFillIcon, LockRedIcon, SortIcon } from "assets/svgs";

import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import useMyInfo from "hooks/useMyInfo";
import { GetAllVotesInChannelKey, GetVoteDetailKey } from "hooks/votes/key";
import { useVotingMutation } from "hooks/votes/mutation";
import { useGetVoteDetail } from "hooks/votes/queries";
import { VOTE_STATUS } from "utils/constants";

import VoteDetailOption from "./VoteDetailOption";
import VoteSetting from "./VoteSetting";

function VoteDetailDialog({ open, handleClose, voteId, message }) {
  const confirm = useConfirm();
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const { channelId } = useParams();
  const messagesEndRef = useRef(null);
  const { data: vote, isLoading, isError } = useGetVoteDetail(voteId);
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      voterId: myInfo.id,
      voteId,
      voteTotal: vote?.voteTotal ?? 0,
      noOfVoters: vote?.noOfVoters ?? 1,
      choices: vote?.choices ?? []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices"
  });
  const { mutateAsync: votingMutateAsync, isPending } = useVotingMutation();

  const watchFieldArray = watch("choices");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const hh = hours > 9 ? `${hours}` : `0${hours}`;
    const mm = minutes > 9 ? `${minutes}` : `0${minutes}`;

    return `${hh}:${mm}, ${getMomentTime(time)}`;
  };

  useEffect(() => {
    if (vote) {
      setValue("voteTotal", vote?.voteTotal);
      setValue("noOfVoters", vote?.noOfVoters);
      setValue("choices", vote?.choices);
    }
  }, [vote]);

  const onCancel = () => {
    if (isDirty) {
      confirm({
        title: "Xác nhận",
        content: "Bạn chưa lưu bình chọn của mình. Thoát bình chọn?",
        confirmationText: "Thoát",
        cancellationText: "Hủy"
      })
        .then(() => {
          reset();
          handleClose();
        })
        .catch(() => {});
      return;
    }
    reset();
    handleClose();
  };

  const handleSubmitVote = (data) => {
    const requestData = {
      voterId: data.voterId,
      voteId: data.voteId,
      choices: data.choices.map((choice) => {
        return {
          ...choice,
          voters: choice.voters.flatMap((voter) => voter.id)
        };
      })
    };
    votingMutateAsync(requestData, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: GetVoteDetailKey(vote?.id)
        });
        await queryClient.invalidateQueries({
          queryKey: GetAllChatMessageInfinityKey(channelId)
        });
        await queryClient.invalidateQueries({
          queryKey: GetAllVotesInChannelKey(channelId)
        });

        reset();
        handleClose();
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi bình chọn.\nVui lòng thử lại sau!");
      }
    });
  };

  if (isLoading || isError) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      component={motion.div}
      PaperProps={{
        sx: "!p-0"
      }}
      scroll="body"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className="!px-0 !py-2">
        <Stack className="!px-4" direction="row" alignItems="center" justifyContent="space-between">
          <Typography className="!text-lg !font-semibold !text-[#333]">Bình chọn</Typography>
          <IconButton onClick={onCancel} className="!p-0">
            <CloseFillIcon />
          </IconButton>
        </Stack>
        <Divider className="!bg-black !mt-2 !mb-0 !mx-0" />
      </DialogTitle>
      <DialogContent className="!px-0 !py-2">
        <Box className="!px-4 !max-h-[60dvh]">
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={images.ColumnChartImage} className="!w-8 !h-8" />
              <Typography className="!font-bold !text-[#333] !text-base !line-clamp-3">
                {vote?.question}
              </Typography>
            </Stack>
            <Typography className="!text-[#888] !text-sm !my-2">
              {vote?.creator.name} -{" Tạo lúc "}
              {vote?.createdDate ? formatTime(vote?.createdDate) : new Date().toISOString()}
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            {vote?.status === VOTE_STATUS.OPEN ? (
              <>
                <SortIcon />
                <Typography className="!text-[#888] !text-sm">
                  {vote.isMultipleChoice
                    ? "Chọn được nhiều lựa chọn"
                    : "Chọn được nhiều nhất 1 bình chọn"}
                </Typography>
              </>
            ) : (
              <>
                <LockRedIcon width={15} height={15} />
                <Typography className="!text-[#888] !text-sm">Đã khoá bình chọn.</Typography>
              </>
            )}
          </Stack>
          <Divider className="!bg-black !my-2" />

          <Typography className="!text-[#006EDC] !text-sm !mb-2">
            {vote.noOfVoters === 0
              ? "Chưa có người tham gia bình chọn!"
              : `${vote.noOfVoters} người đã bình chọn.`}
          </Typography>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {controlledFields.map((field, index) => (
              <VoteDetailOption
                disabled
                key={field.id}
                remove={remove}
                errors={errors}
                {...{ control, index, field }}
                voteTotal={getValues("voteTotal")}
                onVoterChange={(voteTotal) => setValue("voteTotal", voteTotal)}
              />
            ))}
          </List>
          {vote?.status === VOTE_STATUS.OPEN && (
            <Button
              className="!mx-9 !px-2"
              size="medium"
              startIcon={<AddIcon />}
              onClick={() => {
                const noOfChoices = getValues("choices").length;
                setFocus(`choices.${noOfChoices}.name`);
                append({
                  id: uuidv4().toString(),
                  name: "",
                  voters: [],
                  isChoisen: false,
                  isNewOption: true
                });
                scrollToBottom();
              }}
            >
              Thêm lựa chọn
            </Button>
          )}

          <Box ref={messagesEndRef} />
        </Box>
      </DialogContent>
      <Divider className="!bg-black !my-0" />
      <DialogActions className="!m-0 !my-2 !py-0">
        <Stack
          className="w-full"
          direction={message ? "row" : "row-reverse"}
          justifyContent="space-between"
        >
          <VoteSetting message={message} vote={vote} />
          {vote?.status === VOTE_STATUS.OPEN ? (
            <Box>
              <Button onClick={onCancel}>Hủy</Button>
              <Button
                disabled={!isDirty}
                onClick={(event) => {
                  if (isPending) {
                    return;
                  }
                  event.preventDefault();
                  handleSubmit(handleSubmitVote)();
                }}
              >
                Xác nhận
              </Button>
            </Box>
          ) : (
            <Button onClick={onCancel}>Thoát</Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

VoteDetailDialog.defaultProps = {
  message: null
};

VoteDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  voteId: PropTypes.string.isRequired,
  message: PropTypes.object
};

export default VoteDetailDialog;
