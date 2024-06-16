/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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

import { useCreateNoteMutation } from "hooks/notes/mutation";
import { useGetMentees } from "hooks/profile/queries";

function NoteForm({ onCancel }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { mutateAsync: createNote } = useCreateNoteMutation();
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

  const { data: members, isLoading: isLoadingMembers } = useGetMentees({
    page: 0,
    pageSize: 100,
    query: searchQuery // Pass searchQuery to hook
  });

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event?.target.value);
  };
  const prepareData = (data) => {
    const userIds = data.attendees.map((attendee) => attendee.id);
    return {
      title: data.title,
      content: data.description,
      userIds
    };
  };
  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createNote(prepareData(data))
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      }),
      {
        loading: `Đang luu ghi chú...`,
        success: `Ghi chú đã được tạo`,
        error: `Đã xảy ra lỗi khi tạo ghi chú`
      }
    );

    onCancel();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <Stack spacing={2} className="mt-2">
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Vui lòng nhập tiêu đề"
          }}
          render={({ field }) => (
            <TextField
              className="pt-2 mt-2"
              label="Tiêu đề *"
              fullWidth
              error={!!errors?.title}
              helperText={errors?.title?.message}
              {...field}
            />
          )}
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
              options={members?.data ?? []}
              getOptionLabel={(member) => (member?.name && member?.email) || ""}
              filterSelectedOptions
              value={value}
              onChange={(event, newValue) => onChange(newValue)}
              inputValue={searchQuery} // Controlled input value for search
              onInputChange={handleSearchChange} // Handle input change for search
              noOptionsText="Không có thành viên nào"
              onClose={() => setSearchQuery("")}
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
                        {isLoadingMembers ? <CircularProgress color="inherit" size={20} /> : null}
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
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Vui lòng nhập nội dung ghi chú"
          }}
          render={({ field }) => (
            <div className="mt-4">
              <CKEditor
                className="w-full rounded-md border border-gray-300"
                editor={ClassicEditor}
                data={field.value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  field.onChange(data);
                }}
                config={{
                  placeholder: "Nhập nội dung ghi chú",
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "blockQuote",
                    "|",
                    "undo",
                    "redo"
                  ]
                }}
              />
            </div>
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
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props,
  onCancel: PropTypes.func.isRequired
};

export default NoteForm;
