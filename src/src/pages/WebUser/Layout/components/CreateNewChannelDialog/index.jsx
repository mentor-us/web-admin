/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import AutoCompleteEmailInput from "components/AutoComplete/AutoCompleteEmailInput";

function CreateNewChannelDialog({ open, handleClose, groupName }) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      channelName: "",
      description: "",
      userIds: {}
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: "form"
      }}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <DialogTitle alignSelf="center">Tạo kênh mới</DialogTitle>
      <DialogContent>
        <DialogContentText>Nhóm: {groupName} </DialogContentText>
        <Controller
          name="channelName"
          control={control}
          rules={{ required: "Vui lòng nhập tên kênh" }}
          render={({ field }) => (
            <TextField
              margin="dense"
              label="Tên kênh *"
              fullWidth
              variant="standard"
              error={errors?.channelName}
              helperText={errors?.channelName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field }) => {
            return (
              <TextField
                margin="dense"
                label="Mô tả"
                fullWidth
                variant="standard"
                error={errors?.description}
                {...field}
              />
            );
          }}
        />
        {/* <Controller
          name="userIds"
          control={control}
          render={({ field }) => <AutoCompleteEmailInput />}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="submit">Tạo nhóm</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateNewChannelDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired
};

export default CreateNewChannelDialog;
