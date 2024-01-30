// Material Dashboard 2 React helper functions
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: md,
      padding: pxToRem(8),
      borderRadius: borderRadius.md
    }
  }
};

export default popover;
