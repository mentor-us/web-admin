/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { makeTxtElipsis } from "utils";

import { useCreateChannelMutation } from "hooks/channels/mutation";
import { useGetAllChannelsByGroupId, useGetGroupMembers } from "hooks/channels/queries";
import { GetWorkspaceQueryKey } from "hooks/groups/keys";
import useMyInfo from "hooks/useMyInfo";
import { CHANNEL_TYPE } from "utils/constants";

function CreateNewChannelDialog({ open, handleClose }) {
  const myInfo = useMyInfo();
  const { groupId } = useParams();
  const { data: channelNameList } = useGetAllChannelsByGroupId(groupId, (data) =>
    data.map((channel) => channel.name)
  );

  const { data: memberList, isLoading: isLoadingMembers } = useGetGroupMembers(groupId, (data) => {
    const mergeList = [];
    if (data && data?.mentors) {
      mergeList.push(...data.mentors.map((mentor) => ({ ...mentor, category: "Mentor" })));
    }
    if (data && data?.mentees) {
      mergeList.push(...data.mentees.map((mentee) => ({ ...mentee, category: "Mentee" })));
    }

    return mergeList;
  });
  const optionMemberList = useMemo(
    () => (memberList ? memberList.filter((member) => member.id !== myInfo.id) : []),
    [memberList]
  );

  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      channelName: "",
      description: "",
      userIds: []
    }
  });

  const { mutateAsync: submitChannelAsync, isPending } = useCreateChannelMutation();

  useEffect(() => {
    setValue("userIds", optionMemberList);
  }, [optionMemberList]);

  const prepareData = (data) => {
    const newData = { ...data };
    const { userIds } = data;

    newData.userIds = userIds.map((user) => user.id);
    newData.groupId = groupId;
    newData.creatorId = myInfo.id;
    newData.type =
      newData.userIds.length === optionMemberList.length
        ? CHANNEL_TYPE.PUBLIC
        : CHANNEL_TYPE.PRIVATE;
    return newData;
  };

  const onCancel = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    toast.promise(submitChannelAsync(prepareData(data)), {
      loading: "Đang tạo kênh...",
      success: () => {
        queryClient.invalidateQueries({
          queryKey: GetWorkspaceQueryKey(groupId)
        });
        return (
          <span className="text-base">
            Tạo kênh <b>{makeTxtElipsis(data.channelName)}</b> thành công
          </span>
        );
      },
      error: () => {
        return (
          <span className="text-base">
            Tạo kênh <b>{makeTxtElipsis(data.channelName)}</b> thất bại
          </span>
        );
      }
    });

    onCancel();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
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
      <DialogTitle alignSelf="center">Tạo kênh mới</DialogTitle>
      <DialogContent className="!py-4">
        <Controller
          getGroupDetailColumnHeadersMentorSelector
          name="channelName"
          control={control}
          rules={{
            required: "Vui lòng nhập tên kênh",
            validate: {
              unique: (name) => {
                if (channelNameList && channelNameList.includes(name.toString())) {
                  return `Đã tồn tại kênh có tên ${name}`;
                }
                return true;
              }
            }
          }}
          render={({ field }) => (
            <TextField
              className="!mb-6"
              label="Tên kênh *"
              fullWidth
              error={!!errors?.channelName}
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
                className="!mb-6"
                label="Mô tả"
                fullWidth
                error={!!errors?.description}
                {...field}
              />
            );
          }}
        />

        <Controller
          name="userIds"
          control={control}
          rules={{
            required: "Vui lòng chọn thành viên cho kênh",
            minLength: {
              value: 1,
              message: "error message"
            }
          }}
          onChange={([, data]) => data}
          defaultValue={optionMemberList ?? []}
          render={({ field: { onChange, ...props } }) => {
            return (
              <Autocomplete
                className="!mt-2"
                loading={isLoadingMembers}
                limitTags={3}
                multiple
                width={350}
                filterSelectedOptions
                options={optionMemberList ?? []}
                noOptionsText="Không có thành viên nào"
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.name ?? ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn thành viên *"
                    error={!!errors?.userIds}
                    helperText={errors?.userIds?.message}
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
        <Button type="submit">
          {isPending ? <CircularProgress color="inherit" size={20} /> : "Tạo kênh"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateNewChannelDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateNewChannelDialog;