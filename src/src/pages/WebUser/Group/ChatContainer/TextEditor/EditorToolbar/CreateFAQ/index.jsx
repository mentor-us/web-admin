/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { useCreateFaqMutation } from "hooks/chats/mutation";
import { useGetGroupDetail } from "hooks/groups/queries";
import { GetAllMeetingInChannelKey } from "hooks/meeting/keys";
import { CHANNEL_PERMISSION } from "utils/constants";

function CreateFAQ({ open, handleClose, faqId = null }) {
  console.log("CreateFAQ");
  const [titleDialog, setTitleDialog] = useState(faqId ? "Chi tiết FAQ" : "FAQ mới");
  const [isEditable, setIsEditable] = useState(!faqId);
  const titlebtnDialog = isEditable ? "Tạo mới" : "";
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { mutateAsync: createFaqMutationAsync, isPending } = useCreateFaqMutation();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      question: "ttt",
      answer: "eeee"
    }
  });
  console.log("error", errors);
  const adapterData = (data) => {
    return {
      ...data,
      groupId
    };
  };
  const onCancel = () => {
    reset();
    handleClose();
  };
  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createFaqMutationAsync(adapterData(data))
          .then(() => {
            queryClient.refetchQueries({
              queryKey: GetAllMeetingInChannelKey(groupId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang tạo FAQ...",
        success: "Tạo FAQ thành công",
        error: "Tạo FAQ thất bại"
      }
    );
    onCancel();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={onCancel}
      PaperProps={{
        component: "form",
        className: "!px-2"
      }}
      onSubmit={(event) => {
        if (!isEditable) {
          return;
        }
        event.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <DialogTitle alignSelf="center">{titleDialog}</DialogTitle>
      <DialogContent className="!py-4">
        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name="question"
          control={control}
          disabled={!isEditable}
          rules={{
            required: "Vui lòng nhập câu hỏi"
          }}
          render={({ field }) => (
            <TextField
              className="!mb-6"
              label="Câu hỏi *"
              fullWidth
              error={!!errors?.question}
              helperText={errors?.question?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="answer"
          control={control}
          disabled={!isEditable}
          rules={{
            required: "Vui lòng nhập câu trả lời"
          }}
          render={({ field }) => {
            return (
              // eslint-disable-next-line react/no-unstable-nested-components
              <TextField
                className="!mb-6"
                // variant="filled"
                multiline
                label="Câu trả lời *"
                color="info"
                fullWidth
                minRows={5}
                error={!!errors?.answer}
                helperText={errors?.answer?.message}
                {...field}
              />
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Đóng</Button>
        {isEditable && <Button type="submit">{titlebtnDialog}</Button>}
      </DialogActions>
    </Dialog>
  );
}
CreateFAQ.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  faqId: PropTypes.string.isRequired
};

export default CreateFAQ;
