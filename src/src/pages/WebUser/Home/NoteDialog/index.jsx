/* eslint-disable no-unused-vars */
import { forwardRef, useCallback, useState } from "react";
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
import NoteHistory from "./NoteHistory";
import NoteShare from "./NoteShare";
import NoteUserList from "./NoteUserList";

// Define transition effect for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NoteDialog({ open, onClose }) {
  const [type, setType] = useState("list");
  const [selectedUserNote, setSelectedUserNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteUserName, setSelectedNoteUserName] = useState(null);

  // Handle creating a new note
  const handleCreate = () => {
    setType("create");
    setSelectedNote(null);
  };

  // Open detail view for a user note
  const openDetailUserNote = useCallback((userNoteId, username) => {
    setType("detail");
    setSelectedUserNote(userNoteId);
    setSelectedNoteUserName(username);
  }, []);

  // Open share note dialog
  const openShareNoteDialog = useCallback((noteId) => {
    setType("share");
    setSelectedNote(noteId);
  }, []);

  // Open edit note dialog
  const openEditNoteDialog = useCallback((noteId) => {
    setType("create");
    setSelectedNote(noteId);
  }, []);
  const openHistoryNote = useCallback((noteId) => {
    setType("history");
    setSelectedNote(noteId);
  });

  // Render content based on the current dialog type
  const renderContent = () => {
    switch (type) {
      case "list":
        return <NoteUserList onDetail={openDetailUserNote} />;
      case "create":
        return (
          <NoteForm
            noteId={selectedNote}
            onCancel={() => setType(selectedNote ? "detail" : "list")}
          />
        );
      case "detail":
        return (
          <NoteDetail
            noteUserId={selectedUserNote}
            onShareClick={openShareNoteDialog}
            onEditClick={openEditNoteDialog}
            onHistoryClick={openHistoryNote}
          />
        );
      case "share":
        return <NoteShare noteId={selectedNote} onCancel={() => setType("detail")} />;

      case "history":
        return <NoteHistory noteId={selectedNote} />;
      default:
        return null;
    }
  };

  // Render dialog title based on the current type
  const renderTitle = () => {
    switch (type) {
      case "create":
        return selectedNote ? "Chỉnh sửa ghi chú" : "Tạo ghi chú";
      case "detail":
        return `Ghi chú của ${selectedNoteUserName}`;
      case "share":
        return "Chia sẻ ghi chú";
      case "history":
        return "Lịch sử chỉnh sửa ghi chú";
      default:
        return "Danh sách sinh viên";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      className="min-w-60"
    >
      <DialogTitle alignSelf="center">
        {renderTitle()}
        {type === "list" && (
          <IconButton
            className="!absolute !right-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
            size="small"
            onClick={handleCreate}
          >
            <AddIcon />
          </IconButton>
        )}
        {type === "detail" && (
          <IconButton
            className="!absolute !left-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
            size="small"
            onClick={() => setType("list")}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        )}
        {type === "history" && (
          <IconButton
            className="!absolute !left-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
            size="small"
            onClick={() => setType("detail")}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        )}
        {/* </Stack> */}
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
