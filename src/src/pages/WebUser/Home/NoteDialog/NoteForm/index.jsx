/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useCallback, useEffect, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

import { useCreateNoteMutation, useEditNoteMutation } from "hooks/notes/mutation";
import { useGetNoteById } from "hooks/notes/queries";
import { useGetUserNotesKey } from "hooks/profile/key";
import { useGetMentees } from "hooks/profile/queries";

import "./index.css";

function NoteForm({ onCancel, noteId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { mutateAsync: createNote } = useCreateNoteMutation();
  const { mutateAsync: editNote } = useEditNoteMutation();
  const { data: note, isLoading: isLoadingNote } = useGetNoteById(noteId);
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
  const queryClient = useQueryClient();

  const { data: members, isLoading: isLoadingMembers } = useGetMentees({
    page: 0,
    pageSize: 100,
    query: searchQuery // Pass searchQuery to hook
  });

  // Handler for search input change with debounce
  const handleSearchChange = useCallback(
    debounce((event) => {
      setSearchQuery(event?.target.value);
    }, 300),
    []
  );

  useEffect(() => {
    // Cleanup debounce on unmount
    return () => {
      handleSearchChange.cancel();
    };
  }, [handleSearchChange]);

  const prepareData = (data) => {
    const userIds = data.attendees.map((attendee) => attendee.id);
    return {
      title: data.title,
      content: data.description,
      userIds
    };
  };

  const onSubmit = async (data) => {
    const preparedData = prepareData(data);
    try {
      if (noteId) {
        await editNote({ ...preparedData, id: noteId });
        toast.success("Ghi chú đã được cập nhật");
      } else {
        await createNote(preparedData);
        toast.success("Ghi chú đã được tạo");
      }
      queryClient.refetchQueries({ queryKey: useGetUserNotesKey() });
      reset();
      onCancel();
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi lưu ghi chú");
    }
  };

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        description: note.content,
        attendees: note.users
      });
    }
  }, [note, reset]);

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
              onInputChange={handleSearchChange} // Handle input change for search with debounce
              noOptionsText="Không có thành viên nào"
              onClose={() => setSearchQuery("")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Note cho*"
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
                  <ListItemText className="text-base" primary={member.name} />
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
                className="rounded-md border border-gray-300 editor__editable_inline"
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
                    "bulletedList",
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
      <DialogActions sx={{ padding: "4px", paddingTop: " 24px" }}>
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="submit">Lưu</Button>
      </DialogActions>
    </form>
  );
}

NoteForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  noteId: PropTypes.string
};

export default NoteForm;
