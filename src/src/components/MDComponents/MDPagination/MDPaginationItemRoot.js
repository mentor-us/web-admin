// @mui material components
import { styled } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDButton from "components/MDComponents/MDButton";

export default styled(MDButton)(({ theme, ownerState }) => {
  const { borders, functions, typography, palette } = theme;
  const { variant, paginationSize, active } = ownerState;

  const { borderColor } = borders;
  const { pxToRem } = functions;
  const { size: fontSize } = typography;
  const { light } = palette;

  // width, height, minWidth and minHeight values
  let sizeValue = pxToRem(36);

  if (paginationSize === "small") {
    sizeValue = pxToRem(30);
  } else if (paginationSize === "large") {
    sizeValue = pxToRem(46);
  }

  return {
    border: "none!important",
    margin: `0 ${pxToRem(2)}`,
    pointerEvents: active ? "none" : "auto",
    fontWeight: "300",
    fontSize: fontSize.md,
    width: sizeValue,
    minWidth: sizeValue,
    height: sizeValue,
    minHeight: sizeValue,

    "&:hover, &:focus, &:active": {
      transform: "none",
      boxShadow: (variant !== "gradient" || variant !== "contained") && "none !important",
      opacity: "1 !important",
      borderColor,
      border: "inherit"
    },

    "&:hover": {
      backgroundColor: light.main,
      borderColor
    }
  };
});
