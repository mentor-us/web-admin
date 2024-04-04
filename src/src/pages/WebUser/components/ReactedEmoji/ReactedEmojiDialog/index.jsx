/* eslint-disable react/forbid-prop-types */
import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Zoom
} from "@mui/material";
import PropTypes from "prop-types";

import { CloseFillIcon } from "assets/svgs";

import { EMOJI_ICONS } from "utils/constants";

function ReactedEmojiDialog({ open, handleClose, reactions }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Zoom}
      scroll="body"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseFillIcon />
          </IconButton>
        </Stack>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {reactions.map((react) => {
            return (
              <ListItem className="!mb-2">
                <ListItemAvatar>
                  <Avatar
                    className="!rounded-lg"
                    src={react.imageUrl}
                    sx={{ width: "40px", height: "40px" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box className="bg-white !text-black font-bold">{react.name}</Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AvatarGroup
                            max={10}
                            total={react.data.length}
                            componentsProps={{
                              additionalAvatar: {
                                className: "!bg-white !text-black !text-sm !border-none",
                                sx: { width: "24px", height: "24px" }
                              }
                            }}
                          >
                            {react.data.map((emoji) => {
                              return (
                                <Avatar
                                  className="!border-none"
                                  src={EMOJI_ICONS[emoji.id]}
                                  sx={{ width: "24px", height: "24px" }}
                                />
                              );
                            })}
                          </AvatarGroup>
                          <Typography className="!text-base !text-black !mr-4">
                            {react.total}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
}

ReactedEmojiDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  reactions: PropTypes.array.isRequired
};

export default ReactedEmojiDialog;
