/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { Controller, useFormState, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Avatar,
  CircularProgress,
  DialogContent,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import { getImageUrlWithKey } from "utils";

import { useGetChannelMembers } from "hooks/channels/queries";
import useMyInfo from "hooks/useMyInfo";

function TaskForm({ index, control }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId,
    (members) => members?.filter((member) => member.id !== myInfo.id) ?? []
  );

  const {
    errors: { tasks: tasksErrors }
  } = useFormState({ control });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DialogContent className="!py-4">
        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name={`tasks.${index}.title`}
          control={control}
          rules={{
            required: "Vui lòng nhập tiêu đề"
          }}
          render={({ field }) => (
            <TextField
              className="!mb-6"
              label="Tiêu đề *"
              fullWidth
              error={tasksErrors && tasksErrors[index] ? !!tasksErrors[index]?.title : false}
              helperText={
                tasksErrors && tasksErrors[index] ? tasksErrors[index]?.title?.message : null
              }
              {...field}
            />
          )}
        />

        <Controller
          name={`tasks.${index}.description`}
          control={control}
          rules={{ required: false }}
          render={({ field }) => {
            return (
              <TextField
                multiline
                maxRows={4}
                className="!mb-6"
                label="Mô tả"
                fullWidth
                {...field}
              />
            );
          }}
        />

        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs>
            <Controller
              name={`tasks.${index}.deadline`}
              control={control}
              render={({ field: { onChange, value, ...rest } }) => {
                return (
                  <MobileTimePicker
                    className="!mb-6"
                    fullWidth
                    label="Tới hạn lúc *"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          tasksErrors && tasksErrors[index]
                            ? !!tasksErrors[index]?.deadline
                            : false,
                        helperText:
                          tasksErrors && tasksErrors[index]
                            ? tasksErrors[index]?.deadline?.message
                            : null
                      }
                    }}
                    onChange={(newValue) => onChange(newValue.toString())}
                    renderInput={(params) => <TextField {...params} label="Tới hạn *" />}
                    value={value ? dayjs(value) : null}
                    {...rest}
                  />
                );
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`tasks.${index}.deadline`}
              control={control}
              rules={{
                required: "Vui lòng nhập ngày hẹn",
                validate: {
                  gtnow: (v) => {
                    if (!v || dayjs().isSameOrBefore(v, "date")) {
                      return true;
                    }
                    return "Thời hạn phải lớn hơn hoặc bằng thời gian hiện tại";
                  }
                }
              }}
              render={({ field: { onChange, value, ...rest } }) => {
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
                        error:
                          tasksErrors && tasksErrors[index] ? !!tasksErrors[index]?.deadline : false
                      }
                    }}
                    localeText={{
                      todayButtonLabel: "Hôm nay"
                    }}
                    minDate={dayjs()}
                    maxDate={dayjs().date(31).month(11)}
                    onChange={(newValue) =>
                      onChange(
                        dayjs(value)
                          .date(newValue.date())
                          .month(newValue.month())
                          .year(newValue.year())
                          .toString()
                      )
                    }
                    renderInput={(params) => <TextField {...params} label="Ngày *" />}
                    value={value ? dayjs(value) : null}
                    {...rest}
                  />
                );
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs>
            <Controller
              name={`tasks.${index}.userIds`}
              control={control}
              rules={{
                required: "Vui lòng chọn người thực hiện công việc"
              }}
              onChange={([, data]) => data}
              render={({ field: { onChange, value, ...props } }) => {
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
                        label="Giao công việc *"
                        error={
                          tasksErrors && tasksErrors[index] ? !!tasksErrors[index]?.userIds : false
                        }
                        helperText={
                          tasksErrors && tasksErrors[index]
                            ? tasksErrors[index]?.userIds?.message
                            : null
                        }
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
                    isOptionEqualToValue={(option, value1) => option.id === value1.id}
                    clearText="Xóa hết"
                    closeText="Đóng"
                    onChange={(e, data) => {
                      onChange(data.map((item) => item.id));
                    }}
                    value={
                      channelMembers
                        ? channelMembers.filter((member) => value.includes(member.id)) || null
                        : null
                    }
                    {...props}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </LocalizationProvider>
  );
}

TaskForm.defaultProps = {};

TaskForm.propTypes = {
  index: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired
};

export default TaskForm;
