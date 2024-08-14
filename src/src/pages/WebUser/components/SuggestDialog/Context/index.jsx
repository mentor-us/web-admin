/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { useCallback, useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryClient } from "@tanstack/react-query";
import utc from "dayjs/plugin/utc";
import { useConfirm } from "material-ui-confirm";

import "dayjs/locale/vi";
import { AI_API_KEY } from "config";
import { MentorUsContext, MentorUsDispatchContext, setDialogOpen } from "context";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { capitalizeFirstLetter, getImageUrlWithKey } from "utils";
import MeetingApi from "api/MeetingApi";
import TaskApi from "api/TaskApi";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";
import { useGetChannelMembers } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { GetAllMeetingInChannelKey } from "hooks/meeting/keys";
import { GetAllTaskInChannelKey } from "hooks/tasks/keys";
import useMyInfo from "hooks/useMyInfo";
import { Color, MEETING_REPEATED_TYPE } from "utils/constants";

import MeetingForm from "../MeetingForm";
import TaskForm from "../TaskForm";

dayjs.extend(utc);

const ContentType = {
  INITIAL: "INITIAL",
  PREVIEW_RESULT: "PREVIEW_RESULT",
  EDIT_TASK: "EDIT_TASK",
  EDIT_MEETING: "EDIT_MEETING"
};

