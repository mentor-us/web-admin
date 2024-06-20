/* eslint-disable no-unused-vars */
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { useGetUserNotes } from "hooks/notes/queries";

function NoteUserList({ onDetail, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e?.target?.value);
  };
  const { data: notes } = useGetUserNotes({ page: 0, pageSize: 10, query: searchQuery });

  return (
    <Stack className="w-full rounded-lg" direction="column" spacing={1}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          className="w-full"
          placeholder="Tìm kiếm bằng tên hoặc email"
          inputProps={{ "aria-label": "Tìm kiếm bằng tên hoặc email" }}
          onChange={handleSearchChange}
        />
      </Paper>
      <Stack sx={{ minHeight: "300px" }}>
        {notes?.data?.map((note) => (
          <Stack
            key={note?.id}
            className="w-full p-2 hover:bg-gray-100 cursor-pointer"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2} onClick={() => onDetail(note.id)}>
              <Avatar src={note?.imageUrl} />
              <Stack direction="column">
                <Typography>{note?.name}</Typography>
                <Typography variant="caption">
                  Có {note?.totalNotes} ghi chú về người này
                </Typography>
              </Stack>
            </Stack>
            {/* <Stack direction="row" spacing={1}>
              <IconButton onClick={() => onDetail(note.user)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(note.user.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack> */}
          </Stack>
        ))}
      </Stack>
      {!notes?.data?.length && (
        <Typography className="w-full text-center">Không có ghi chú nào</Typography>
      )}
    </Stack>
  );
}

NoteUserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NoteUserList;
