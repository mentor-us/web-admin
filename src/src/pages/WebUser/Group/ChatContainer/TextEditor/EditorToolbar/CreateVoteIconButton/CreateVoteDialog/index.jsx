import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import "dayjs/locale/vi";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useCreateVoteMutation } from "hooks/chats/mutation";
import useMyInfo from "hooks/useMyInfo";

import MultiChoiceSwitch from "./MultiChoiceSwitch";
import VoteOption from "./VoteOption";

function CreateVoteDialog({ open, handleClose }) {
  const myInfo = useMyInfo();
  const { channelId } = useParams();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      question: "",
      timeEnd: null,
      isMultipleChoice: true,
      choices: [
        { id: uuidv4().toString(), name: "" },
        { id: uuidv4().toString(), name: "" }
      ]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices"
  });
  const watchFieldArray = watch("choices");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const { mutateAsync: createVoteMutationAsync, isPending } = useCreateVoteMutation();

  const prepareData = (data) => {
    return {
      question: data.question,
      groupId: channelId,
      creatorId: myInfo.id,
      timeEnd: data.timeEnd ? data.timeEnd.toJSON() : undefined,
      choices: data.choices,
      isMultipleChoice: data.isMultipleChoice
    };
  };

  const onCancel = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    toast.promise(
      new Promise((resolve, reject) => {
        createVoteMutationAsync(prepareData(data))
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(channelId)
            });
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang tạo bình chọn...",
        success: "Tạo bình chọn thành công",
        error: "Tạo bình chọn thất bại"
      }
    );

    onCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={onCancel}
        PaperProps={{
          component: "form",
          className: "!px-2 "
        }}
        onSubmit={(event) => {
          if (isPending) {
            return;
          }
          event.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <DialogTitle alignSelf="center">Tạo bình chọn</DialogTitle>
        <DialogContent className="!py-4">
          <Controller
            name="question"
            control={control}
            rules={{
              required: "Vui lòng nhập câu hỏi cần bình chọn",
              maxLength: {
                value: 100,
                message: "Câu hỏi không được vượt quá 100 ký tự"
              }
            }}
            render={({ field: { ref, ...fieldData } }) => (
              <TextField
                className="!mb-2"
                label="Câu hỏi bình chọn *"
                fullWidth
                error={!!errors?.question}
                helperText={errors?.question?.message}
                {...fieldData}
                inputRef={ref}
              />
            )}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography className="!text-base !font-medium !text-[#006EDC]">
              Các lựa chọn
            </Typography>
            <Stack>
              <Tooltip
                title="Thêm lựa chọn"
                onClick={() =>
                  append({
                    id: uuidv4().toString(),
                    name: ""
                  })
                }
              >
                <IconButton>
                  <AddIcon className="!text-[#006EDC]" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            marginBottom={1}
            maxHeight={200}
            overflow="auto"
            paddingY={1}
          >
            {controlledFields.map((field, index) => (
              <VoteOption
                key={field.id}
                remove={remove}
                errors={errors}
                {...{ control, index, field }}
              />
            ))}
          </Stack>
          <Typography className="!text-base !font-medium !text-[#006EDC] !mb-4">
            Tùy chọn
          </Typography>
          <Stack direction="row" spacing={4} alignItems="center">
            <Controller
              name="timeEnd"
              control={control}
              rules={{
                required: false,
                validate: {
                  gtnow: (v) => {
                    if (!v || dayjs().isBefore(v)) {
                      return true;
                    }

                    return "Thời hạn phải luôn lớn hơn thời điểm hiện tại";
                  }
                }
              }}
              render={({ field: { onChange, ...rest } }) => {
                return (
                  <DateTimePicker
                    slotProps={{
                      actionBar: {
                        actions: ["clear", "accept"]
                      },
                      digitalClockSectionItem: {
                        sx: {
                          minWidth: 0
                        }
                      },
                      textField: {
                        placeholder: "Không có thời hạn",
                        fullWidth: false,
                        error: !!errors?.timeEnd,
                        helperText: errors?.timeEnd?.message
                      }
                    }}
                    localeText={{
                      clearButtonLabel: "Không có thời hạn",
                      okButtonLabel: "Chọn thời hạn"
                    }}
                    label={watch().timeEnd ? "Thời hạn" : ""}
                    minTime={dayjs()}
                    disablePast
                    onChange={(newValue) => onChange(newValue)}
                    renderInput={(field) => {
                      return <TextField {...field} />;
                    }}
                    {...rest}
                  />
                );
              }}
            />

            <Controller
              name="isMultipleChoice"
              control={control}
              rules={{ required: false }}
              render={({ field }) => {
                return (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography className="!text-base !text-black">Chọn nhiều phương án</Typography>
                    <MultiChoiceSwitch defaultChecked {...field} />
                  </Stack>
                );
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit">Tạo bình chọn</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

CreateVoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateVoteDialog;
