import React, { forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PublicOutlined, VisibilityOutlined } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { useShareGradeMutation } from "hooks/grades/mutation";
import { useGetShareGradeInfo } from "hooks/grades/queries";
import { useGetAllUsers } from "hooks/users/queries";
import { GradePermission, GradeShareObject, GradeShareType } from "utils/constants";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const exampleListUser = [
  {
    accessType: {
      label: "Xem",
      key: "VIEW"
    },
    email: "20127665@student.hcmus.edu.vn",
    id: "b7a6a7de-ffbf-438f-a784-129c6cbf0fb2",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocJKO74-RTPo1PyvdwZtEJzfxdEVWpx9Tj_ZUoC7ha9zJ_DN-8Pw=s96-c",
    name: "20127665 - Dương Quang Vinh"
  },
  {
    accessType: {
      label: "Xem",
      key: "VIEW"
    },
    email: "20127665@student.hcmus.edu.vn",
    id: "b7a6a7de-ffbf-438f-a784-129c6cbf0fb3",
    imageUrl: null,
    name: "20127638 - Vo Minh Thong"
  }
];
// eslint-disable-next-line no-unused-vars
function GradeShareModal({ user, onCancel }) {
  const { mutateAsync: shareGrade } = useShareGradeMutation();
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const [listUser, setListUser] = useState(exampleListUser);
  const { data: accounts } = useGetAllUsers({});
  const { data: shareGradeInfo, isFetching: isLoadingShareInfo } = useGetShareGradeInfo(user);
  // eslint-disable-next-line no-unused-vars
  const formatedMembers = accounts?.filter(
    (member) => member.id !== user?.id && !listUser.some((userTemp) => userTemp.id === member.id)
  );
  const [inputValue, setInputValue] = useState(""); // Controlled state for inputValue
  const [disableSubmit, setDisableSubmit] = useState(false); // Controlled state for inputValue

  const [generalPermission, setGeneralPermission] = useState(GradeShareType[0]);
  const renderIcon = () => {
    switch (generalPermission.label) {
      case GradeShareObject.PUBLIC:
        return <PublicOutlined />;
      case GradeShareObject.MENTOR:
        return <VisibilityOutlined />;
      case GradeShareObject.PRIVATE:
        return <LockIcon />;
      default:
        return <LockIcon />;
    }
  };
  const renderTextDetail = () => {
    switch (generalPermission.label) {
      case GradeShareObject.PUBLIC:
        return "Bất kì ai cũng có thể xem";
      case GradeShareObject.MENTOR:
        return "Chỉ những người mentor có thể xem";
      case GradeShareObject.PRIVATE:
        return "Chỉ những người có quyền mới có thể xem";
      default:
        return "Chỉ những người có quyền mới có thể xem";
    }
  };
  const prepareData = () => {
    const formattedUsers = listUser.map((member) => member.id);
    return {
      shareType: generalPermission.value,
      userId: user?.id ?? null,
      userAccessIds: formattedUsers
    };
  };
  const handleSubmit = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setDisableSubmit(true);
        shareGrade(prepareData(), {
          onSuccess: () => {
            queryClient.refetchQueries(["share-grade-info"]);
            setDisableSubmit(false);
            resolve();
          },
          onError: (err) => {
            queryClient.refetchQueries(["share-grade-info"]);
            setDisableSubmit(false);
            console.error(err);
            reject(err);
          }
        });
      }),
      {
        loading: `Đang chia sẻ bảng điểm...`,
        success: `Chia sẻ bảng điểm thành công`,
        error: `Chia sẻ bảng điểm thất bại. Vui lòng thử lại sau!`
      }
    );
  };
  const handleGeneralPermissionChange = (event) => {
    setGeneralPermission(GradeShareType.find((item) => item.label === event.target.value));
  };
  const handlePermissionChange = (userId, permission) => {
    const updatedValue = listUser.map((member) => {
      if (member.id === userId) {
        return {
          ...member,
          accessType: GradePermission.find((item) => item.label === permission)
        };
      }
      return member;
    });
    setListUser(updatedValue.filter((member) => member.accessType.key !== "DELETE"));
  };
  const onChange = (event, newMember) => {
    const updatedValue = [
      {
        accessType: newMember.accessType || GradePermission.find((item) => item.key === "VIEW"),
        ...newMember
      },
      ...listUser
    ];
    setListUser(updatedValue);
    setInputValue("");
  };
  useEffect(() => {
    if (!isLoadingShareInfo && shareGradeInfo) {
      setListUser(
        shareGradeInfo?.userAccesses.map((userAcc) => ({
          id: userAcc.id,
          name: userAcc.name,
          email: userAcc.email,
          imageUrl: userAcc.imageUrl,
          accessType: GradePermission[0]
        })) ?? []
      );
      setGeneralPermission(
        GradeShareType.find((item) => item.value === shareGradeInfo?.shareType) ?? GradeShareType[2]
      );
    }
  }, [shareGradeInfo, isLoadingShareInfo]);
  return (
    <Dialog
      open
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      className="min-w-60"
    >
      <DialogTitle alignSelf="center">Chia sẻ bảng điểm</DialogTitle>
      <DialogContent>
        <Stack
          className="w-full rounded-lg"
          direction="column"
          spacing={1}
          sx={{ minHeight: "50px" }}
        >
          {isLoadingShareInfo ? (
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
              <Stack>
                {formatedMembers && (
                  <Autocomplete
                    options={formatedMembers}
                    getOptionLabel={(member) =>
                      member?.name ? `${member.name} (${member.email})` : ""
                    }
                    value={null}
                    inputValue={inputValue}
                    onInputChange={(event, newValue) => setInputValue(newValue)} // Update inputValue state
                    filterSelectedOptions
                    onChange={onChange}
                    className="mt-2"
                    noOptionsText="Không có thành viên nào"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Tìm kiếm và chọn người dùng"
                        placeholder="Tìm kiếm và chọn người dùng"
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
                    // // eslint-disable-next-line no-shadow
                    // renderTags={(value, getTagProps) =>
                    //   value.map((option, index) => <div style={{ display: "none" }} />)
                    // }
                    // eslint-disable-next-line no-shadow
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                )}
              </Stack>
              <Stack>
                <Stack>
                  <Typography className="font-black text-black" fontSize="1rem">
                    Những người có quyền truy cập
                  </Typography>
                </Stack>
                <Stack spacing={1} maxHeight={184} className="overflow-auto mt-2">
                  {(!listUser || !listUser?.length) && (
                    <Typography
                      className="font-black text-gray"
                      textAlign="center"
                      fontSize="0.875rem"
                    >
                      Không có người có quyền truy cập
                    </Typography>
                  )}
                  {listUser.map((member) => (
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
                        {GradePermission.map((item) => (
                          <MenuItem key={item.key} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  ))}
                </Stack>
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
                      {GradeShareType.map((item) => (
                        <MenuItem key={item.value} value={item.label}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <p className="text-gray-500 text-xs pl-3 pb-1 ">{renderTextDetail()}</p>
                  </Stack>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button disabled={disableSubmit} onClick={handleSubmit}>
          Lưu
        </Button>
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
