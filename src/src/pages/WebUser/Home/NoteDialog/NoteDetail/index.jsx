/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { ShareOutlined } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar, colors, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { confirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import { formatDate, getImageUrlWithKey } from "utils";
import color from "assets/theme/base/colors";

import { useDeleteNoteMutation } from "hooks/notes/mutation";
import { useGetUserNoteByUserId } from "hooks/notes/queries";
import { useGetUserNotesByUserIdKey } from "hooks/profile/key";
import useMyInfo from "hooks/useMyInfo";

import "react-vertical-timeline-component/style.min.css";

function NoteDetail({ noteUserId, onShareClick }) {
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const { data: notes, isLoading, isSuccess, isError } = useGetUserNoteByUserId(noteUserId);
  const { mutateAsync: deleteNoteMutateAsync } = useDeleteNoteMutation();
  const timelineElementStyle = {
    background: "#f9f9f9",
    color: "#333",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
  };

  const iconStyle = {
    background: "#61DAFB",
    color: "#fff",
    transform: "scale(0.8)"
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-zinc-800">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-red-800">Error loading data</p>
      </div>
    );
  }

  if (!isSuccess || notes?.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-zinc-800">No data available</p>
      </div>
    );
  }

  const onDeleteChannelClick = (id) => {
    confirm({
      title: "Xác nhận xóa ghi chú",
      description: <span className="text-base">Bạn có chắc chắn muốn xóa ghi chú này không?</span>,
      confirmationText: "Xóa",
      cancellationText: "Hủy",
      buttonOrder: ["confirm", "cancel"],
      cancellationButtonProps: {
        autoFocus: true,
        variant: "contained",
        sx: {
          "&:hover": {
            opacity: 0.9
          },
          color: color.light.main
        }
      },
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
        sx: {
          "&:hover": {
            opacity: 0.9,
            backgroundColor: colors.red[900]
          },
          backgroundColor: colors.red[600],
          color: colors.common.white
        }
      }
    }).then(() => {
      toast.promise(
        deleteNoteMutateAsync(id).then(() => {
          queryClient.refetchQueries({
            queryKey: useGetUserNotesByUserIdKey(noteUserId)
          });
        }),
        {
          loading: "Đang xoá ghi chú...",
          success: <span className="text-base">Xoá ghi chú thành công</span>,
          error: <span className="text-base">Xoá ghi chú thất bại</span>
        }
      );
    });
  };

  return (
    <div className="min-h-60">
      <VerticalTimeline lineColor="#e3e3e3" layout="1-column-left">
        {notes?.data.map((note) => (
          <VerticalTimelineElement
            key={note.id}
            className="vertical-timeline-element--work cursor-pointer"
            contentStyle={timelineElementStyle}
            contentArrowStyle={{ borderRight: "7px solid #f9f9f9" }}
            iconStyle={iconStyle}
            date={formatDate(note.updatedDate)}
            dateClassName="pl-1"
            icon={
              <Tooltip title={note.creator.name}>
                <Avatar
                  className="!rounded-lg"
                  src={getImageUrlWithKey(note.creator.imageUrl)}
                  sx={{ width: "50px", height: "50px", border: "6px solid #f9f9f9" }}
                />
              </Tooltip>
            }
          >
            <h3 className="text-base pl-1">{note.title}</h3>
            <div
              className="text-sm text-zinc-600 pl-2"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <div className="absolute bottom-0 right-0">
              {note?.owner?.id === myInfo?.id && (
                <IconButton type="button" sx={{ p: "10px" }} aria-label="share">
                  <ShareOutlined onClick={() => onShareClick(note.id)} />
                </IconButton>
              )}
              {(note?.owner?.id === myInfo?.id || note.creator.id === myInfo?.id) && (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="delete"
                  onClick={() => onDeleteChannelClick(note.id)}
                >
                  <DeleteOutlineIcon color="error" />
                </IconButton>
              )}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

NoteDetail.propTypes = {
  noteUserId: PropTypes.string.isRequired,
  onShareClick: PropTypes.func.isRequired
};

export default NoteDetail;
