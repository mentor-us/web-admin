/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Divider,
  ImageList,
  ImageListItem,
  Skeleton,
  Stack,
  styled,
  Tab,
  Tabs
} from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import FileApi from "api/FileApi";

import File from "pages/WebUser/components/File";
import { useGetGroupMedia } from "hooks/channels/queries";

const CustomBottomNavigationAction = styled(BottomNavigationAction)({
  "&.Mui-selected": {
    color: "#1890ff" // Color when selected
  },
  "&:hover": {
    color: "#7ab6ed" // Color on hover
  }
});

const sizeRender = 10;
export default function GroupMedia({ type }) {
  const { channelId } = useParams();
  const [value, setValue] = useState(type);
  const { data: channelMedia, isLoading, isSuccess } = useGetGroupMedia(channelId);
  const [ImageItem, setImageItem] = useState([]); // State for image items
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null); // Reference to the container div

  const images = useMemo(() => {
    return (
      channelMedia
        ?.filter((item) => item.type === "IMAGE")
        ?.map((item) => {
          return { ...item, url: getImageUrlWithKey(item.imageUrl) };
        })
        ?.filter(Boolean) || []
    );
  }, [channelMedia]);

  const files = useMemo(() => {
    return channelMedia?.filter((item) => item.type === "FILE") || [];
  }, [channelMedia]);

  // Function to handle scrolling

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <Box className="overflow-y-scroll overflow-x-hidden no-scrollbar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="bg-white font-bold text-base border-b-2 mb-1 !h-[2rem]"
      >
        <CustomBottomNavigationAction
          value="IMAGE"
          className="!p-0 !m-0"
          showLabel
          label="Hình ảnh"
        />

        <CustomBottomNavigationAction
          value="FILE"
          className="!p-0 !m-0"
          showLabel
          label="Tập tin"
        />
      </BottomNavigation>
      {loading ? ( // Display spinner when loading
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px"
          }}
        >
          <CircularProgress color="info" />
        </div>
      ) : (
        <>
          {value === "IMAGE" && images.length > 0 && (
            <ImageList cols={3}>
              {images.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ImageListItem key={`${item.imageUrl}-${index}`}>
                  <img src={item.url} alt="hình ảnh" loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {value === "FILE" && files.length > 0 && (
            <div>
              {files.map((item) => (
                <Box
                  sx={{
                    padding: "2px"
                  }}
                >
                  <File file={item.file} isDownloadable />
                </Box>
              ))}
            </div>
          )}
          {value === "IMAGE" && images.length === 0 && isSuccess && (
            <div className="flex justify-center items-center">Chưa có hình ảnh</div>
          )}
          {value === "FILE" && files.length === 0 && isSuccess && (
            <div className="flex justify-center items-center">Chưa có file</div>
          )}
        </>
      )}
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={80} />
          <Skeleton variant="rounded" height={80} />
          <Skeleton variant="rounded" height={80} />
        </Stack>
      )}
    </Box>
  );
}
GroupMedia.propTypes = {
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string
};
