/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import { getImageUrlWithKey } from "utils";
import TaskApi from "api/TaskApi";

import { useGetChannelMembers } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import {
  useChangeStatusTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "hooks/chats/mutation";
import { useGetDetailTasks } from "hooks/chats/queries";
import { GetAllTaskInChannelKey } from "hooks/tasks/keys";
import useMyInfo from "hooks/useMyInfo";
import { TASK_STATUS } from "utils/constants";

// eslint-disable-next-line no-unused-vars
function CreateTaskDialog({
  open,
  handleClose,
  taskId = null,
  suggestedTask = null,
  onClose = null
}) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId || "",
    (members) => members ?? []
  );
  const { data: taskDetail } = useGetDetailTasks(taskId);
  const [canChangeStatus, setCanChangeStatus] = useState(false);

  const [titleDialog, setTitleDialog] = useState(taskId ? "Chi tiết công việc" : "Công việc mới");
  const [isEditable, setIsEditable] = useState(!taskId);
  const titlebtnDialog = taskDetail ? "Lưu công việc" : "Tạo công việc";
  const queryClient = useQueryClient();

  const today = dayjs().add(1, "h");

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
      title: suggestedTask?.title ?? "",
      description: suggestedTask?.description ?? "",
      attendees: [],
      deadline: suggestedTask?.deadline ? dayjs(suggestedTask.deadline) : today,
      date: suggestedTask?.deadline ? dayjs(suggestedTask.deadline) : today,
      status: ""
    }
  });
  const { mutateAsync: createTaskMutationAsync, isPending } = !taskId
    ? useCreateTaskMutation()
    : useUpdateTaskMutation(taskId);
  const { mutateAsync: changeStatusTaskMutation } = useChangeStatusTaskMutation(taskId);
  useEffect(() => {
    setValue("attendees", channelMembers ?? []);
  }, [channelMembers]);

  const prepareData = (data) => {
    const { date } = data;
    return {
      id: taskId ?? null,
      title: data.title,
      description: data.description,
      userIds: data.attendees.map((attendee) => attendee.id),
      organizerId: myInfo.id,
      groupId: channelId,
      deadline: data.deadline.date(date.date()).month(date.month()).year(date.year()).toJSON(),
      status: data.status.key
    };
  };

  const onCancel = () => {
    reset();
    handleClose();
    if (onClose !== null) onClose();
  };

  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createTaskMutationAsync(prepareData(data))
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelId)
            });
            queryClient.invalidateQueries({
              queryKey: ["events"]
            });
            queryClient.refetchQueries({
              queryKey: GetAllTaskInChannelKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: `Đang ${isEditable ? "lưu" : "tạo"} công việc...`,
        success: `${isEditable ? "Lưu" : "Tạo"} công việc thành công`,
        error: `${isEditable ? "Lưu" : "Tạo"} công việc thất bại`
      }
    );

    onCancel();
  };
  const handleChangeStatus = (newValue) => {
    toast.promise(
      new Promise((resolve, reject) => {
        changeStatusTaskMutation({ id: taskId, status: newValue.key })
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelId)
            });
            queryClient.invalidateQueries({
              queryKey: ["events"]
            });
            queryClient.refetchQueries({
              queryKey: GetAllTaskInChannelKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang cập nhật trạng thái...",
        success: "Cập nhật trạng thái thành công",
        error: "Cập nhật trạng thái thất bại"
      }
    );
  };

  const watchDateField = watch("date");
  useEffect(() => {
    if (watchDateField) {
      setValue(
        "deadline",
        getValues("deadline")
          .date(watchDateField.date())
          .month(watchDateField.month())
          .year(watchDateField.year())
      );
    }
  }, [watchDateField]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line no-shadow
      const getTaskAssignee = async (taskDetail) => {
        const res = await TaskApi.getTaskAssignees(taskDetail.id);
        setValue("attendees", res.data || []);

        if (res.data) {
          res.data.some((item) => {
            if (item.id === myInfo.id) {
              setCanChangeStatus(true);
              return true;
            }
            return false;
          });
        }
      };
      if (taskDetail) {
        // taskData.role === "MENTOR" || taskData.assigner.id == currentUser.id
        if (taskDetail?.assigner?.id === myInfo.id) {
          setTitleDialog("Cập nhật công việc");
          setIsEditable(true);
        }

        reset({
          title: taskDetail.title || "",
          description: taskDetail.description || "",
          deadline: dayjs(taskDetail.deadline) || today,
          date: dayjs(taskDetail.deadline) || today,
          attendees: channelMembers || [],
          status: TASK_STATUS.find((status) => status.key === taskDetail?.status) || ""
        });

        getTaskAssignee(taskDetail);
      }
    }
  }, [taskDetail]);

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
          if (isPending || !isEditable) {
            return;
          }
          event.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <DialogTitle alignSelf="center">{titleDialog}</DialogTitle>
        <DialogContent className="!py-4">
          <Controller
            name="title"
            control={control}
            disabled={!isEditable}
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
                {...fieldData}
                inputRef={ref}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            disabled={!isEditable}
            rules={{
              required: false,
              maxLength: {
                value: 250,
                message: "Mô tả không được vượt quá 250 ký tự"
              }
            }}
            render={({ field: { ref, ...fieldData } }) => (
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
            )}
          />

          <Grid container spacing={2}>
            <Grid item sx>
              <Controller
                name="deadline"
                control={control}
                disabled={!isEditable}
                rules={{
                  required: false,
                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isSameOrBefore(v)) {
                        return true;
                      }

                      return "Thời hạn phải lớn hơn thời gian hiện tại";
                    }
                  }
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <MobileTimePicker
                      className="!mb-6"
                      fullWidth
                      label="Tới hạn lúc (*)"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors?.deadline,
                          helperText: errors?.deadline?.message
                        }
                      }}
                      onChange={(newValue) => {
                        onChange(newValue);
                      }}
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
                disabled={!isEditable}
                control={control}
                rules={{
                  required: "Vui lòng nhập ngày tới hạn",

                  validate: {
                    gtnow: (v) => {
                      if (!v || dayjs().isSameOrBefore(v, "date")) {
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
                      onChange={(newValue) => onChange(newValue)}
                      renderInput={(params) => <TextField {...params} label="Ngày *" />}
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            {canChangeStatus && (
              <Grid item>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      className="w-full"
                      disablePortal
                      id="combo-box-demo"
                      options={TASK_STATUS}
                      getOptionLabel={(option) => option.displayName}
                      // eslint-disable-next-line no-shadow
                      isOptionEqualToValue={(option, value) => option.key === value || option[0]}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        handleChangeStatus(newValue);
                      }}
                      value={value}
                      disabled={!canChangeStatus}
                      componentsProps={{
                        clearIndicator: { style: { display: "none" } } // Hide the clear indicator button
                      }}
                      place
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.key} value={option}>
                          {option.displayName}
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Status"
                          inputRef={ref}
                          InputProps={{
                            ...params.InputProps,
                            sx: {
                              height: 44,
                              alignItems: "center",
                              ".MuiAutocomplete-input": {
                                padding: "2px 8px !important" // Adjust padding here
                              }
                            },
                            // Remove clear button
                            // eslint-disable-next-line react/jsx-no-useless-fragment
                            endAdornment: <>{params.InputProps.endAdornment}</>
                          }}
                        />
                      )}
                      sx={{ width: 220 }}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>

          <Controller
            name="attendees"
            disabled={!isEditable}
            control={control}
            rules={{
              required: "Vui lòng chọn người sẽ thực hiện công việc"
            }}
            onChange={([, data]) => data}
            render={({ field: { onChange, ...props } }) => {
              return (
                <Autocomplete
                  className="!mt-2"
                  label="Giao công việc (*)"
                  loading={isLoadingMembers}
                  limitTags={3}
                  multiple
                  width={350}
                  filterSelectedOptions
                  options={channelMembers ?? []}
                  noOptionsText="Không có thành viên nào"
                  getOptionLabel={(member) => member?.name ?? ""}
                  renderOption={(optProps, member, state, ownerState) => {
                    return (
                      <ListItem {...optProps} ownerState={ownerState}>
                        <ListItemAvatar>
                          <Avatar src={getImageUrlWithKey(member.imageUrl)} className="!w-8 !h-8" />
                        </ListItemAvatar>
                        <ListItemText>{member.name}</ListItemText>
                      </ListItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      label="Giao công việc (*)"
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
          <Button onClick={onCancel}>Đóng</Button>
          {isEditable && <Button type="submit">{titlebtnDialog}</Button>}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

CreateTaskDialog.defaultProps = {
  taskId: null,
  suggestedTask: null,
  onClose: null
};

CreateTaskDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  suggestedTask: PropTypes.objectOf(PropTypes.any),
  onClose: PropTypes.func
};

export default CreateTaskDialog;
