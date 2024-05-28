/* eslint-disable react/forbid-prop-types */
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Box, CircularProgress, IconButton, Paper, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { formatFileSize, getFileExtention } from "utils";
import { images } from "assets/images";
import { AttachmentIcon, DownloadIcon } from "assets/svgs";
import FileApi from "api/FileApi";

import TooltipCustom from "components/Tooltip";
import { UPLOAD_STATUS } from "utils/constants";

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
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async () => {
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

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const SuccessDownloadFileToast = useCallback(() => {
    setIsDownloading(false);
    return <b>Tải file thành công</b>;
  }, []);

  const ErrorDownloadFileToast = useCallback(() => {
    setIsDownloading(false);
    return <b>Lỗi xảy ra trong quá trình tải file!. Vui lòng thử lại sau.</b>;
  }, []);

  const onDownloadFileClick = async () => {
    setIsDownloading(true);

    toast.promise(
      downloadFile(),
      {
        loading: "Đang tải...",
        success: SuccessDownloadFileToast,
        error: ErrorDownloadFileToast
      },
      {
        style: {
          minWidth: "250px"
        }
      }
    );
  };

  if (file && file.uploadStatus === UPLOAD_STATUS.UPLOADING) {
    return (
      <Skeleton
        sx={{ flex: 1, cursor: "progress" }}
        animation="wave"
        variant="rectangular"
        height="4rem"
        width="20rem"
      />
    );
  }

  return (
    <Paper sx={styles.container}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="start"
        gap="0.4rem"
      >
        <Box className="!min-w-fit">
          <FileIcon filename={file?.filename} />
        </Box>
        <Box className="!line-clamp-2" flex={1}>
          <TooltipCustom title={file?.filename}>
            <Typography className="!text-base cursor-default">{file?.filename}</Typography>
          </TooltipCustom>
          <Typography className="!text-xs text-gray-500">{formatFileSize(file?.size)}</Typography>
        </Box>
        {isDownloadable && (
          <Box>
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
          </Box>
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
