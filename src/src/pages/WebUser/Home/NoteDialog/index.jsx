/* eslint-disable no-unused-vars */

import AddIcon from "@mui/icons-material/Add";
import DirectionsIcon from "@mui/icons-material/Directions";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";

import useMyInfo from "hooks/useMyInfo";

// export interface NoteUserAccess {
//   user: NoteUserProfile;
//   accessType: NoteUserAccessType;
// }
// export enum NoteUserAccessType {
//   EDITOR = "EDITOR",
//   VIEWER = "VIEWER",
// }
// export interface NoteUserProfile {
//   id: string;
//   name: string;
//   imageUrl: string;
//   email: string;
//   totalNotes: number;
// }
// gen fake data follow NoteUserAccess
const fakedata = [
  {
    user: {
      id: "1",
      name: "John Doe",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "john.doe@example.com",
      totalNotes: 5
    }
  },
  {
    user: {
      id: "2",
      name: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane.smith@example.com",
      totalNotes: 12
    }
  },
  {
    user: {
      id: "3",
      name: "Alice Johnson",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "alice.johnson@example.com",
      totalNotes: 7
    }
  },
  {
    user: {
      id: "4",
      name: "Bob Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "bob.brown@example.com",
      totalNotes: 3
    }
  },
  {
    user: {
      id: "5",
      name: "Eve Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "eve.davis@example.com",
      totalNotes: 9
    }
  },
  {
    user: {
      id: "2",
      name: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane.smith@example.com",
      totalNotes: 12
    }
  },
  {
    user: {
      id: "3",
      name: "Alice Johnson",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "alice.johnson@example.com",
      totalNotes: 7
    }
  },
  {
    user: {
      id: "4",
      name: "Bob Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "bob.brown@example.com",
      totalNotes: 3
    }
  },
  {
    user: {
      id: "5",
      name: "Eve Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "eve.davis@example.com",
      totalNotes: 9
    }
  },
  {
    user: {
      id: "2",
      name: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane.smith@example.com",
      totalNotes: 12
    }
  },
  {
    user: {
      id: "3",
      name: "Alice Johnson",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "alice.johnson@example.com",
      totalNotes: 7
    }
  },
  {
    user: {
      id: "4",
      name: "Bob Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "bob.brown@example.com",
      totalNotes: 3
    }
  },
  {
    user: {
      id: "5",
      name: "Eve Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "eve.davis@example.com",
      totalNotes: 9
    }
  }
];

function NoteDialog(props) {
  const { open, onClose } = props;

  const myInfo = useMyInfo();
  const handleSearchChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="w-full !py-2" alignSelf="flex-start">
        <Stack className="w-full" direction="row" justifyContent="space-between">
          <span className="!p-2">Danh sách ghi chú</span>
          {/* <Button> */}
          <IconButton
            className="!absolute !right-0 hover:!bg-slate-300 !mx-4 !my-2 rounded-full"
            size="small"
            onClick={(e) => {
              console.log("click");
            }}
          >
            <AddIcon />
          </IconButton>
          {/* </Button> */}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 1, margin: 1 }}>
        <Stack className="w-full rounded-lg" direction="column" spacing={1}>
          <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm bằng tên hoặc email"
              inputProps={{ "aria-label": "Tìm kiếm bằng tên hoặc email" }}
            />
          </Paper>
          {fakedata.map((note) => (
            <Stack
              key={note.id}
              className="w-full p-2 hover:bg-gray-100"
              direction="row"
              justifyContent="space-between"
            >
              {/* show users who created the note */}
              <Stack direction="row" spacing={2} onClick="clickToChange">
                <Avatar src={note.user.imageUrl} />
                <Stack direction="column">
                  <Typography>{note.user.name}</Typography>
                  <Typography variant="caption">
                    Có {note.user.totalNotes} ghi chú về người này
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// NoteDialog.defaultProps = {
//   isFromGroupMember: false
// };

NoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default NoteDialog;
