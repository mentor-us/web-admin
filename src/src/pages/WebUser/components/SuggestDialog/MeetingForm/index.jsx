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

function MeetingForm({ index, control, realChannelId }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();

  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    realChannelId || channelId,
    (members) => members?.filter((member) => member.id !== myInfo.id) ?? []
  );

  const {
    errors: { meetings: meetingErrors }
  } = useFormState({ control });
  const timeStart = useWatch({ name: `meetings.${index}.timeStart`, control });
  const isHasError = meetingErrors && meetingErrors[index];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DialogContent className="!py-4">
        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name={`meetings.${index}.title`}
          control={control}
          rules={{
            required: "Vui lòng nhập tiêu đề",
            maxLength: {
              value: 100,
              message: "Tiêu đề không được vượt quá 100 ký tự"
            }
          }}
          render={({ field }) => (
            <TextField
              className="!mb-6"
              label="Tiêu đề *"
              fullWidth
              error={isHasError ? !!meetingErrors[index]?.title : false}
              helperText={isHasError ? meetingErrors[index]?.title?.message : null}
              {...field}
            />
          )}
        />

        <Controller
          name={`meetings.${index}.description`}
          control={control}
          rules={{
            required: false,
            maxLength: {
              value: 250,
              message: "Mô tả không được vượt quá 250 ký tự"
            }
          }}
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
          <Grid item xs={4}>
            <Controller
              name={`meetings.${index}.timeStart`}
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
              render={({ field: { onChange, value, ...rest } }) => {
                return (
                  <MobileTimePicker
                    className="!mb-6"
                    fullWidth
                    label="Từ *"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: isHasError ? !!meetingErrors[index]?.timeStart : false,
                        helperText: isHasError ? meetingErrors[index]?.timeStart?.message : null
                      }
                    }}
                    onChange={(newValue) => onChange(newValue.toString())}
                    renderInput={(params) => <TextField {...params} label="Từ *" />}
                    value={value ? dayjs(value) : null}
                    {...rest}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={`meetings.${index}.timeEnd`}
              control={control}
              rules={{
                required: "Vui lòng nhập giờ kết thúc",
                validate: {
                  gtstart: (v) => {
                    const timeStartHour = dayjs(timeStart).hour();
                    const timeStartMinute = dayjs(timeStart).minute();
                    if (
                      !v ||
                      timeStartHour < dayjs(v).hour() ||
                      (timeStartHour === dayjs(v).hour() && timeStartMinute < dayjs(v).minute())
                    ) {
                      return true;
                    }

                    return "Giờ kết thúc phải luôn lớn hơn giờ bắt đầu";
                  }
                }
              }}
              render={({ field: { onChange, value, ...rest } }) => {
                return (
                  <MobileTimePicker
                    className="!mb-6"
                    fullWidth
                    label="Đến *"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: isHasError ? !!meetingErrors[index]?.timeEnd : false,
                        helperText: isHasError ? meetingErrors[index]?.timeEnd?.message : null
                      }
                    }}
                    onChange={(newValue) => onChange(newValue.toString())}
                    renderInput={(params) => <TextField {...params} label="Đến *" />}
                    value={value ? dayjs(value) : null}
                    {...rest}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={`meetings.${index}.day`}
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
                        error: isHasError ? !!meetingErrors[index]?.day : false,
                        helperText: isHasError ? meetingErrors[index]?.day?.message : null
                      }
                    }}
                    localeText={{
                      todayButtonLabel: "Hôm nay"
                    }}
                    minDate={dayjs()}
                    maxDate={dayjs().date(31).month(11)}
                    onChange={(newValue) => onChange(newValue.toISOString())}
                    renderInput={(params) => <TextField {...params} label="Ngày *" />}
                    value={value ? dayjs(value) : null}
                    {...rest}
                  />
                );
              }}
            />
          </Grid>
        </Grid>

        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name={`meetings.${index}.place`}
          control={control}
          rules={{
            maxLength: {
              value: 150,
              message: "Địa điểm không được vượt quá 150 ký tự"
            }
          }}
          render={({ field }) => (
            <TextField
              className="!mb-6"
              label="Địa điểm"
              fullWidth
              error={isHasError ? !!meetingErrors[index]?.place : false}
              helperText={isHasError ? meetingErrors[index]?.place?.message : null}
              {...field}
            />
          )}
        />

        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs>
            <Controller
              name={`meetings.${index}.attendees`}
              control={control}
              rules={{
                required: "Vui lòng chọn người tham gia lịch hẹn"
              }}
              onChange={([, data]) => data}
              render={({ field: { onChange, value, ...props } }) => {
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
                        label="Người tham dự *"
                        error={isHasError ? !!meetingErrors[index]?.attendees : false}
                        helperText={isHasError ? meetingErrors[index]?.attendees?.message : null}
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
                        ? channelMembers.filter((member) => value.includes(member.id)) || []
                        : []
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

MeetingForm.defaultProps = {
  realChannelId: null
};

MeetingForm.propTypes = {
  index: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  realChannelId: PropTypes.string
};

export default MeetingForm;
