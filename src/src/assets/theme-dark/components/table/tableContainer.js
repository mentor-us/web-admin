// Material Dashboard 2 React base styles
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import colors from "assets/theme-dark/base/colors";

const { background } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: background.card,
      boxShadow: md,
      borderRadius: borderRadius.xl
    }
  }
};

export default tableContainer;
