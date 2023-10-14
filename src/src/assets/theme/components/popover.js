// Material Dashboard 2 React helper functions
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";
// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.md
    }
  }
};

export default popover;
