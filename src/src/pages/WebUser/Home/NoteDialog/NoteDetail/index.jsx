/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { ShareOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { formatDate, getImageUrlWithKey } from "utils";

import { useGetUserNoteByUserId } from "hooks/notes/queries";

import "react-vertical-timeline-component/style.min.css";

const user1 = {
  id: "user-001",
  name: "Alice Johnson",
  imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  email: "alice.johnson@example.com",
  totalNotes: 5
};

const user2 = {
  id: "user-002",
  name: "Bob Smith",
  imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
  email: "bob.smith@example.com",
  totalNotes: 8
};

function NoteDetail({ noteUserId }) {
  const { data: notes, isLoading, isSuccess } = useGetUserNoteByUserId(noteUserId);

  const timelineElementStyle = {
    background: "#e3e3e3",
    color: "#000",
    padding: "5px", // Reduced padding for smaller size
    fontSize: "18px" // Reduced font size
  };

  const iconStyle = {
    background: "#61DAFB",
    color: "#000",
    // border: "2px solid #ff5733",
    transform: "scale(0.8)" // Reduced icon size
  };

  return (
    <div className="min-h-60">
      {notes?.data.length > 0 && (
        <VerticalTimeline lineColor="#e3e3e3" layout="1-column-left">
          {notes?.data?.map((note) => (
            <VerticalTimelineElement
              key={note.id}
              className="vertical-timeline-element--work cursor-pointer"
              contentStyle={timelineElementStyle}
              contentArrowStyle={{ borderRight: "7px solid #e3e3e3" }}
              iconStyle={iconStyle}
              date={formatDate(note.updatedDate)}
              icon={
                <Avatar
                  className="!rounded-lg"
                  src={getImageUrlWithKey(note.creator.imageUrl)}
                  sx={{ width: "50px", height: "50px", border: "6px solid #e3e3e3" }}
                />
              } // Reduced icon size
            >
              <h3 className="text-lg">{note.title}</h3>
              <h4 className="text-base text-zinc-800">{note.creator.name}</h4>
              <div
                className="text-sm text-zinc-600"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <div className="absolute bottom-0 right-0">
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <ShareOutlined />
                </IconButton>
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <ShareOutlined />
                </IconButton>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
      {!isSuccess && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg text-zinc-800">Không tồn tại dữ liệu</p>
        </div>
      )}
      {notes?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg text-zinc-800">Không tồn tại dữ liệu</p>
        </div>
      )}
    </div>
  );
}

NoteDetail.propTypes = {
  // eslint-disable-next-line react/require-default-props
  noteUserId: PropTypes.string
};

export default NoteDetail;
