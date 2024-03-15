/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Zoom
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

import { USER_ROLE } from "utils/constants";

import ChannelIcon from "../ChannelIcon";

export const styleActiveChannel = (selected) => {
  return {
    "&.Mui-selected": {
      backgroundColor: selected ? colors.gradients.light.main : "inherit" // Using theme color here
    },
    "&:hover": {
      backgroundColor: `${colors.gradients.light.main} !important` // Using theme color here
    },
    "&:focus": {
      backgroundColor: `${colors.gradients.light.main} !important`, // Using theme color here
      outline: "none" // Remove default focus outline if desired
    }
  };
};

function ChannelItem({ channel, role, selectedChannelId, onChannelSelected, disableContextMenu }) {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const onEditChannelClick = () => {};

  const onDeleteChannelClick = (id) => {
    confirm({
      title: "Xác nhận xóa kênh",
      description: (
        <>
          <Typography>{`Thực hiện xóa kênh ${channel.name}.`}</Typography>
          <Typography color={colors.error.focus}>Không thể hoàn tác sau khi xác nhận.</Typography>
        </>
      ),
      confirmationText: "Xóa",
      cancellationText: "Hủy",
      buttonOrder: ["confirm", "cancel"],
      cancellationButtonProps: {
        autoFocus: true,
        variant: "contained",
        sx: {
          "&:hover": {
            opacity: 0.9
          },
          color: colors.light.main
        }
      },
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
        sx: {
          "&:hover": {
            opacity: 0.9,
            backgroundColor: colors.error.focus
          },
          backgroundColor: colors.error.focus,
          color: colors.light.main
        }
      }
    })
      .then(() => {
        // Delete channel api call
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  if (!channel) {
    return null;
  }

  return (
    <>
      <Tooltip title={channel.name} arrow placement="right" TransitionComponent={Zoom}>
        <ListItemButton
          sx={{ ...styleActiveChannel(selectedChannelId === channel?.id), pl: 4 }}
          onClick={(e) => {
            navigate(`channel/${channel?.id}`);
            onChannelSelected(channel?.id);
          }}
          onContextMenu={disableContextMenu ? null : role === USER_ROLE.MENTOR && handleContextMenu}
          selected={selectedChannelId === channel?.id}
        >
          <ListItemIcon>
            <ChannelIcon channel={channel} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className="text-base line-clamp-1"
            primary={channel.name}
          />
        </ListItemButton>
      </Tooltip>
      {!disableContextMenu && (
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        >
          <MenuItem
            disabled
            onClick={() => {
              onEditChannelClick();
              handleClose();
            }}
          >
            <ListItemIcon>
              <EditIcon
                fontSize="small"
                sx={{
                  color: colors.info.focus
                }}
              />
            </ListItemIcon>
            <Typography variant="inherit" color={colors.info.focus}>
              Chỉnh sửa
            </Typography>
          </MenuItem>
          <MenuItem
            disabled
            onClick={() => {
              onDeleteChannelClick(channel?.id);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon
                fontSize="small"
                sx={{
                  color: colors.error.focus
                }}
              />
            </ListItemIcon>
            <Typography variant="inherit" color={colors.error.focus}>
              Xóa
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  selectedChannelId: PropTypes.string,
  onChannelSelected: PropTypes.func.isRequired,
  disableContextMenu: PropTypes.bool
};

ChannelItem.defaultProps = {
  selectedChannelId: "",
  disableContextMenu: false
};

export default ChannelItem;
