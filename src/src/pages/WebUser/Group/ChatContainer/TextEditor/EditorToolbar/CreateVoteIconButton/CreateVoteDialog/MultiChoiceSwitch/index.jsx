import { styled, Switch } from "@mui/material";

const MultiChoiceSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    transitionDuration: "300ms",
    "&.Mui-checked": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#006EDC !important" : "#006EDC !important",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));

export default MultiChoiceSwitch;
