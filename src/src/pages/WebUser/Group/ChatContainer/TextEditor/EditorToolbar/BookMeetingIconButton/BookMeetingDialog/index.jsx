import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import { getImageUrlWithKey } from "utils";
import MeetingApi from "api/MeetingApi";

import { useGetChannelMembers } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useCreateMeetingMutation, useUpdateMeetingMutation } from "hooks/chats/mutation";
import { useGetDetailMeeting } from "hooks/events/queries";
import { GetAllMeetingInChannelKey } from "hooks/meeting/keys";
import useMyInfo from "hooks/useMyInfo";
import { MEETING_REPEATED_TYPE } from "utils/constants";

function BookMeetingDialog({ open, handleClose, meetingId = "" }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId,
    (members) => members?.filter((member) => member.id !== myInfo.id) ?? []
  );
  const queryClient = useQueryClient();
  const today = dayjs().add(1, "h").minute(0);
  const { data: meetingDetail } = useGetDetailMeeting(meetingId);
  const [titleDialog, setTitleDialog] = useState(meetingId ? "Chi tiết lịch hẹn " : "Lịch hẹn mới");
  const [isEditable, setIsEditable] = useState(!meetingId);
  const titlebtnDialog = meetingDetail ? "Lưu lịch hẹn " : "Tạo lịch hẹn";

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
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
  const { mutateAsync: createMeetingMutationAsync, isPending } = meetingId
    ? useUpdateMeetingMutation()
    : useCreateMeetingMutation();

  useEffect(() => {
    setValue("attendees", channelMembers ?? []);
  }, [channelMembers]);

  const prepareData = (data) => {
    const { date } = data;

    return {
      id: meetingId ?? null,
      title: data.title,
      description: data.description,
      attendees: data.attendees.map((attendee) => attendee.id),
      organizerId: myInfo.id,
      repeated: MEETING_REPEATED_TYPE.EVERY_DAY,
      place: data.place,
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
            queryClient.invalidateQueries({
              queryKey: ["events"]
            });
            queryClient.refetchQueries({
              queryKey: GetAllMeetingInChannelKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: `Đang ${meetingDetail ? "lưu" : "tạo"} lịch hẹn...`,
        success: () => {
          return `${meetingDetail ? "Lưu" : "Tạo"} lịch hẹn thành công`;
        },
        error: `${meetingDetail ? "Lưu" : "Tạo"} lịch hẹn thất bại`
      }
    );

    onCancel();
  };

  const watchDateField = watch("date");
  useEffect(() => {
    if (watchDateField) {
      setValue(
        "timeStart",
        getValues("timeStart")
          .date(watchDateField.date())
          .month(watchDateField.month())
          .year(watchDateField.year())
      );
      setValue(
        "timeEnd",
        getValues("timeEnd")
          .date(watchDateField.date())
          .month(watchDateField.month())
          .year(watchDateField.year())
      );
    }
  }, [watchDateField]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line no-shadow
      const getMeetingAssignees = async (meetingDetail) => {
        const res = await MeetingApi.getMeetingAssignees(meetingDetail.id);
        // if (res.data) {
        setValue("attendees", res.data || []);
        // }
      };
      if (meetingDetail) {
        // taskData.role === "MENTOR" || taskData.assigner.id == currentUser.id
        if (meetingDetail.canEdit) {
          setTitleDialog("Cập nhật lịch hẹn");
          setIsEditable(true);
        }
        reset({
          title: meetingDetail.title || "",
          description: meetingDetail.description || "",
          place: meetingDetail.place || "",
          timeStart: dayjs(meetingDetail.timeStart) || today,
          timeEnd: dayjs(meetingDetail.timeEnd) || today,
          date: dayjs(meetingDetail.timeStart) || today,
          attendees: meetingDetail.attendees || []
        });
        // setValue("attendees", [
        //   {
        //     id: "650fa97f0ee45f4e461b6bd0",
        //     imageUrl:
        //       "https://lh3.googleusercontent.com/a/ACg8ocLc8pAbl-MFsj5x56rb0dxVS3jpp1GhMQ4mkVjqAS7Qsf4=s96-c",
        //     name: "Võ Thanh Sương"
        //   }
        // ]);
        getMeetingAssignees(meetingDetail);
      }
    }
  }, [meetingDetail]);

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
        <DialogTitle alignSelf="center" className="m-0 !pb-2">
          {titleDialog}
        </DialogTitle>

        <DialogContent className="!py-4">
          <Controller
            getGroupDetailColumnHeadersMentorSelector
            name="title"
            disabled={!isEditable}
            control={control}
            rules={{
              required: "Vui lòng nhập tiêu đề",
              maxLength: {
                value: 100,
                message: "Tiêu đề không được vượt quá 100 ký tự"
              }
            }}
            render={({ field: { ref, ...fieldData } }) => (
              <TextField
                className="!mb-6"
                label="Tiêu đề (*)"
                fullWidth
                error={!!errors?.title}
                helperText={errors?.title?.message}
                inputRef={ref}
                {...fieldData}
              />
            )}
          />

          <Controller
            name="description"
            disabled={!isEditable}
            control={control}
            rules={{
              required: false,
              maxLength: {
                value: 250,
                message: "Mô tả không được vượt quá 250 ký tự"
              }
            }}
            render={({ field: { ref, ...fieldData } }) => {
              return (
                <TextField
                  multiline
                  minRows={4}
                  maxRows={4}
                  className="!mb-6"
                  label="Mô tả"
                  fullWidth
                  inputRef={ref}
                  error={!!errors?.description}
                  helperText={errors?.description?.message}
                  {...fieldData}
                />
              );
            }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={4}>
              <Controller
                name="timeStart"
                disabled={!isEditable}
                control={control}
                rules={{
                  required: "Vui lòng nhập giờ bắt đầu",
                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isSameOrBefore(v)) {
                        return true;
                      }

                      return "Giờ bắt đầu phải lớn hơn giờ hiện tại";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Từ (*)"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors?.timeStart,
                          helperText: errors?.timeStart?.message
                        }
                      }}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => <TextField {...params} label="Từ *" />}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="timeEnd"
                disabled={!isEditable}
                control={control}
                rules={{
                  required: "Vui lòng nhập giờ kết thúc",
                  validate: {
                    gtstart: (v) => {
                      if (!v || watch("timeStart").isBefore(v)) {
                        return true;
                      }

                      return "Giờ kết thúc phải luôn lớn hơn giờ bắt đầu";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Đến (*)"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors?.timeEnd,
                          helperText: errors?.timeEnd?.message
                        }
                      }}
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => <TextField {...params} label="Đến *" />}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="date"
                disabled={!isEditable}
                control={control}
                rules={{
                  required: "Vui lòng nhập ngày hẹn",
                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isSameOrBefore(v, "date")) {
                        return true;
                      }
                      return "Ngày hẹn phải lớn hơn hoặc bằng ngày hiện tại";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <DatePicker
                      className="!mb-6"
                      format="DD/MM/YYYY"
                      fullWidth
                      label="Ngày (*)"
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
                      minDate={dayjs()}
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
            getGroupDetailColumnHeadersMentorSelector
            name="place"
            disabled={!isEditable}
            control={control}
            rules={{
              maxLength: {
                value: 150,
                message: "Địa điểm không được vượt quá 150 ký tự"
              }
            }}
            render={({ field: { ref, ...fieldData } }) => (
              <TextField
                className="!mb-6"
                label="Địa điểm"
                fullWidth
                error={!!errors?.place}
                helperText={errors?.place?.message}
                inputProps={ref}
                {...fieldData}
              />
            )}
          />

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs>
              <Controller
                name="attendees"
                disabled={!isEditable}
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
                              <Avatar
                                src={getImageUrlWithKey(member.imageUrl)}
                                className="!w-8 !h-8"
                              />
                            </ListItemAvatar>
                            <ListItemText>{member.name}</ListItemText>
                          </ListItem>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          label="Người tham dự (*)"
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
            </Grid>
            <Grid item xs={4}>
              {meetingDetail && (
                <Box className="ml-2">
                  <Typography className="!text-sm !mb-1">Người tổ chức</Typography>
                  <Tooltip title={meetingDetail?.organizer?.name}>
                    <Chip
                      avatar={
                        <Avatar
                          alt={meetingDetail?.organizer?.name}
                          src={getImageUrlWithKey(meetingDetail?.organizer?.imageUrl)}
                        />
                      }
                      label={meetingDetail?.organizer?.name}
                    />
                  </Tooltip>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onCancel}>
            Hủy
          </Button>
          {isEditable && <Button type="submit">{titlebtnDialog}</Button>}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

BookMeetingDialog.defaultProps = {
  meetingId: ""
};

BookMeetingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string
};

export default BookMeetingDialog;
