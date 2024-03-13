/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useState } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import FileApi from "api/FileApi";

// Custom styles for MDAvatar
import MDAvatarRoot from "components/MDComponents/MDAvatar/MDAvatarRoot";

const AsyncMDAvatar = forwardRef(({ bgColor, size, shadow, src, ...rest }, ref) => {
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const base64Str = await FileApi.getFileWithKey(src);
      setImageBase64(base64Str);
    };

    loadImage();
  }, []);

  return (
    <MDAvatarRoot ref={ref} src={imageBase64} ownerState={{ shadow, bgColor, size }} {...rest} />
  );
});

// Setting default values for the props of MDAvatar
AsyncMDAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
  src: ""
};

// Typechecking props for the MDAvatar
AsyncMDAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark"
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
  src: PropTypes.string
};

export default AsyncMDAvatar;
