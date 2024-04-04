import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import { useGetChannelMembers } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useCreateTaskMutation } from "hooks/chats/mutation";
import useMyInfo from "hooks/useMyInfo";

function CreateTaskDialog({ open, handleClose }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId,
    (members) => members ?? []
  );
  const queryClient = useQueryClient();

  const today = dayjs().add(1, "h");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      attendees: [],
      deadline: today,
      date: today
    }
  });
  const { mutateAsync: createTaskMutationAsync, isPending } = useCreateTaskMutation();

  useEffect(() => {
    setValue("attendees", channelMembers ?? []);
  }, [channelMembers]);

  const prepareData = (data) => {
    const { date } = data;

    return {
      title: data.title,
      description: data.description,
      userIds: data.attendees.map((attendee) => attendee.id),
      organizerId: myInfo.id,
      groupId: channelId,
      deadline: data.deadline.date(date.date()).month(date.month()).year(date.year()).toJSON()
    };
  };

  const onCancel = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createTaskMutationAsync(prepareData(data))
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang tạo công việc...",
        success: "Tạo công việc thành công",
        error: "Tạo công việc thất bại"
      }
    );

    onCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={onCancel}
        PaperProps={{
          component: "form",
          className: "!px-2"
        }}
        onSubmit={(event) => {
          if (isPending) {
            return;
          }
          event.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <DialogTitle alignSelf="center">Công việc mới</DialogTitle>
        <DialogContent className="!py-4">
          <Controller
            getGroupDetailColumnHeadersMentorSelector
            name="title"
            control={control}
            rules={{
              required: "Vui lòng nhập tiêu đề"
            }}
            render={({ field }) => (
              <TextField
                className="!mb-6"
                label="Tiêu đề *"
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
            rules={{ required: false }}
            render={({ field }) => {
              return (
                // eslint-disable-next-line react/no-unstable-nested-components
                <TextField className="!mb-6" label="Mô tả" fullWidth {...field} />
              );
            }}
          />

          <Grid container spacing={2}>
            <Grid item sx>
              <Controller
                name="deadline"
                control={control}
                rules={{
                  required: "Vui lòng nhập giờ tới hạn",
                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isBefore(v)) {
                        return true;
                      }

                      return "Thời hạn phải lớn hơn thời điểm hiện tại";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Tới hạn lúc *"
                      minTime={dayjs().add(1, "m")}
                      disablePast
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors?.deadline,
                          helperText: errors?.deadline?.message
                        }
                      }}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => <TextField {...params} label="Tới hạn *" />}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item sx>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "Vui lòng nhập ngày tới hạn",

                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isBefore(v)) {
                        return true;
                      }

                      return "Ngày tới hạn phải lớn hơn hoặc bằng ngày hiện tại";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <DatePicker
                      className="!mb-6"
                      format="DD/MM/YYYY"
                      fullWidth
                      label="Ngày *"
                      slotProps={{
                        actionBar: {
                          actions: ["today"]
                        },
                        textField: {
                          fullWidth: true,
                          error: !!errors?.date,
                          helperText: errors?.date?.message
                        }
                      }}
                      localeText={{
                        todayButtonLabel: "Hôm nay"
                      }}
                      minDate={today}
                      maxDate={dayjs().date(31).month(11)}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => <TextField {...params} label="Ngày *" />}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>

          <Controller
            name="attendees"
            control={control}
            rules={{
              required: "Vui lòng chọn người sẽ thực hiện công việc"
            }}
            onChange={([, data]) => data}
            render={({ field: { onChange, ...props } }) => {
              return (
                <Autocomplete
                  className="!mt-2"
                  label="Giao công việc *"
                  loading={isLoadingMembers}
                  limitTags={3}
                  multiple
                  width={350}
                  filterSelectedOptions
                  options={channelMembers ?? []}
                  noOptionsText="Không có thành viên nào"
                  getOptionLabel={(member) => member.name ?? ""}
                  renderOption={(optProps, member, state, ownerState) => {
                    return (
                      <ListItem {...optProps} ownerState={ownerState}>
                        <ListItemAvatar>
                          <Avatar src={member.imageUrl} className="!w-8 !h-8" />
                        </ListItemAvatar>
                        <ListItemText>{member.name}</ListItemText>
                      </ListItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      label="Giao công việc *"
                      error={!!errors?.attendees}
                      helperText={errors?.attendees?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingMembers ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                      {...params}
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  clearText="Xóa hết"
                  closeText="Đóng"
                  onChange={(e, data) => {
                    onChange(data);
                  }}
                  {...props}
                />
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="submit">Tạo công việc</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

CreateTaskDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateTaskDialog;
