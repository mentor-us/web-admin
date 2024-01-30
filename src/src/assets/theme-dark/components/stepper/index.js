// Material Dashboard 2 React base styles
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import colors from "assets/theme-dark/base/colors";
import linearGradient from "assets/theme-dark/functions/linearGradient";
// Material Dashboard 2 React helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

const stepper = {
  styleOverrides: {
    root: {
      background: linearGradient(gradients.info.main, gradients.info.state),
      padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
      borderRadius: borderRadius.lg,
      boxShadow: colored.info,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main
      }
    }
  }
};

export default stepper;
