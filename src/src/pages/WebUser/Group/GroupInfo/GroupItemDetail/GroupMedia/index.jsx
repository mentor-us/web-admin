import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  Divider,
  ImageList,
  ImageListItem
} from "@mui/material";

import FileApi from "api/FileApi";

import { useGetGroupMedia } from "hooks/channels/queries";

export default function GroupMedia() {
  const { channelId } = useParams();
  const [value, setValue] = useState(0);
  const { data: channelMedia, isLoading, isSuccess } = useGetGroupMedia(channelId);
  const [ImageItem, setImageItem] = useState([]); // State for image items
  const [FileItem, setFileItem] = useState([]); // State for file items
  const [imagesToRender, setImagesToRender] = useState(10); // Number of images to render at a time
  const containerRef = useRef(null); // Reference to the container div

  useEffect(() => {
    if (isSuccess) {
      const fetchMediaData = async () => {
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

        const fileItems = channelMedia?.filter((item) => item.type === "FILE") || [];
        setFileItem(fileItems);
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

  return (
    <div className="overflow-auto" onScroll={handleScroll} ref={containerRef}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="bg-white font-bold text-base"
        sx={{
          "& .Mui-selected": {
            color: "#0190fe"
          },
          "& .MuiBottomNavigationAction-root": {
            color: "#A5A5A5"
          },
          height: "40px"
        }}
      >
        <BottomNavigationAction label="Hình ảnh" />
        <BottomNavigationAction label="Tập tin" />
      </BottomNavigation>
      <Divider
        sx={{
          margin: 1,
          padding: 0,
          backgroundColor: "#A5A5A5"
        }}
      />
      {isLoading ? ( // Display spinner when loading
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
          {value === 0 && ImageItem.length > 0 && (
            <ImageList cols={3}>
              {ImageItem.map((item) => (
                <ImageListItem key={item.id}>
                  <img src={item.base64Str} alt="hình ảnh" loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {value === 1 && FileItem.length > 0 && (
            <div>
              {FileItem.map((item) => (
                <div key={item.title}>{item.title}</div>
              ))}
            </div>
          )}
          {value === 0 && ImageItem.length === 0 && <div>Chưa có hình ảnh</div>}
          {value === 1 && FileItem.length === 0 && <div>Chưa có file</div>}
        </>
      )}
    </div>
  );
}
