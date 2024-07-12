/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { Edit, ShareOutlined } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar, Box, CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { confirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import { formatDate, getImageUrlWithKey } from "utils";
import color from "assets/theme/base/colors";

import { useDeleteNoteMutation } from "hooks/notes/mutation";
import { useGetNoteById } from "hooks/notes/queries";
import useMyInfo from "hooks/useMyInfo";

import "./index.css";
import "react-vertical-timeline-component/style.min.css";

function NoteHistory({ noteId }) {
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const { data: noteDetail, isLoading, isSuccess, isError } = useGetNoteById(noteId);
  const { mutateAsync: deleteNoteMutateAsync } = useDeleteNoteMutation();

  const timelineElementStyle = {
    background: "#ffffff",
    color: "#333",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  };

  const iconStyle = {
    background: "#4caf50",
    color: "#ffffff",
    transform: "scale(0.8)"
  };

  const titleStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 5px 0"
  };

  const contentStyle = {
    fontSize: "0.875rem !important",
    color: "#666",
    margin: "0 0 5px 0"
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20em" // Adjust this height based on your container
      >
        <CircularProgress color="info" />
      </Box>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-red-800">Không có lịch sử</p>
      </div>
    );
  }

  if (!isSuccess || !noteDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-zinc-800">Không có lịch sử</p>
      </div>
    );
  }

  if (noteDetail?.noteHistories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-zinc-800">Không có lịch sử</p>
      </div>
    );
  }

  return (
    <Stack className="min-h-60 overflow-auto" maxHeight={550}>
      {noteDetail?.noteHistories.length > 0 && (
        <VerticalTimeline lineColor="#e3e3e3" layout="1-column-left">
          {noteDetail.noteHistories.map((note) => (
            <VerticalTimelineElement
              key={note.id}
              className="vertical-timeline-element--work cursor-pointer"
              contentStyle={timelineElementStyle}
              contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
              iconStyle={iconStyle}
              date={formatDate(note.updatedDate)}
              dateClassName="pl-1"
              icon={
                <Tooltip title={note.updatedBy.name}>
                  <Avatar
                    className="!rounded-lg"
                    src={getImageUrlWithKey(note.updatedBy.imageUrl)}
                    sx={{ width: "50px", height: "50px", border: "6px solid #ffffff" }}
                  />
                </Tooltip>
              }
            >
              <h3 className="text-base font-bold" style={titleStyle}>
                {note.title}
              </h3>
              <div
                className="text-base note-content-history"
                style={contentStyle}
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
    </Stack>
  );
}

NoteHistory.propTypes = {
  noteId: PropTypes.string.isRequired
};

export default NoteHistory;
