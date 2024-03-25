/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Divider,
  ImageList,
  ImageListItem,
  styled,
  Tab,
  Tabs
} from "@mui/material";
import PropTypes from "prop-types";

import FileApi from "api/FileApi";

import File from "pages/WebUser/components/File";
import { useGetGroupMedia } from "hooks/channels/queries";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff"
  }
});

export default function GroupMedia({ type }) {
  const { channelId } = useParams();
  const [value, setValue] = useState(type);
  const { data: channelMedia, isLoading, isSuccess } = useGetGroupMedia(channelId);
  const [ImageItem, setImageItem] = useState([]); // State for image items
  const [loading, setLoading] = useState(false);
  const [FileItem, setFileItem] = useState([]); // State for file items
  const [imagesToRender, setImagesToRender] = useState(20); // Number of images to render at a time
  const containerRef = useRef(null); // Reference to the container div

  useEffect(() => {
    if (isSuccess) {
      const fetchMediaData = async () => {
        setLoading(true);
        const imageItems = await Promise.all(
          channelMedia
            ?.filter((item) => item.type === "IMAGE")
            .slice(0, imagesToRender) // Select only the first 'imagesToRender' images
            .map(async (item) => {
              try {
                const base64Str = await FileApi.getFileWithKey(item.imageUrl);
                return { ...item, base64Str };
              } catch (error) {
                console.error("Error fetching image:", error);
                return null;
              }
            })
        );

        setImageItem(imageItems.filter(Boolean));
        setLoading(false);
        const fileItems = channelMedia?.filter((item) => item.type === "FILE") || [];
        setFileItem(fileItems);
        console.log("fileItems", fileItems);
      };

      fetchMediaData();
    }
  }, [channelMedia, isSuccess, imagesToRender]);

  // Function to handle scrolling
  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight) {
      setImagesToRender(imagesToRender + 20); // Load more images when scrolled to bottom
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <Box className="overflow-y-scroll no-scrollbar" onScroll={handleScroll} ref={containerRef}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="bg-white font-bold text-base border-b-2 mb-1 !h-[2rem]"
      >
        <BottomNavigationAction value="IMAGE" className="!p-0 !m-0" showLabel label="Hình ảnh" />

        <BottomNavigationAction value="FILE" className="!p-0 !m-0" showLabel label="Tập tin" />
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
          {value === "IMAGE" && ImageItem.length > 0 && (
            <ImageList cols={3}>
              {ImageItem.map((item) => (
                <ImageListItem key={item.imageUrl}>
                  <img src={item.base64Str} alt="hình ảnh" loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {value === "FILE" && FileItem.length > 0 && (
            <div>
              {FileItem.map((item) => (
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
          {value === "IMAGE" && ImageItem.length === 0 && <div>Chưa có hình ảnh</div>}
          {value === "FILE" && FileItem.length === 0 && <div>Chưa có file</div>}
        </>
      )}
    </Box>
  );
}
GroupMedia.propTypes = {
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string
};
