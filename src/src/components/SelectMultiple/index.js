import { useState } from "react";
import { Icon, Menu, MenuItem } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { PropTypes } from "prop-types";

// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomCheckbox from "components/Checkbox";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.3))",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

function SelectMultiple({ label, icon, value, setValue }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MDButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="dark"
        disableElevation
        onClick={handleClick}
        sx={{ boxShadow: "none!important" }}
      >
        <Icon>{icon}</Icon>
        <MDTypography variant="button" sx={{ mx: 1, fontWeight: "400" }}>
          {label}
        </MDTypography>
      </MDButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {value?.map((item) => (
          <MenuItem key={item.textValue} disableRipple>
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <CustomCheckbox
                data={item}
                type="single"
                prop="isShow"
                action={setValue}
                isDisabled={item.isShow && value.filter((item1) => item1.isShow).length <= 2}
              />
              <MDTypography variant="button" sx={{ mx: 1, fontWeight: "400" }}>
                {item.text}
              </MDTypography>
            </MDBox>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

SelectMultiple.defaultProps = {
  label: " ",
  icon: "view_week"
};

SelectMultiple.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.instanceOf(Array).isRequired,
  setValue: PropTypes.func.isRequired
};

export default SelectMultiple;
