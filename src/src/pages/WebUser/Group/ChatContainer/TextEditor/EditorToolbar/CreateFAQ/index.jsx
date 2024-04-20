/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

import { useGetGroupDetail } from "hooks/groups/queries";
import { CHANNEL_PERMISSION } from "utils/constants";

function CreateFAQ({ open, handleClose, faqId = null }) {
  console.log("CreateFAQ");
  const [titleDialog, setTitleDialog] = useState(faqId ? "Chi tiết FAQ" : "FAQ mới");
  const [isEditable, setIsEditable] = useState(!faqId);
  const titlebtnDialog = isEditable ? "Tạo mới" : "";
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    console.log(data);
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });
  const onCancel = () => {
    reset();
    handleClose();
  };
  const isPending = false;
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
        // handleSubmit(onSubmit)();
      }}
    >
      <DialogTitle alignSelf="center">{titleDialog}</DialogTitle>
      <DialogContent className="!py-4">
        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name="title"
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
              error={!!errors?.title}
              helperText={errors?.title?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
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
