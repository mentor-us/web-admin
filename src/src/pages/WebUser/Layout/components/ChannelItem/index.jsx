/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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
import { useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "material-ui-confirm";
import PropTypes from "prop-types";

import { makeTxtElipsis } from "utils";
import colors from "assets/theme/base/colors";

import { useDeleteChannelMutation } from "hooks/channels/mutation";
import { GetWorkspaceQueryKey } from "hooks/groups/keys";
import { useGetWorkSpace } from "hooks/groups/queries";
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
  const { groupId } = useParams();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { data: defaultChannelId } = useGetWorkSpace(groupId, (detail) => detail.defaultChannelId);
  const { mutateAsync: deleteChannelMutateAsync } = useDeleteChannelMutation();
  const queryClient = useQueryClient();
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    if (role !== USER_ROLE.MENTOR) {
      return;
    }

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
      description: <span className="text-base">Bạn có chắc chăn muốn xóa kênh này không?</span>,
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
    }).then(() => {
      toast.promise(deleteChannelMutateAsync(id), {
        loading: "Đang xoá kênh...",
        success: () => {
          navigate(`channel/${defaultChannelId}`);
          queryClient.invalidateQueries({
            queryKey: GetWorkspaceQueryKey(groupId)
          });
          return (
            <span className="text-base">
              Xoá kênh <b>{makeTxtElipsis(channel.name)}</b> thành công
            </span>
          );
        },
        error: () => {
          return (
            <span className="text-base">
              Xoá kênh <b>{makeTxtElipsis(channel.name)}</b> thất bại
            </span>
          );
        }
      });
    });
  };

  if (!channel) {
    return null;
  }

  return (
    <>
      <Tooltip title={channel.name} arrow placement="right" TransitionComponent={Zoom}>
        <ListItemButton
          sx={{ ...styleActiveChannel(selectedChannelId === channel?.id), pl: 4 }}
          onClick={() => {
            navigate(`channel/${channel?.id}`);
            onChannelSelected(channel?.id);
          }}
          onContextMenu={disableContextMenu ? null : handleContextMenu}
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
