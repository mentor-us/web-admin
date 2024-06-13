/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

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

const notes = [
  {
    id: "note-001",
    title: "Meeting Notes",
    content: "Discuss project roadmap and milestones.",
    creator: user1,
    owner: user1,
    createdDate: new Date("2023-06-01T10:00:00Z"),
    updatedDate: new Date("2023-06-02T10:00:00Z"),
    updatedBy: user1,
    isEditable: true
  },
  {
    id: "note-002",
    title: "Shopping List",
    content: "Milk, Eggs, Bread, Butter",
    creator: user2,
    owner: user2,
    createdDate: new Date("2023-06-05T15:00:00Z"),
    updatedDate: new Date("2023-06-06T15:00:00Z"),
    updatedBy: user2,
    isEditable: true
  },
  {
    id: "note-003",
    title: "Project Ideas",
    content: "1. Mobile App\n2. E-commerce Website\n3. Machine Learning Model",
    creator: user1,
    owner: user1,
    createdDate: new Date("2023-06-10T09:00:00Z"),
    updatedDate: new Date("2023-06-11T09:00:00Z"),
    updatedBy: user1,
    isEditable: true
  },
  {
    id: "note-004",
    title: "Workout Plan",
    content: "Monday: Chest\nTuesday: Back\nWednesday: Legs\nThursday: Arms\nFriday: Shoulders",
    creator: user2,
    owner: user2,
    createdDate: new Date("2023-06-15T12:00:00Z"),
    updatedDate: new Date("2023-06-16T12:00:00Z"),
    updatedBy: user2,
    isEditable: true
  },
  {
    id: "note-005",
    title: "Books to Read",
    content: "1. The Great Gatsby\n2. To Kill a Mockingbird\n3. 1984\n4. Moby Dick",
    creator: user1,
    owner: user1,
    createdDate: new Date("2023-06-20T18:00:00Z"),
    updatedDate: new Date("2023-06-21T18:00:00Z"),
    updatedBy: user1,
    isEditable: true
  }
];

function NoteDetail({ noteUserId, onCancel }) {
  useEffect(() => {
    if (noteUserId) {
      console.log(noteUserId);
    }
  }, [noteUserId]);

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
    <div>
      <VerticalTimeline lineColor="#e3e3e3" layout="1-column-left">
        {notes.map((note) => (
          <VerticalTimelineElement
            key={note.id}
            className="vertical-timeline-element--work cursor-pointer"
            contentStyle={timelineElementStyle}
            contentArrowStyle={{ borderRight: "7px solid #e3e3e3" }}
            iconStyle={iconStyle}
            date={note.updatedDate.toLocaleDateString()}
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
            <p className="text-sm text-zinc-600">{note.content}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

NoteDetail.propTypes = {
  // eslint-disable-next-line react/require-default-props
  noteUserId: PropTypes.string,
  onCancel: PropTypes.func.isRequired
};

export default NoteDetail;
