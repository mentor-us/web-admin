/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import { NotiFailed } from "assets/svgs";
import colors from "assets/theme/base/colors";
import FileApi from "api/FileApi";

import "photoswipe/style.css";
import styles from "./styles.css";

const countFrom = 5;

function ImageSkeleton() {
  return (
    <Skeleton
      sx={{ marginRight: "0.1rem", marginBottom: "0.1rem", flex: 1, cursor: "progress" }}
      animation="wave"
      variant="rectangular"
      height="12rem"
    />
  );
}

function GridImage({ images, galleryID, uploadFailed }) {
  const [imageUrlList, setImageUrlList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const lightBoxRef = useRef(null);

  const imagesToShow = [...images];

  if (countFrom && images.length > countFrom) {
    imagesToShow.length = countFrom;
  }

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

        // SVG with outline
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

    setImageUrlList(images.map((image) => getImageUrlWithKey(image?.url)));

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);
  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".mkv", ".qt"];
    return videoExtensions.some((extension) => url.toLowerCase().endsWith(extension));
  };
  const onOpenImagePreview = (index) => {
    if (!isLoaded) {
      return;
    }
    lightBoxRef?.current.loadAndOpen(
      index ?? 0,
      imageUrlList.map((imageUrl, idx) => {
        const isMediaVideo = isVideo(images[idx].url);
        return {
          sourceUrl: imageUrl,
          html: isMediaVideo
            ? `<div class="h-full w-full flex justify-center items-center py-12"><video src=${imageUrl} class="h-full w-[80%] object-contain" controls/></div>`
            : `<div class="h-full w-full flex justify-center items-center py-12"><img src=${imageUrl} class="h-full w-[80%] object-contain"/></div>`
        };
      })
    );
  };

  const renderCountOverlay = (more) => {
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

    return [
      more && <Box key="count" className="cover" />,
      more && (
        <Box key="count-sub" className="cover-text" style={{ fontSize: "1.4rem" }}>
          <Typography color="inherit">+{extra}</Typography>
        </Box>
      )
    ];
  };

  const renderOverlay = (id) => {
    // return [
    //   <Box key={`cover-${id}`} className="cover slide" style={{ backgroundColor: "#22222" }} />,
    //   <Typography
    //     key={`cover-text-${id}`}
    //     className="cover-text slide animate-text"
    //     style={{ fontSize: "0.4rem" }}
    //   >
    //     Preview Image
    //   </Typography>
    // ];
    return null;
  };

  const renderOne = () => {
    const overlay =
      images.length > countFrom && countFrom === 1 ? renderCountOverlay(true) : renderOverlay();
    const isMediaVideo = isVideo(images[0].url);
    return (
      <Grid container className="container">
        {images[0].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={12}
            md={12}
            className={`border height-one background ${isMediaVideo ? "p-0" : ""}`}
            style={{ backgroundImage: `url(${imageUrlList[0]})` }}
            onClick={() => onOpenImagePreview(0)}
          >
            {isMediaVideo ? (
              <video src={getImageUrlWithKey(images[0]?.url)} className="!p-0" controls />
            ) : (
              <div
                style={{ backgroundImage: `url(${images[0]})` }}
                className="h-full w-full object-cover"
              />
            )}
            {overlay}
          </Grid>
        )}
      </Grid>
    );
  };

  const renderTwo = () => {
    const conditionalRender =
      [3, 4].includes(imagesToShow.length) ||
      (imagesToShow.length > +countFrom && [3, 4].includes(+countFrom));
    const overlay =
      images.length > countFrom && [2, 3].includes(+countFrom)
        ? renderCountOverlay(true)
        : renderOverlay();

    return (
      <Grid container className="container">
        {images[conditionalRender ? 1 : 0].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={6}
            md={6}
            className="border height-two background"
            style={{
              backgroundImage: `url(${conditionalRender ? imageUrlList[1] : imageUrlList[0]})`
            }}
            onClick={() => onOpenImagePreview(conditionalRender ? 1 : 0)}
          >
            {renderOverlay()}
          </Grid>
        )}
        {images[conditionalRender ? 2 : 1].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={6}
            md={6}
            className="border height-two background"
            style={{
              backgroundImage: `url(${conditionalRender ? imageUrlList[2] : imageUrlList[1]})`
            }}
            onClick={() => onOpenImagePreview(conditionalRender ? 2 : 1)}
          >
            {overlay}
          </Grid>
        )}
      </Grid>
    );
  };

  const renderThree = () => {
    const conditionalRender =
      imagesToShow.length === 4 || (imagesToShow.length > +countFrom && +countFrom === 4);

    const overlay =
      !countFrom || countFrom > 5 || (images.length > countFrom && [4, 5].includes(+countFrom))
        ? renderCountOverlay(true)
        : renderOverlay(conditionalRender ? 3 : 4);

    return (
      <Grid container className="container">
        {images[conditionalRender ? 1 : 2].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={6}
            md={4}
            className="border height-three background"
            style={{
              backgroundImage: `url(${conditionalRender ? imageUrlList[1] : imageUrlList[2]})`
            }}
            onClick={() => onOpenImagePreview(conditionalRender ? 1 : 2)}
          >
            {renderOverlay(conditionalRender ? 1 : 2)}
          </Grid>
        )}
        {images[conditionalRender ? 2 : 3].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={6}
            md={4}
            className="border height-three background"
            style={{
              backgroundImage: `url(${conditionalRender ? imageUrlList[2] : imageUrlList[3]})`
            }}
            onClick={() => onOpenImagePreview(conditionalRender ? 2 : 3)}
          >
            {renderOverlay(conditionalRender ? 2 : 3)}
          </Grid>
        )}
        {images[conditionalRender ? 3 : 4].isUploading ? (
          <ImageSkeleton />
        ) : (
          <Grid
            item
            xs={6}
            md={4}
            className="border height-three background"
            style={{
              backgroundImage: `url(${conditionalRender ? imageUrlList[3] : imageUrlList[4]})`
            }}
            onClick={() => onOpenImagePreview(conditionalRender ? 3 : 4)}
          >
            {overlay}
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <div className="grid-container w-[20rem]" id={galleryID}>
      {isLoaded && (
        <Box position="relative">
          {[1, 3, 4].includes(imagesToShow.length) && renderOne()}
          {imagesToShow.length >= 2 && imagesToShow.length !== 4 && renderTwo()}
          {imagesToShow.length >= 4 && renderThree()}
          {uploadFailed && (
            <Box
              style={{
                alignItems: "center",
                backgroundColor: "#000a",
                bottom: 0,
                justifyContent: "center",
                left: 0,
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 0,
                borderRadius: 8
              }}
            >
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <NotiFailed />
                <Typography style={{ color: colors.white.main, fontWeight: "bold" }}>
                  Gửi ảnh thất bại
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {!isLoaded && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress className="my-2" color="info" size="2rem" />
        </Box>
      )}
    </div>
  );
}

GridImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  galleryID: PropTypes.string.isRequired,
  uploadFailed: PropTypes.bool
};

GridImage.defaultProps = {
  uploadFailed: false
};

export default GridImage;
