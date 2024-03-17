/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { Box, CircularProgress, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { useSnackbar } from "notistack";
import { formatFileSize, getFileExtention } from "utils";
import { images } from "assets/images";
import { AttachmentIcon, DownloadIcon } from "assets/svgs";
import FileApi from "api/FileApi";

const styles = {
  container: {
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderColor: "#E0E0E0",
    borderRadius: 1,
    borderWidth: 1,
    flexDirection: "row",
    padding: "0.4rem 0.6rem"
  },
  downloadIconContainer: {
    padding: "0.6rem"
    // borderRadius: 20
    // backgroundColor: "#E2E9F3",
    // "&:hover": {
    //   backgroundColor: "#E2E9F3",
    //   opacity: 0.75
    // },
    // "&:disabled": {
    //   pointerEvents: "auto",
    //   cursor: "not-allowed!important"
    // }
  }
};

function FileIcon({ filename }) {
  const ext = getFileExtention(filename);
  let iconSrc = null;

  switch (ext) {
    case "doc":
    case "docx":
      iconSrc = images.docx;
      break;
    case "ppt":
    case "pptx":
      iconSrc = images.ppt;
      break;
    case "xls":
    case "xlsx":
      iconSrc = images.excel;
      break;
    case "pdf":
      iconSrc = images.pdf;
      break;
    default:
  }

  return iconSrc ? (
    <img src={iconSrc} height={40} width={36} alt="File icon" />
  ) : (
    <AttachmentIcon />
  );
}

FileIcon.propTypes = {
  filename: PropTypes.string.isRequired
};

function File({ file, isDownloadable }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isDownloading, setIsDownloading] = useState(false);

  const onDownloadFileClick = async () => {
    setIsDownloading(true);

    try {
      const response = await FileApi.fetchFileWithKey(file?.url);

      // Create download link
      const url = window.URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file?.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      enqueueSnackbar("Tải file thành công", {
        variant: "success"
      });
    } catch (e) {
      enqueueSnackbar("Lỗi xảy ra trong quá trình tải file!. Vui lòng thử lại sau.", {
        variant: "error"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Paper sx={styles.container}>
      <Box display="flex" alignItems="center" gap="0.4rem">
        <Box>
          <FileIcon filename={file?.filename} />
        </Box>

        <Box flex={1}>
          <Tooltip title={file?.filename}>
            <Typography className="!text-base line-clamp-2 cursor-default">
              {file?.filename}
            </Typography>
          </Tooltip>
          <Typography className="!text-xs text-gray-500">{formatFileSize(file?.size)}</Typography>
        </Box>
        {isDownloadable && (
          <IconButton
            className={`${isDownloading ? "!cursor-not-allowed" : ""}`}
            sx={styles.downloadIconContainer}
            disableTouchRipple={isDownloading}
            onClick={onDownloadFileClick}
          >
            {isDownloading ? (
              <CircularProgress color="info" size="1rem" />
            ) : (
              <DownloadIcon className="text-inherit fill-current" />
            )}
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}

File.propTypes = {
  file: PropTypes.object.isRequired,
  isDownloadable: PropTypes.bool
};

File.defaultProps = {
  isDownloadable: false
};

export default File;
