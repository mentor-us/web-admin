/* eslint-disable no-unused-vars */

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import NoteDetail from "./NoteDetail";
import NoteForm from "./NoteForm";
import NoteUserList from "./NoteUserList";

const fakedata = [
  {
    user: {
      id: "1",
      name: "John Doe",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "john.doe@example.com",
      totalNotes: 5
    }
  },
  {
    user: {
      id: "2",
      name: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane.smith@example.com",
      totalNotes: 12
    }
  },
  {
    user: {
      id: "3",
      name: "Alice Johnson",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "alice.johnson@example.com",
      totalNotes: 7
    }
  },
  {
    user: {
      id: "4",
      name: "Bob Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "bob.brown@example.com",
      totalNotes: 3
    }
  },
  {
    user: {
      id: "5",
      name: "Eve Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "eve.davis@example.com",
      totalNotes: 9
    }
  }
];

function NoteDialog({ open, onClose }) {
  const [notes, setNotes] = useState(fakedata);
  const [type, setType] = useState("list");
  const [selectedUserNote, setSelectedUserNote] = useState(null);
  const handleCreate = (note) => {
    setType("create");
  };
  const openDetailUserNote = (noteId) => {
    setType("detail");
    setSelectedUserNote(noteId);
  };

  const renderContent = () => {
    switch (type) {
      case "list":
        return <NoteUserList notes={notes} onDetail={openDetailUserNote} />;
      case "create":
        return (
          <NoteForm
            onCancel={() => {
              setType("list");
            }}
          />
        );
      case "detail":
        return (
          <NoteDetail
            noteUserId={selectedUserNote}
            onCancel={() => {
              setType("list");
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderTitle = () => {
    switch (type) {
      case "create":
        return "Tạo ghi chú";
      case "detail":
        return "Chi tiết ghi chú";
      default:
        return "Danh sách ghi chú";
    }
  };
  const onDetailBack = () => {
    setType("list");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="w-full !py-2" alignSelf="flex-start">
        <Stack className="w-full" direction="row" justifyContent="space-between">
          <span className="!p-2">{renderTitle()}</span>
          {type === "list" && (
            <IconButton
              className="!absolute !right-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
              size="small"
              onClick={() => handleCreate()}
            >
              <AddIcon />
            </IconButton>
          )}
          {type === "detail" && (
            <IconButton
              className="!absolute !right-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
              size="small"
              onClick={() => onDetailBack()}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 1, margin: 1 }}>{renderContent()}</DialogContent>
    </Dialog>
  );
}

NoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NoteDialog;
