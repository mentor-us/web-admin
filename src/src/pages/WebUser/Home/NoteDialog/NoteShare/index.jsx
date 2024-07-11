/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, PublicOutlined, VisibilityOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

import { useShareNoteMutation } from "hooks/notes/mutation";
import { useGetNoteById } from "hooks/notes/queries";
import { useGetUserNotesKey } from "hooks/profile/key";
import { useGetAllAccount } from "hooks/profile/queries";
import { NotePermission, NoteShareObject, NoteShareType } from "utils/constants";

function NoteShare({ noteId, onCancel }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState([]);
  const [generalPermission, setGeneralPermission] = useState(NoteShareType[0]);
  const [inputValue, setInputValue] = useState(""); // Controlled state for inputValue
  const { mutateAsync: shareNote } = useShareNoteMutation();
  const { data: note, isLoading: isLoadingNote } = useGetNoteById(noteId);
  const queryClient = useQueryClient();
  const { data: members, isLoading: isLoadingMembers } = useGetAllAccount(searchQuery);

  const handleSearchChange = (event) => {
    setSearchQuery(event?.target?.value);
  };

  const formatedMembers = members?.filter((member) => member.id !== note?.owner?.id);

  const onChange = (event, newValue) => {
    const updatedValue = newValue.map((member) => ({
      ...member,
      accessType: member.accessType || NotePermission.find((item) => item.key === "VIEW")
    }));
    setValue(updatedValue);
  };

  const handlePermissionChange = (userId, permission) => {
    const updatedValue = value.map((member) => {
      if (member.id === userId) {
        return {
          ...member,
          accessType: NotePermission.find((item) => item.label === permission)
        };
      }
      return member;
    });
    setValue(updatedValue.filter((member) => member.accessType.key !== "DELETE"));
  };

  const handleGeneralPermissionChange = (event) => {
    setGeneralPermission(NoteShareType.find((item) => item.label === event.target.value));
  };

  const renderIcon = () => {
    switch (generalPermission.label) {
      case NoteShareObject.PUBLIC:
        return <PublicOutlined />;
      case NoteShareObject.MENTOR_VIEW:
        return <VisibilityOutlined />;
      case NoteShareObject.MENTOR_EDIT:
        return <Edit />;
      case NoteShareObject.PRIVATE:
        return <LockIcon />;
      default:
        return <LockIcon />;
    }
  };

  const renderTextDetail = () => {
    switch (generalPermission.label) {
      case NoteShareObject.PUBLIC:
        return "Bất kỳ ai có kết nối Internet và có đường liên kết này đều có thể chỉnh sửa";
      case NoteShareObject.MENTOR_VIEW:
        return "Chỉ những người mentor có thể xem";
      case NoteShareObject.MENTOR_EDIT:
        return "Chỉ những người mentor có thể chỉnh sửa";
      case NoteShareObject.PRIVATE:
        return "Chỉ những người có quyền mới có thể xem hoặc chỉnh sửa";
      default:
        return "Chỉ những người có quyền mới có thể xem hoặc chỉnh sửa";
    }
  };

  const prepareData = () => {
    const formattedUsers = value.map((member) => ({
      userId: member.id,
      accessType: member.accessType.key
    }));
    return {
      shareType: generalPermission.value,
      id: noteId,
      users: formattedUsers
    };
  };

  const handleSubmit = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        shareNote(prepareData(), {
          onSuccess: () => {
            queryClient.refetchQueries(useGetUserNotesKey(noteId));
            resolve();
          },
          onError: (err) => {
            console.error(err);
            reject(err);
          }
        });
      }),
      {
        loading: `Đang chia sẻ ghi chú...`,
        success: `Chia sẻ ghi chú thành công`,
        error: `Chia sẻ ghi chú thất bại. Vui lòng thử lại sau!`
      }
    );
  };

  useEffect(() => {
    if (!isLoadingNote && note) {
      setValue(
        note.userAccesses.map((user) => ({
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          imageUrl: user.user.imageUrl,
          accessType: NotePermission.find((item) => item.key === user.notePermission)
        }))
      );
      setGeneralPermission(NoteShareType.find((item) => item.value === note.shareType));
    }
  }, [note, isLoadingNote]);

  return (
    <Stack className="w-full rounded-lg" direction="column" spacing={1} sx={{ minHeight: "50px" }}>
      {isLoadingNote ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="20em" // Adjust this height based on your container
        >
          <CircularProgress color="info" />
        </Box>
      ) : (
        <>
          {formatedMembers && (
            <Autocomplete
              multiple
              open
              options={formatedMembers}
              getOptionLabel={(member) => (member?.name ? `${member.name} (${member.email})` : "")}
              filterSelectedOptions
              value={value}
              onChange={onChange}
              inputValue={inputValue} // Use controlled inputValue
              className="pt-2"
              onInputChange={(event, newValue) => setInputValue(newValue)} // Update inputValue state
              noOptionsText="Không có thành viên nào"
              onClose={() => setInputValue("")} // Clear inputValue on close
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm người dùng"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoadingMembers ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              renderOption={(props, member) => (
                <ListItem {...props}>
                  <ListItemAvatar>
                    <Avatar src={member.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.875rem"
                      }
                    }}
                    primary={member.name}
                  />
                </ListItem>
              )}
              // eslint-disable-next-line no-shadow
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <div style={{ display: "none" }} />)
              }
              // eslint-disable-next-line no-shadow
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          )}
          <Stack>
            <Typography className="font-black text-black" fontSize="1rem">
              Những người có quyền truy cập
            </Typography>
          </Stack>
          <Stack spacing={1} maxHeight={200} className="overflow-auto mt-2">
            {value.map((member) => (
              <Stack
                key={member.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                className="w-full hover:bg-slate-200 pt-2 pb-2 pl-1 pr-1"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar src={member.imageUrl} />
                  <Typography className="pl-3" fontSize="0.875rem">
                    {member.name}
                  </Typography>
                </Stack>
                <Select
                  className="hover:cursor-pointer"
                  variant="outlined"
                  id="demo-simple-select"
                  sx={{
                    padding: "0.5rem",
                    width: "8em!important",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    }
                  }}
                  value={member.accessType.label}
                  onChange={(e) => handlePermissionChange(member.id, e.target.value)}
                  IconComponent={ArrowDropDownIcon} // Use custom arrow icon
                  input={
                    <OutlinedInput
                      className="hover:bg-slate-300"
                      sx={{
                        backgroundColor: "yellow",
                        "& div": {
                          backgroundColor: "red"
                        }
                      }}
                      endAdornment={<ArrowDropDownIcon />}
                    />
                  }
                >
                  {NotePermission.map((item) => (
                    <MenuItem key={item.key} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            ))}
          </Stack>
          <Stack>
            <Typography className="font-black text-black" fontSize="1rem">
              Quyền truy cập chung
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-start"
              spacing={1}
              className="hover:bg-slate-200 p-1"
            >
              <Stack className="bg-zinc-200 p-3 rounded-full">{renderIcon()}</Stack>
              <Stack>
                <Select
                  className="hover:cursor-pointer"
                  variant="outlined"
                  sx={{
                    padding: "0.375rem 0rem",
                    width: "fit-content",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    }
                  }}
                  value={generalPermission.label}
                  onChange={handleGeneralPermissionChange}
                  input={
                    <OutlinedInput
                      className="hover:bg-slate-300"
                      sx={{
                        backgroundColor: "yellow",
                        "& div": {
                          backgroundColor: "red"
                        }
                      }}
                      endAdornment={<ArrowDropDownIcon style={{ marginRight: "12px" }} />}
                    />
                  }
                >
                  {NoteShareType.map((item) => (
                    <MenuItem key={item.value} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-gray-500 text-xs pl-3 pb-1">{renderTextDetail()}</p>
              </Stack>
            </Stack>
          </Stack>
          <DialogActions sx={{ padding: "4px", paddingTop: " 24px" }}>
            <Button onClick={onCancel}>Hủy</Button>
            <Button onClick={handleSubmit}>Lưu</Button>
          </DialogActions>
        </>
      )}
    </Stack>
  );
}

NoteShare.propTypes = {
  noteId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NoteShare;
