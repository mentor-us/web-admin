/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Avatar, DialogContent, DialogTitle, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { getMyInfo } from "features/myInfo/slice";
import PropTypes from "prop-types";

import useMyInfo from "hooks/useMyInfo";

import UpdateProfileDialog from "./UpdateProfileDialog";

const AVATAR_SIZE = 90;
const WALLPAPER_HEIGHT = 200;
const WALLPAPER_WIDTH = "100%";
function ProfileDialog(props) {
  const { open, onClose, user } = props;
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMyInfo());
  // }, []);
  const myInfo = useMyInfo();

  const isEditable = myInfo.id === user.id;

  const handleUpdateProfileOpen = () => {
    setOpenUpdateProfile(true);
  };
  const handleUpdateProfileClose = () => {
    setOpenUpdateProfile(false);
  };
  const userDate = new Date(Date.parse(user.birthDate)).toLocaleDateString("vi-VN");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle alignSelf="flex-start">Thông tin tài khoản</DialogTitle>
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
              image="https://wallpapers.com/images/featured/blue-dgmxybg4kb7eab7x.jpg"
            />
          </div>
          <div className="grid justify-items-center absolute w-full">
            <Avatar
              sx={{
                height: AVATAR_SIZE,
                width: AVATAR_SIZE,
                top: WALLPAPER_HEIGHT - AVATAR_SIZE / 2,
                border: "2px solid white"
              }}
              src={
                user
                  ? user.imageUrl
                  : "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-10_1562-745.jpg"
              }
            />
            {isEditable && (
              <Avatar
                sx={{
                  height: 30,
                  width: 30,
                  top: WALLPAPER_HEIGHT - AVATAR_SIZE / 2 - 30,
                  left: AVATAR_SIZE / 2 - 15
                }}
              >
                <CameraAltOutlinedIcon />
              </Avatar>
            )}
          </div>

          <CardContent>
            {/* <Button sx={{ marginBottom: 5 }} variant="contained" fullWidth>
              Nhắn tin
            </Button> */}

            <div className="flex justify-between">
              <Typography variant="h4" component="div">
                Thông tin
              </Typography>
              {isEditable && (
                <Typography
                  variant="h7"
                  component="div"
                  color="skyblue"
                  fontStyle="italic"
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
                    <Typography variant="h7" color={user.name ? "black" : "grey"}>
                      {user.name ? user.name : "Chưa cập nhật"}
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
                    <Typography variant="h7" color={user.email ? "black" : "grey"}>
                      {user.email ? user.email : "Chưa cập nhật"}
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
                      <Typography variant="h7" color={user.additionalEmails[0] ? "black" : "grey"}>
                        {user.additionalEmails[0] ? user.emadditionalEmails[0] : "Chưa cập nhật"}
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
                    <Typography variant="h7" color={user.birthDate ? "black" : "grey"}>
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
                    <Typography variant="h7" color={user.phone ? "black" : "grey"}>
                      {user.phone ? user.phone : "Chưa cập nhật"}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            {isEditable && (
              <div className="flex justify-between">
                <Typography variant="h4" component="div">
                  Liên kết email
                </Typography>
                <Typography variant="h7" component="div" color="skyblue" fontStyle="italic">
                  Cập nhật
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
ProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ProfileDialog;
