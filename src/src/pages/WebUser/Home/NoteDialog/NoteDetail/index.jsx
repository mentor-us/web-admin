/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DeleteOutline, Edit, MoreVert, ShareOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { confirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import { formatDate, getImageUrlWithKey } from "utils";

import { useDeleteNoteMutation } from "hooks/notes/mutation";
import { useGetUserNoteByUserId } from "hooks/notes/queries";
import { useGetUserNotesByUserIdKey } from "hooks/profile/key";
import useMyInfo from "hooks/useMyInfo";

import "react-vertical-timeline-component/style.min.css";

function NoteDetail({ noteUserId, onShareClick, onEditClick, onHistoryClick }) {
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const { data: notes, isLoading, isSuccess, isError } = useGetUserNoteByUserId(noteUserId);
  const { mutateAsync: deleteNoteMutateAsync } = useDeleteNoteMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleOpenMenu = (event, noteId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedNoteId(noteId);
  };

  const handleCloseMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setSelectedNoteId(null);
  };

  const handleDeleteNote = (event, id) => {
    event.stopPropagation();
    confirm({
      title: "Confirm Delete",
      description: "Are you sure you want to delete this note?",
      confirmationText: "Delete",
      cancellationText: "Cancel"
    }).then(() => {
      toast.promise(
        deleteNoteMutateAsync(id).then(() => {
          queryClient.refetchQueries({
            queryKey: useGetUserNotesByUserIdKey(noteUserId)
          });
        }),
        {
          loading: "Deleting note...",
          success: "Note deleted successfully",
          error: "Failed to delete note"
        }
      );
      handleCloseMenu(event);
    });
  };

  const handleEditNote = (event, id) => {
    event.stopPropagation();
    onEditClick(id);
    handleCloseMenu(event);
  };

  const handleShareNote = (event, id) => {
    event.stopPropagation();
    onShareClick(id);
    handleCloseMenu(event);
  };

  const open = Boolean(anchorEl);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="20em">
        <CircularProgress color="info" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="20em">
        <Typography color="error">Error loading data</Typography>
      </Box>
    );
  }

  if (!isSuccess || !notes?.data?.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="20em">
        <Typography>No notes available</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ maxHeight: 550, overflowY: "auto", p: 2 }}>
      {notes?.data.map((note) => (
        <Fade in key={note.id}>
          <Paper
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            borderRadius={2}
            className="cursor-pointer"
            sx={{
              position: "relative",
              p: 3,
              mb: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 }
            }}
            elevation={2}
            onClick={() => onHistoryClick(note.id)}
          >
            <Box display="flex" flexGrow={1} alignItems="center" gap={2}>
              <Tooltip title={note.creator.name}>
                <Avatar
                  alt={note.creator.name}
                  src={getImageUrlWithKey(note.creator.imageUrl)}
                  sx={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </Tooltip>
              <Box>
                <div className="font-bold text-base">{note?.title}</div>
                <div className="text-sm">Ngày tạo: {formatDate(note.updatedDate)}</div>
              </Box>
            </Box>
            <Typography
              variant="body2"
              className="text-zinc-600"
              sx={{ flexGrow: 1, mx: 2 }}
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <Box display="flex" alignItems="center" className="absolute top-2 right-2">
              <IconButton onClick={(event) => handleOpenMenu(event, note.id)} aria-label="Settings">
                <MoreVert />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open && selectedNoteId === note.id}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <MenuItem
                  onClick={(event) => handleEditNote(event, note.id)}
                  sx={{
                    color: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#e3f2fd"
                    }
                  }}
                >
                  <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem
                  onClick={(event) => handleShareNote(event, note.id)}
                  sx={{
                    color: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#e3f2fd"
                    }
                  }}
                >
                  <ShareOutlined fontSize="small" sx={{ mr: 1 }} /> Share
                </MenuItem>
                <MenuItem
                  onClick={(event) => handleDeleteNote(event, note.id)}
                  sx={{
                    color: "#f44336",
                    "&:hover": {
                      backgroundColor: "#ffebee"
                    }
                  }}
                >
                  <DeleteOutline fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
              </Menu>
            </Box>
          </Paper>
        </Fade>
      ))}
    </Stack>
  );
}

NoteDetail.propTypes = {
  noteUserId: PropTypes.string.isRequired,
  onShareClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onHistoryClick: PropTypes.func.isRequired
};

export default NoteDetail;
