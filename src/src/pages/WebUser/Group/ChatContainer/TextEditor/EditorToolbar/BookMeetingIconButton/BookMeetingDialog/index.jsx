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
import { useCreateMeetingMutation } from "hooks/chats/mutation";
import useMyInfo from "hooks/useMyInfo";
import { MEETING_REPEATED_TYPE } from "utils/constants";

function BookMeetingDialog({ open, handleClose }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId,
    (members) => members?.filter((member) => member.id !== myInfo.id) ?? []
  );
  const queryClient = useQueryClient();

  const today = dayjs().add(1, "h").minute(0);

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
      place: "",
      attendees: [],
      timeStart: today,
      timeEnd: today.add(45, "m"),
      date: today
    }
  });
  const { mutateAsync: createMeetingMutationAsync, isPending } = useCreateMeetingMutation();

  useEffect(() => {
    setValue("attendees", channelMembers ?? []);
  }, [channelMembers]);

  const prepareData = (data) => {
    const { date } = data;

    return {
      title: data.title,
      attendees: data.attendees.map((attendee) => attendee.id),
      organizerId: myInfo.id,
      repeated: MEETING_REPEATED_TYPE.EVERY_DAY,
      groupId: channelId,
      timeEnd: data.timeEnd.date(date.date()).month(date.month()).year(date.year()).toJSON(),
      timeStart: data.timeStart.date(date.date()).month(date.month()).year(date.year()).toJSON()
    };
  };

  const onCancel = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createMeetingMutationAsync(prepareData(data))
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang tạo lịch hẹn",
        success: "Tạo lịch hẹn thành công",
        error: "Tạo lịch hẹn thất bại"
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
        <DialogTitle alignSelf="center">Lịch hẹn mới</DialogTitle>
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
              return <TextField className="!mb-6" label="Mô tả" fullWidth {...field} />;
            }}
          />

          <Grid container spacing={0} justifyContent="space-between">
            <Grid item sx>
              <Controller
                name="timeStart"
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Từ *"
                      disablePast
                      error={!!errors?.timeStart}
                      helperText={errors?.timeStart?.message}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Từ *"
                          error={!!errors?.userIds}
                          helperText={errors?.userIds?.message}
                        />
                      )}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item sx>
              <Controller
                name="timeEnd"
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Đến *"
                      minTime={today.add(1, "m")}
                      disablePast
                      error={!!errors?.timeEnd}
                      helperText={errors?.timeEnd?.message}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Đến *"
                          error={!!errors?.userIds}
                          helperText={errors?.userIds?.message}
                        />
                      )}
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
                rules={{ required: false }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <DatePicker
                      className="!mb-6"
                      fullWidth
                      label="Ngày *"
                      slotProps={{
                        actionBar: {
                          actions: ["today"]
                        }
                      }}
                      minDate={today}
                      maxDate={dayjs().date(31).month(11)}
                      error={!!errors?.date}
                      helperText={errors?.date?.message}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ngày *"
                          error={!!errors?.userIds}
                          helperText={errors?.userIds?.message}
                        />
                      )}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>

          <Controller
            getGroupDetailColumnHeadersMentorSelector
            name="place"
            control={control}
            render={({ field }) => (
              <TextField
                className="!mb-6"
                label="Địa điểm"
                fullWidth
                error={!!errors?.place}
                helperText={errors?.place?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="attendees"
            control={control}
            rules={{
              required: "Vui lòng chọn người tham gia lịch hẹn"
            }}
            onChange={([, data]) => data}
            render={({ field: { onChange, ...props } }) => {
              return (
                <Autocomplete
                  className="!mt-2"
                  label="Người tham dự *"
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
                      label="Người tham dự *"
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
          <Button type="submit">Tạo lịch hẹn</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

BookMeetingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default BookMeetingDialog;
