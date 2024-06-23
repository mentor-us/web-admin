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
import NoteShare from "./NoteShare";
import NoteUserList from "./NoteUserList";

function NoteDialog({ open, onClose }) {
  const [type, setType] = useState("list");
  const [selectedUserNote, setSelectedUserNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const handleCreate = (note) => {
    setType("create");
  };
  const openDetailUserNote = (userNoteId) => {
    setType("detail");
    setSelectedUserNote(userNoteId);
  };
  const openShareNoteDialog = (noteId) => {
    setType("share");
    setSelectedNote(noteId);
  };
  const renderContent = () => {
    switch (type) {
      case "list":
        return <NoteUserList onDetail={openDetailUserNote} />;
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
            onShareClick={openShareNoteDialog}
            onCancel={() => {
              setType("list");
            }}
          />
        );
      case "share":
        return (
          <NoteShare
            noteId={selectedNote}
            onCancel={() => {
              setType("detail");
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
      case "share":
        return "Chia sẻ ghi chú";
      default:
        return "Danh sách ghi chú";
    }
  };
  const onDetailBack = () => {
    setType("list");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="min-w-60">
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
