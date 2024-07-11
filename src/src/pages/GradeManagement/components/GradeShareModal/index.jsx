import React, { forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, PublicOutlined, VisibilityOutlined } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  Typography
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { useShareGradeMutation } from "hooks/grades/mutation";
import { NoteShareObject, NoteShareType } from "utils/constants";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line no-unused-vars
function GradeShareModal({ user, onCancel }) {
  const { mutateAsync: shareNote } = useShareGradeMutation();
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const prepareData = () => {
    return [];
    // const formattedUsers = value.map((member) => ({
    //   userId: member.id,
    //   accessType: member.accessType.key
    // }));
    // return {
    //   shareType: generalPermission.value,
    //   id: noteId,
    //   users: formattedUsers
    // };
  };
  const [generalPermission, setGeneralPermission] = useState(NoteShareType[0]);
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
  const handleSubmit = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        shareNote(prepareData(), {
          onSuccess: () => {
            // queryClient.refetchQueries(useGetUserNotesKey(noteId));
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
  const handleGeneralPermissionChange = (event) => {
    setGeneralPermission(NoteShareType.find((item) => item.label === event.target.value));
  };
  useEffect(() => {}, []);
  return (
    <Dialog
      open
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      className="min-w-60"
    >
      <DialogTitle alignSelf="center">Chia sẻ ghi chú</DialogTitle>
      <DialogContent>
        <Stack
          className="w-full rounded-lg"
          direction="column"
          spacing={1}
          sx={{ minHeight: "50px" }}
        >
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
                <p className="text-gray-500 text-xs pl-3 pb-1 ">{renderTextDetail()}</p>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

GradeShareModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default GradeShareModal;
