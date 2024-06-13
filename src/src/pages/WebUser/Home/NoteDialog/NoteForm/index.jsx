/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

function NoteForm({ note, onSave, onCancel }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      attendees: []
    }
  });

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        description: note.content,
        attendees: [] // assuming note doesn't have attendees initially
      });
    } else {
      reset({
        title: "",
        description: "",
        attendees: []
      });
    }
  }, [note, reset]);

  const handleSave = (data) => {
    onSave({ ...note, ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Stack spacing={2}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Vui lòng nhập tiêu đề"
          }}
          render={({ field }) => (
            <TextField
              label="Tiêu đề *"
              fullWidth
              error={!!errors?.title}
              helperText={errors?.title?.message}
              // disabled={!isEditable}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field }) => <TextField label="Mô tả" fullWidth {...field} />}
        />
        <Controller
          name="attendees"
          control={control}
          rules={{
            required: "Vui lòng chọn người sẽ thực hiện công việc"
          }}
          render={({ field: { onChange, value, ...props } }) => (
            <Autocomplete
              multiple
              options={[
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Doe" }
              ]}
              getOptionLabel={(member) => member?.name ?? ""}
              filterSelectedOptions
              value={value}
              onChange={(event, newValue) => onChange(newValue)}
              // loading={isLoadingMembers}
              noOptionsText="Không có thành viên nào"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Giao công việc *"
                  error={!!errors?.attendees}
                  helperText={errors?.attendees?.message}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {/* {isLoadingMembers ? <CircularProgress color="inherit" size={20} /> : null} */}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              renderOption={(optProps, member) => (
                <ListItem {...optProps}>
                  <ListItemAvatar>
                    <Avatar src={member.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItem>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              {...props}
            />
          )}
        />
      </Stack>
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="submit">Lưu</Button>
      </DialogActions>
    </form>
  );
}

NoteForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  note: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NoteForm;
