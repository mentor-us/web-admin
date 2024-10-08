/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AspectRatio } from "@mui/icons-material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Avatar, Button, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { logout } from "features/myInfo/slice";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import wallpaper from "assets/images/default-wallpaper.jpg";

import ImageIconButton from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/ImageIconButton";
import { useCreateChannelMutation } from "hooks/channels/mutation";
import { useUpdateAvatarMutation } from "hooks/profile/mutation";
import useMyInfo from "hooks/useMyInfo";
import {
  ACTION_IMAGE,
  AVATAR_SIZE,
  Color,
  ROUTE_URL,
  WALLPAPER_HEIGHT,
  WALLPAPER_WIDTH
} from "utils/constants";

import GradeBoard from "../GradeBoard";

import UpdateProfileDialog from "./UpdateProfileDialog";

function ProfileDialog(props) {
  const { open, onClose, user, isFromGroupMember } = props;
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const { mutateAsync: createChannel } = useCreateChannelMutation();
  const dispatch = useDispatch();
  const { groupId } = useParams();

  const { mutateAsync: updateAvatarMutation, isPending } = useUpdateAvatarMutation();

  const myInfo = useMyInfo();
  const navigate = useNavigate();

  const imageIconButtonRef = useRef(null);

  const isEditable = myInfo.id === user.id;

  const handleUpdateProfileOpen = () => {
    setOpenUpdateProfile(true);
  };
  const handleUpdateProfileClose = () => {
    setOpenUpdateProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate(ROUTE_URL.SIGN_IN, { replace: true });
  };

  const handleUpdateAvatar = () => {
    if (imageIconButtonRef.current) {
      imageIconButtonRef.current.click();
    }
  };

  const openChat = async () => {
    const data = {
      channelName: user?.name ?? "Nhóm riêng tư",
      description: "",
      groupId,
      creatorId: myInfo.id,
      type: "PRIVATE_MESSAGE",
      userIds: [myInfo.id, user.id]
    };
    const res = await createChannel(data);
    if (res) {
      navigate(`${isFromGroupMember ? "" : "../"}channel/${res.id}`);
      onClose();
    }
  };

  const userDate = new Date(Date.parse(user.birthDate)).toLocaleDateString("vi-VN");
  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const imageUrl = URL.createObjectURL(event.target.files[0]);
  //     toast.promise(
  //       new Promise((resolve, reject) => {
  //         updateAvatarMutation({ imageUrl })
  //           .then(() => {
  //             resolve();
  //           })
  //           .catch(reject);
  //       }),
  //       {
  //         loading: "Đang cập nhật...",
  //         success: "Cập nhật Avatar thành công",
  //         error: "Có lỗi xảy ra, vui lòng thử lại"
  //       }
  //     );
  //   }
  // };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="w-full !py-2" alignSelf="flex-start">
        <Stack className="w-full" direction="row" justifyContent="space-between">
          <span className="!p-2">Thông tin tài khoản</span>
          {isEditable && (
            <Button className="!p-2 !py-0 !text-red-500 hover:opacity-70" onClick={handleLogout}>
              Đăng xuất
            </Button>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 0, margin: 0 }}>
        <Card sx={{ padding: 0, margin: 0 }}>
          <div>
            <CardMedia
              sx={{
                height: WALLPAPER_HEIGHT,
                width: WALLPAPER_WIDTH,
                padding: 0,
                margin: 0,
                borderRadius: 0,
                marginBottom: 7
              }}
              image={user.wallpaper ? getImageUrlWithKey(user.wallpaper) : wallpaper}
            />
          </div>
          <div className="grid justify-items-center absolute w-full">
            <div className="hidden">
              <ImageIconButton
                ref={imageIconButtonRef}
                channelId={groupId}
                type={ACTION_IMAGE.UPDATE_AVATAR_USER}
              />
            </div>
            <Avatar
              sizes={100}
              sx={{
                height: AVATAR_SIZE,
                width: AVATAR_SIZE,
                top: WALLPAPER_HEIGHT - AVATAR_SIZE / 2,
                border: "2px solid white"
              }}
              src={getImageUrlWithKey(
                user?.imageUrl ??
                  "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-10_1562-745.jpg"
              )}
              slotProps={{
                img: {
                  referrerPolicy: "no-referrer"
                }
              }}
            />
            {isEditable && (
              <Avatar
                sx={{
                  height: 30,
                  width: 30,
                  top: WALLPAPER_HEIGHT - AVATAR_SIZE / 2 - 30,
                  left: AVATAR_SIZE / 2 - 15,
                  "&:hover": {
                    background: "#b0b5b4",
                    cursor: "pointer"
                  }
                }}
                onClick={handleUpdateAvatar}
              >
                <CameraAltOutlinedIcon />
              </Avatar>
            )}
          </div>

          <CardContent>
            <div className="flex justify-between items-end">
              <Typography variant="h5" component="div">
                Thông tin
              </Typography>
              {isEditable && (
                <Typography
                  variant="h7"
                  component="div"
                  color={Color.primary}
                  onClick={handleUpdateProfileOpen}
                  className="cursor-pointer hover:underline"
                >
                  Cập nhật
                </Typography>
              )}
              {openUpdateProfile && (
                <UpdateProfileDialog
                  open={openUpdateProfile}
                  onClose={handleUpdateProfileClose}
                  info={myInfo}
                />
              )}
            </div>
            <List
              className="flex flex-col space-y-2"
              sx={{ width: "100%", bgcolor: "background.paper", marginY: 1 }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonOutlinedIcon color="black" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="black">
                      Họ và tên
                    </Typography>
                  }
                  secondary={
                    <Typography className="!text-sm" color={user.name ? "black" : "grey"}>
                      {user.name ?? "Chưa cập nhật"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MailOutlinedIcon color="black" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="black">
                      Email
                    </Typography>
                  }
                  secondary={
                    <Typography className="!text-sm" color={user.email ? "black" : "grey"}>
                      {user.email ?? "Chưa cập nhật"}
                    </Typography>
                  }
                />
              </ListItem>
              {!isEditable && (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MailOutlinedIcon color="black" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="black">
                        Email cá nhân
                      </Typography>
                    }
                    secondary={
                      <Typography
                        className="!text-sm"
                        color={user.additionalEmails[0] ? "black" : "grey"}
                      >
                        {user.personalEmail ?? "Chưa cập nhật"}
                      </Typography>
                    }
                  />
                </ListItem>
              )}

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthOutlinedIcon color="black" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="black">
                      Ngày sinh
                    </Typography>
                  }
                  secondary={
                    <Typography className="!text-sm" color={user.birthDate ? "black" : "grey"}>
                      {user.birthDate ? userDate : "Chưa cập nhật"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneOutlinedIcon color="black" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="black">
                      Số điện thoại
                    </Typography>
                  }
                  secondary={
                    <Typography className="!text-sm" color={user.phone ? "black" : "grey"}>
                      {user?.phone !== null && user?.phone !== "" ? user.phone : "Chưa cập nhật"}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <GradeBoard isEditable={isEditable} user={user} />
            {isEditable ? (
              <div className="flex justify-between items-end mt-4">
                <Typography variant="h5" component="div">
                  Email đã liên kết
                </Typography>
              </div>
            ) : (
              <Button
                sx={{
                  float: "right",
                  borderRadius: "20px",
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: 5,
                  backgroundColor: "#d0def6",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#abc7f7"
                  }
                }}
                variant="text"
                onClick={openChat}
              >
                Nhắn tin
              </Button>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

ProfileDialog.defaultProps = {
  isFromGroupMember: false
};

ProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isFromGroupMember: PropTypes.bool
};
export default ProfileDialog;
