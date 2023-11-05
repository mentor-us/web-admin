import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Card,
  Divider,
  Fade,
  Icon,
  ImageList,
  ImageListItem,
  Modal,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import MDAvatar from "components/MDComponents/MDAvatar";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import TooltipCustom from "components/Tooltip";
import { imageIconList } from "utils/constants";

import UploadIconButton from "./UploadIconButton";

function IconSelectButton({ setState }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleItemClick = (e) => {
    setState(e.target.src);
    setOpen(false);
  };

  return (
    <>
      <TooltipCustom title="Sửa">
        <MDButton
          variant="outlined"
          color="error"
          size="small"
          iconOnly
          circular
          onClick={handleOpen}
        >
          <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
        </MDButton>
      </TooltipCustom>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box className="group-modal__container">
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              fontSize="25"
              sx={{ textTransform: "capitalize" }}
            >
              Chọn biểu tượng
            </Typography>
            <Divider />
            <MDBox mt={3} mb={2} display="flex" flexDirection="column">
              <Card sx={{ py: 3, px: 3, mb: 1, background: "#ECF2FF" }}>
                <MDTypography
                  variant="h2"
                  fontWeight="regular"
                  color="info"
                  sx={{ pl: 0.5, mb: 3, fontSize: "20px", textAlign: "center" }}
                >
                  Biểu tượng mặc định
                </MDTypography>
                <ImageList cols={4} rowHeight="auto">
                  {imageIconList.map((item) => (
                    <ImageListItem
                      onClick={handleItemClick}
                      key={item.src}
                      sx={{ mb: 1.5, cursor: "pointer!important", alignItems: "center" }}
                    >
                      <MDAvatar
                        src={item.src}
                        alt={item.name}
                        shadow="lg"
                        size="xl"
                        sx={{ border: "1px solid #B4E4FF!important" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Card>
              <MDBox className="signin__line-border">
                <hr className="signin__line" />
                <MDTypography
                  variant="h4"
                  fontWeight="regular"
                  fontSize="small"
                  color="dark"
                  mt={1}
                  className="signin__text-or"
                  sx={({ palette: { white } }) => ({
                    backgroundColor: white.main
                  })}
                >
                  <span>hoặc</span>
                </MDTypography>
              </MDBox>
              <MDBox sx={{ alignSelf: "center", mt: 1.5 }}>
                <UploadIconButton setState={setState} setAnotherState={setOpen} />
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton onClick={handleClose} variant="contained" color="error" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Hủy
                </MDTypography>
              </MDButton>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

IconSelectButton.propTypes = {
  setState: PropTypes.func.isRequired
};

export default IconSelectButton;
