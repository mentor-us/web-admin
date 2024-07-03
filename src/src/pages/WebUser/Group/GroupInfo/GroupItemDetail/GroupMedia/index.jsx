/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  Skeleton,
  Stack,
  styled
} from "@mui/material";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import FileApi from "api/FileApi";

import File from "pages/WebUser/components/File";
import { useGetGroupMedia } from "hooks/channels/queries";
import { SUPPORTED_VIDEO_EXT } from "utils/constants";

const CustomBottomNavigationAction = styled(BottomNavigationAction)({
  "&.Mui-selected": {
    color: "#1890ff"
  },
  "&:hover": {
    color: "#7ab6ed"
  }
});

export default function GroupMedia({ type }) {
  const { channelId } = useParams();
  const [value, setValue] = useState(type);
  const { data: channelMedia, isLoading, isSuccess } = useGetGroupMedia(channelId);
  const [loading, setLoading] = useState(false);

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

  const lightBoxRef = useRef(null);

  const registerUI = (lightbox) => {
    if (!lightbox) {
      return;
    }

    lightbox.on("uiRegister", () => {
      lightbox.pswp.ui.registerElement({
        name: "download-button",
        order: 8,
        isButton: true,
        tagName: "a",
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" class="w-48 h-48" id="pswp__icn-download"/>',
          outlineID: "pswp__icn-download"
        },
        onInit: (el, pswp) => {
          el.setAttribute("download", "");
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
          pswp.on("change", () => {
            // eslint-disable-next-line no-param-reassign
            el.href = pswp.currSlide?.data?.sourceUrl;
          });
        }
      });

      lightbox.pswp.ui.registerElement({
        name: "bulletsIndicator",
        className: "pswp__bullets-indicator",
        appendTo: "wrapper",
        onInit: (el, pswp) => {
          const bullets = [];
          let bullet;
          let prevIndex = -1;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < pswp.getNumItems(); i++) {
            bullet = document.createElement("div");
            bullet.className = "pswp__bullet";
            bullet.onclick = (e) => {
              pswp.goTo(bullets.indexOf(e.target));
            };
            el.appendChild(bullet);
            bullets.push(bullet);
          }
          pswp.on("change", (a) => {
            if (prevIndex >= 0) {
              bullets[prevIndex].classList.remove("pswp__bullet--active");
            }
            bullets[pswp.currIndex].classList.add("pswp__bullet--active");
            prevIndex = pswp.currIndex;
          });
        }
      });
    });
  };

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      dataSource: [],
      imageClickAction: "next",
      tapAction: "next",
      bgOpacity: 0.7,
      closeTitle: "Đóng chế độ xem ảnh",
      zoomTitle: "Phong to ảnh",
      arrowPrevTitle: "Xem ảnh trước",
      arrowNextTitle: "Xem ảnh tiếp theo",
      errorMsg: "Có lỗi xảy ra!. Không thể xem ảnh",
      indexIndicatorSep: " trên ",
      pswpModule: () => import("photoswipe")
    });

    lightBoxRef.current = lightbox;
    registerUI(lightbox);
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);
  const isVideo = (url) => {
    const videoExtensions = SUPPORTED_VIDEO_EXT;
    return videoExtensions.some((extension) => url.toLowerCase().endsWith(extension));
  };
  const onOpenImagePreview = (index) => {
    if (!isSuccess) {
      return;
    }
    lightBoxRef?.current.loadAndOpen(
      index ?? 0,
      images.map((image, idx) => {
        const isMediaVideo = isVideo(images[idx].url);
        return {
          sourceUrl: image.url,
          html: isMediaVideo
            ? `<div class="h-full w-full flex justify-center items-center py-12"><video src=${image.url} class="h-full w-[80%] object-contain" controls/></div>`
            : `<div class="h-full w-full flex justify-center items-center py-12"><img src=${image.url} class="h-full w-[80%] object-contain"/></div>`
        };
      })
    );
  };

  return (
    <Box className="overflow-y-scroll overflow-x-hidden no-scrollbar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "transparent", borderBottom: "1px solid #e0e0e0" }}
      >
        <CustomBottomNavigationAction value="IMAGE" showLabel label="Hình ảnh" />
        <CustomBottomNavigationAction value="FILE" showLabel label="Tập tin" />
      </BottomNavigation>
      {isLoading ? (
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
                <ImageListItem
                  className="cursor-pointer"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.imageUrl}-${index}`}
                  onClick={() => onOpenImagePreview(index)}
                >
                  {isVideo(item.url) ? (
                    <video src={getImageUrlWithKey(images[0]?.url)} className="!p-0" controls />
                  ) : (
                    <img src={item.url} alt="hình ảnh" loading="lazy" />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {value === "FILE" && files.length > 0 && (
            <div>
              {files.map((item) => (
                <Box key={item.id} sx={{ padding: "2px" }}>
                  <File file={item.file} isDownloadable />
                </Box>
              ))}
            </div>
          )}
          {value === "IMAGE" && images.length === 0 && isSuccess && (
            <div className="flex justify-center text-base items-center mt-4">Chưa có hình ảnh</div>
          )}
          {value === "FILE" && files.length === 0 && isSuccess && (
            <div className="flex justify-center text-base items-center mt-4">Chưa có tập tin</div>
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