const genAI = new GoogleGenerativeAI(AI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Imagine you are an AI assistant, and you are helping summarize many tasks based on the sentence or HTML you are given. The task should include a title, a description, the deadline (you can calculate based on current date ${dayjs()
    .utc()
    .format("L LT")}),
   and the people(the subject of the sentence) who are assigned for the task. 
   Task object is like {"title": ExampleAbove, "description": ExampleAbove, "userIds": [ExampleName], "deadline": time and date ISO format}.
   Meeting object is like {"title": ExampleAbove, "description": ExampleAbove, "place": where the meeting should take, "attendees": [ExampleName], "timeStart": the start hour of the meeting in date with 24h format time and date ISO format, "timeEnd": the end hour of the meeting in date with 24h format time and date ISO format, "day": the day where the meeting occur time and date ISO format }. Output the vietnamese text only.`,

  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    }
  ],
  generationConfig: {
    topP: 0.98,
    temperature: 0.5
  }
});

function ContextDialog() {
  const { dialogOpen, dialogContent, currentChannelId } = useContext(MentorUsContext);
  const dispatch = useContext(MentorUsDispatchContext);

  const handleClose = () => {
    setDialogOpen(dispatch, { open: false, content: null });
  };
  const { channelId } = useParams();
  const realChannelId = channelId || currentChannelId;
  const confirm = useConfirm();
  const myInfo = useMyInfo();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    realChannelId || "",
    (members) => members ?? []
  );
  const queryClient = useQueryClient();
  const [isError, setIsError] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(0);
  const [contentType, setContentType] = useState(ContentType.INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset: resetFormData,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tasks: [],
      meetings: []
    }
  });

  const { remove: removeMeeting } = useFieldArray({
    control,
    name: "meetings",
    rules: {
      validate: (meetings) => {
        const errorsIndexs = meetings.reduce((acc, v, idx) => {
          if (
            !v.title ||
            !v.timeStart ||
            !v.timeEnd ||
            !v.attendees ||
            !v.day ||
            v.attendees.length === 0
          ) {
            acc.push(idx);
          }
          return acc;
        }, []);
        return errorsIndexs.length > 0 ? JSON.stringify(errorsIndexs) : true;
      }
    }
  });

  const { remove: removeTask } = useFieldArray({
    control,
    name: "tasks",
    rules: {
      validate: (tasks) => {
        const errorsIndexs = tasks.reduce((acc, v, idx) => {
          if (!v.title || !v.deadline || !v.userIds || v.userIds.length === 0) {
            acc.push(idx);
          }
          return acc;
        }, []);
        return errorsIndexs.length > 0 ? JSON.stringify(errorsIndexs) : true;
      }
    }
  });

  const changeToPreview = () => {
    setContentType(ContentType.PREVIEW_RESULT);
  };

  const backToInitial = () => {
    confirm({
      title: "Huỷ bỏ đề xuất ?",
      description: "Bạn sẽ mất hết các đề xuất hiện tại.",
      confirmationButtonProps: {
        sx: {
          backgroundColor: Color.error,
          borderRadius: "5px",
          color: "red",
          "&:hover": {
            backgroundColor: Color.error,
            color: "red"
          }
        }
      },
      confirmationText: "Xác nhận huỷ bỏ",
      cancellationText: "Tiếp tục chỉnh sửa"
    }).then(() => {
      setContentType(ContentType.INITIAL);
    });
  };

  const changeToEditTask = (currentTaskIndex) => {
    setContentType(ContentType.EDIT_TASK);
    setEditItemIndex(currentTaskIndex);
  };

  const changeToEditMeeting = (currentMeetingIndex) => {
    setContentType(ContentType.EDIT_MEETING);
    setEditItemIndex(currentMeetingIndex);
  };

  const handleSuggest = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await model.generateContent(
        `i have a list of users=${JSON.stringify(
          channelMembers
        )} and i want to extract the meeting and assign them tasks in this html ${dialogContent} - match user by name and insert user's id to assignees or attendees list. Please help me summarize the tasks and meeting to JSON and find match users id in the list. Return only the json data without code block. Divide the task and meeting by type task or meeting whick key "tasks" for tasks and "meetings" for meetings.`
      );
      const response = await result.response;
      const responseText = response
        .text()
        .replace(/```json/g, "")
        .replace(/```/g, "");
      const jsonData = JSON.parse(responseText);
      resetFormData(jsonData);
      changeToPreview();
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const watchedTasks = watch("tasks");
  const watchedMeetings = watch("meetings");

  const renderTitle = useCallback(() => {
    switch (contentType) {
      case ContentType.INITIAL:
        return (
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Đề xuất tự động
          </MDTypography>
        );
      case ContentType.PREVIEW_RESULT:
        return (
          <>
            <IconButton
              className="!absolute !left-5 hover:!bg-slate-300 rounded-full"
              size="small"
              onClick={backToInitial}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
              Xem trước
            </MDTypography>
          </>
        );
      case ContentType.EDIT_TASK:
        return (
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Chỉnh sửa công việc
          </MDTypography>
        );
      case ContentType.EDIT_MEETING:
        return (
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Chỉnh sửa lịch hẹn
          </MDTypography>
        );
      default:
        return null;
    }
  }, [contentType]);

  const renderContent = () => {
    switch (contentType) {
      case ContentType.INITIAL:
        return (
          <>
            <Box className="mb-2">
              <MDTypography
                variant="body2"
                fontWeight="regular"
                color="dark"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                Nội dung tin nhắn:
              </MDTypography>
              <MDBox
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "10px"
                }}
              >
                <div
                  className="text-xs text-nowrap !text-[#444]"
                  style={{
                    display: "block",
                    overflow: "hidden",
                    overflowY: "auto",
                    whiteSpace: "initial",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                    fontSize: "0.875rem",
                    padding: "0.2rem",
                    maxHeight: "10rem"
                  }}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dialogContent) }}
                />
              </MDBox>
            </Box>
            <Box className="flex justify-center items-end">
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    marginTop: "1rem",
                    color: Color.primary
                  }}
                />
              )}
              {isError && (
                <Typography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "red",
                    textAlign: "center",
                    width: "80%"
                  }}
                >
                  Đã xảy ra lỗi khi đề xuất.
                  <br /> Vui lòng thử lại sau hoặc thay đổi nội dung tin nhắn.
                </Typography>
              )}
            </Box>
          </>
        );
      case ContentType.PREVIEW_RESULT:
        if (isError) {
          return null;
        }

        return watchedMeetings.length > 0 || watchedTasks.length > 0 ? (
          <Box>
            {watchedMeetings.length > 0 && (
              <>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  Danh sách lịch hẹn:
                </MDTypography>
                <List
                  sx={{
                    width: "100%",
                    backgroundColor: "#F4F5F7",
                    padding: "0.125rem",
                    maxHeight: "300px"
                  }}
                >
                  {watchedMeetings.map((field, index) => {
                    const dateFormatted = dayjs(field?.day);
                    const isHasError = errors?.meetings?.root?.message
                      ? JSON.parse(errors?.meetings?.root?.message)?.includes(index)
                      : false;
                    return (
                      <ListItem
                        key={field.id}
                        onClick={() => {
                          changeToEditMeeting(index);
                        }}
                      >
                        <Box
                          sx={{
                            padding: "0.5rem",
                            width: "100%",
                            cursor: "pointer",
                            userSelect: "none",
                            boxSizing: "border-box",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            margin: "0.125rem 0",
                            borderRadius: "3px",
                            boxShadow:
                              "var(--ds-shadow-raised, 0 1px 1px rgba(23, 43, 77, 0.2), 0 0 1px rgba(23, 43, 77, 0.2))",
                            transition:
                              "background-color 140ms ease-in-out 0s, color 140ms ease-in-out 0s",
                            backgroundColor: "#FFFFFF",
                            "--jsw-card-background-color": "#FFFFFF",
                            color: "#172B4D",
                            filter: "none",
                            maxWidth: "100%",
                            borderWidth: "1px",
                            borderColor: isHasError ? "red" : null
                          }}
                        >
                          <Stack direction="row" justifyContent="flex-start" alignItems="center">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="dark"
                              sx={{ fontSize: "0.875rem", flex: 1 }}
                            >
                              {field?.title}
                            </Typography>
                            <IconButton
                              sx={{
                                width: "24px",
                                height: "24px"
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                confirm({
                                  title: "Xác nhận xóa lịch hẹn?",
                                  description: "Lịch hẹn sẽ bị xóa khỏi danh sách.",
                                  confirmationButtonProps: {
                                    sx: {
                                      backgroundColor: Color.error,
                                      borderRadius: "5px",
                                      color: "red",
                                      "&:hover": {
                                        backgroundColor: Color.error,
                                        color: "red"
                                      }
                                    }
                                  },
                                  confirmationText: "Xác nhận xóa",
                                  cancellationText: "Hủy"
                                }).then(() => {
                                  removeMeeting(index);
                                });
                              }}
                            >
                              <DeleteRoundedIcon
                                sx={{
                                  width: "20px",
                                  height: "20px",
                                  color: "red"
                                }}
                              />
                            </IconButton>
                          </Stack>
                          <Typography
                            variant="body2"
                            fontWeight="regular"
                            color="dark"
                            sx={{ fontSize: "0.8rem", color: "grey" }}
                          >
                            {field?.timeStart
                              ? dayjs(field?.timeStart.slice(0, -1)).format("HH:mm")
                              : ""}{" "}
                            -{" "}
                            {field?.timeEnd
                              ? dayjs(field?.timeEnd.slice(0, -1)).format("HH:mm")
                              : ""}{" "}
                            {dateFormatted.locale("vi").format("LL")}
                          </Typography>
                          {field?.attendees && field?.attendees?.length > 0 ? (
                            <AvatarGroup
                              componentsProps={{
                                additionalAvatar: {
                                  className: "!w-[24px] !h-[24px] !text-[0.8rem]"
                                }
                              }}
                              sx={{
                                justifyContent: "start"
                              }}
                              max={4}
                              total={field?.attendees?.length || 0}
                            >
                              {field.attendees.map((attendee) => {
                                const member = channelMembers.find((m) => m.id === attendee);
                                return (
                                  <TooltipCustom title={`Người tham dự: ${member?.name}`}>
                                    <Avatar
                                      className="!text-[0.8rem]"
                                      key={attendee}
                                      alt={member?.name}
                                      src={getImageUrlWithKey(member?.imageUrl)}
                                      sx={{
                                        width: 24,
                                        height: 24
                                      }}
                                    />
                                  </TooltipCustom>
                                );
                              })}
                            </AvatarGroup>
                          ) : (
                            <Typography
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              Chưa có người tham dự
                            </Typography>
                          )}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
            {watchedTasks.length > 0 && (
              <>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ fontSize: "14px", fontWeight: "bold", marginVertical: "0.5rem" }}
                >
                  Danh sách công việc:
                </MDTypography>
                <List
                  sx={{
                    width: "100%",
                    backgroundColor: "#F4F5F7",
                    padding: "0.125rem",
                    maxHeight: "300px",
                    overflowY: "auto"
                  }}
                >
                  {watchedTasks.map((field, index) => {
                    const deadlineFormatted = dayjs(field?.deadline).toISOString();
                    const isHasError = errors?.tasks?.root?.message
                      ? JSON.parse(errors?.tasks?.root?.message)?.includes(index)
                      : false;
                    return (
                      <ListItem
                        key={field.id}
                        onClick={() => {
                          changeToEditTask(index);
                        }}
                      >
                        <Box
                          sx={{
                            padding: "0.5rem",
                            width: "100%",
                            cursor: "pointer",
                            userSelect: "none",
                            boxSizing: "border-box",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            margin: "0.125rem 0",
                            borderRadius: "3px",
                            boxShadow:
                              "var(--ds-shadow-raised, 0 1px 1px rgba(23, 43, 77, 0.2), 0 0 1px rgba(23, 43, 77, 0.2))",
                            transition:
                              "background-color 140ms ease-in-out 0s, color 140ms ease-in-out 0s",
                            backgroundColor: "#FFFFFF",
                            "--jsw-card-background-color": "#FFFFFF",
                            color: "#172B4D",
                            filter: "none",
                            maxWidth: "100%",
                            borderWidth: "1px",
                            borderColor: isHasError ? "red" : null
                          }}
                        >
                          <Stack direction="row" justifyContent="flex-start" alignItems="center">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="dark"
                              sx={{ fontSize: "0.875rem", flex: 1 }}
                            >
                              {field.title}
                            </Typography>
                            <IconButton
                              sx={{
                                width: "24px",
                                height: "24px"
                              }}
                              onClick={(e) => {
                                e.stopPropagation();

                                confirm({
                                  title: "Xác nhận xóa công việc?",
                                  description: "Công việc sẽ bị xóa khỏi danh sách.",
                                  confirmationButtonProps: {
                                    sx: {
                                      backgroundColor: Color.error,
                                      borderRadius: "5px",
                                      color: "red",
                                      "&:hover": {
                                        backgroundColor: Color.error,
                                        color: "red"
                                      }
                                    }
                                  },
                                  confirmationText: "Xác nhận xóa",
                                  cancellationText: "Hủy"
                                }).then(() => {
                                  removeTask(index);
                                });
                              }}
                            >
                              <DeleteRoundedIcon
                                sx={{
                                  width: "20px",
                                  height: "20px",
                                  color: "red"
                                }}
                              />
                            </IconButton>
                          </Stack>
                          {field?.deadline && (
                            <Typography
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                              sx={{ fontSize: "0.8rem", color: "grey" }}
                            >
                              {capitalizeFirstLetter(
                                dayjs(deadlineFormatted).locale("vi").format("LLLL")
                              )}
                            </Typography>
                          )}
                          {field?.userIds && field?.userIds?.length > 0 ? (
                            <AvatarGroup
                              componentsProps={{
                                additionalAvatar: {
                                  className: "!w-[24px] !h-[24px] !text-[0.8rem]"
                                }
                              }}
                              sx={{
                                justifyContent: "start"
                              }}
                              max={4}
                              total={field?.userIds?.length || 0}
                            >
                              {field?.userIds?.map((userId) => {
                                const member = channelMembers.find((m) => m.id === userId);
                                return (
                                  <TooltipCustom title={`Người thực hiện: ${member?.name}`}>
                                    <Avatar
                                      className="!text-[0.8rem]"
                                      key={userId}
                                      alt={member?.name}
                                      src={getImageUrlWithKey(member?.imageUrl)}
                                      sx={{
                                        width: 24,
                                        height: 24
                                      }}
                                    />
                                  </TooltipCustom>
                                );
                              })}
                            </AvatarGroup>
                          ) : (
                            <Typography
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              Chưa có người thực hiện
                            </Typography>
                          )}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Box>
        ) : (
          <Box>
            <Typography
              variant="body2"
              fontWeight="regular"
              color="dark"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "1rem",
                color: Color.text
              }}
            >
              Không có công việc hoặc lịch hẹn nào được đề xuất.
              <br />
              Vui lòng thay đổi nội dung tin nhắn và thử lại.
            </Typography>
          </Box>
        );
      case ContentType.EDIT_TASK:
        return <TaskForm control={control} index={editItemIndex} realChannelId={realChannelId} />;
      case ContentType.EDIT_MEETING:
        return (
          <MeetingForm control={control} index={editItemIndex} realChannelId={realChannelId} />
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data) => {
    const tasksData =
      data?.tasks?.map((task) => {
        return {
          ...task,
          deadline: dayjs(task?.deadline).toJSON(),
          groupId: realChannelId
        };
      }) || [];

    const meetingsData =
      data?.meetings?.map((meeting) => {
        const dateTime = dayjs(meeting?.day).utc();
        return {
          ...meeting,
          place: meeting?.place || "",
          organizerId: myInfo.id,
          repeated: MEETING_REPEATED_TYPE.EVERY_DAY,
          groupId: realChannelId,
          timeEnd: dayjs(meeting?.timeEnd)
            .utc()
            .date(dateTime.date())
            .month(dateTime.month())
            .year(dateTime.year())
            .toISOString(),
          timeStart: dayjs(meeting?.timeStart)
            .utc()
            .date(dateTime.date())
            .month(dateTime.month())
            .year(dateTime.year())
            .toISOString()
        };
      }) || [];

    const sendApis = async () => {
      for await (const task of tasksData) {
        await TaskApi.createTask(task);
      }

      for await (const meeting of meetingsData) {
        await MeetingApi.createMeeting(meeting);
      }
    };

    toast.promise(
      new Promise((resolve) => {
        sendApis().then(resolve);
      }),
      {
        loading: "Đang tạo...",
        success: () => {
          Promise.allSettled([
            queryClient.invalidateQueries({
              queryKey: GetAllChatMessageInfinityKey(realChannelId)
            }),
            queryClient.invalidateQueries({
              queryKey: ["events"]
            }),
            queryClient.refetchQueries({
              queryKey: GetAllTaskInChannelKey(realChannelId)
            }),
            queryClient.refetchQueries({
              queryKey: GetAllMeetingInChannelKey(realChannelId)
            })
          ]).then(() => {
            setContentType(ContentType.INITIAL);
            handleClose();
          });

          return "Tạo thành công";
        },
        error: "Tạo thất bại"
      },
      {
        style: {
          minWidth: "250px"
        }
      }
    );
  };

  const onError = (err) => {
    if (err?.tasks && err?.meetings) {
      toast.error("Vui lòng kiểm tra lại thông tin của công việc và lịch hẹn", {
        className: "!text-[1rem] !min-w-[400px]",
        style: {
          minWidth: "300px"
        }
      });
      return;
    }

    if (err?.tasks) {
      toast.error("Vui lòng kiểm tra lại thông tin của công việc", {
        className: "!text-[1rem] !min-w-[400px]"
      });
      return;
    }

    if (err?.meetings) {
      toast.error("Vui lòng kiểm tra lại thông tin của lịch hẹn", {
        className: "!text-[1rem] !min-w-[400px]",
        style: {
          minWidth: "300px"
        }
      });
      return;
    }

    toast.error("Có lỗi xảy ra khi tạo công việc và lịch hẹn", {
      className: "!text-[1rem] !min-w-[400px]",
      style: {
        minWidth: "300px"
      }
    });
  };

  const renderActions = () => {
    switch (contentType) {
      case ContentType.INITIAL:
        return (
          <>
            <Button disabled={isLoading} color="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button disabled={isLoading || isLoadingMembers} onClick={handleSuggest}>
              Đề xuất
            </Button>
          </>
        );
      case ContentType.PREVIEW_RESULT:
        return (
          <Box>
            {(watchedMeetings.length > 0 || watchedTasks.length > 0) && (
              <Button
                disabled={isLoading}
                onClick={() => {
                  handleSubmit(onSubmit, onError)();
                }}
              >
                Tạo công việc và lịch hẹn
              </Button>
            )}
          </Box>
        );
      case ContentType.EDIT_TASK:
        return (
          <>
            <Button disabled={isLoading} color="secondary" onClick={changeToPreview}>
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              onClick={async () => {
                const isValid = await trigger(`tasks.${editItemIndex}`);
                if (isValid) {
                  changeToPreview();
                }
              }}
            >
              Xác nhận
            </Button>
          </>
        );
      case ContentType.EDIT_MEETING:
        return (
          <>
            <Button disabled={isLoading} color="secondary" onClick={changeToPreview}>
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              onClick={async () => {
                const isValid = await trigger(`meetings.${editItemIndex}`);
                if (isValid) {
                  changeToPreview();
                }
              }}
            >
              Xác nhận
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={dialogOpen} maxWidth="md" fullWidth>
      <DialogTitle alignSelf="center">{renderTitle()}</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mx-2">{renderContent()}</DialogContentText>
      </DialogContent>
      <DialogActions>{renderActions()}</DialogActions>
    </Dialog>
  );
}

export default ContextDialog;
