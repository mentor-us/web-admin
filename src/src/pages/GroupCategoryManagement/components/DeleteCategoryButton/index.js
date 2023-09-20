import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Modal, Fade, Backdrop, Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";

import MDTypography from "components/MDComponents/MDTypography";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import TooltipCustom from "components/Tooltip";
import { SuccessAlert, ErrorAlert, WarningAlertConfirm } from "components/SweetAlert";

import { deleteCategory, deleteMultipleCategories } from "redux/groupsCategory/slice";
import { removeGroupWithRemovedCategory } from "redux/groups/slice";
import { useMaterialUIController, setLoading } from "context";
import DeleteOptions from "./DeleteOptions";

function DeleteCategoryButton({ data, setState, typeButton, isMultiple }) {
  const dispatch = useDispatch();
  const [, dispatchContext] = useMaterialUIController();
  const [open, setOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState({
    type: "option 1",
    category: null
  });

  const isFailCase = () => {
    const { type, category } = deleteValue;
    if (type === "option 2" && category === null) {
      ErrorAlert("Không thể xóa vì không có loại nhóm khác được chọn!");
      return true;
    }

    return false;
  };

  const deleteGroupCategory = async (req) => {
    setLoading(dispatchContext, true);
    const title =
      deleteValue.type === "option 1" ? "Xóa loại nhóm thành công" : "Chuyển loại nhóm thành công";

    try {
      if (isMultiple) {
        await dispatch(
          deleteMultipleCategories({ ids: data.map((item) => item.id), ...req })
        ).unwrap();
        dispatch(removeGroupWithRemovedCategory(data));
      } else {
        await dispatch(deleteCategory({ id: data.id, req })).unwrap();
        dispatch(removeGroupWithRemovedCategory({ id: data.id }));
      }

      setState(null);
      setOpen(false);
      SuccessAlert(title);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      } // check lai
    }
    setLoading(dispatchContext, false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteCategory = async () => {
    let title;
    let html;
    let request = {
      newGroupCategoryId: ""
    };

    // Kiểm tra fail case
    if (isFailCase()) {
      return;
    }

    if (deleteValue.type === "option 1") {
      title = "Xóa loại nhóm?";
      html = isMultiple
        ? `Bạn chắc chắn muốn xóa các loại nhóm đã chọn?`
        : `Bạn chắc chắn muốn xóa loại nhóm <b>${data.name}</b>?`;
      request = {
        newGroupCategoryId: ""
      };
    } else {
      title = "Chuyển loại nhóm trước khi xóa?";
      html = isMultiple
        ? `Bạn chắc chắn muốn chuyển các nhóm thuộc loại nhóm được chọn sang loại nhóm <b>${deleteValue.category.name}</b>?`
        : `Bạn chắc chắn muốn chuyển các nhóm thuộc loại nhóm <b>${data.name}</b> sang loại nhóm <b>${deleteValue.category.name}</b>?`;
      request = {
        newGroupCategoryId: deleteValue.category.id
      };
    }

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        deleteGroupCategory(request);
      }
    });
  };

  const renderButton = () => {
    if (typeButton === "menu") {
      return (
        <MDBox display="flex" flexDirection="row" onClick={handleOpen} sx={{ width: "100%" }}>
          <Icon fontSize="medium" sx={{ mr: 1 }} color="error">
            delete
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="error">
            Xóa
          </MDTypography>
        </MDBox>
      );
    }

    if (typeButton === "normal") {
      return (
        <MDButton variant="gradient" color="error" onClick={handleOpen}>
          <Icon fontSize="medium" sx={{ mr: 1 }}>
            delete
          </Icon>
          <MDTypography variant="body2" fontSize="medium" fontWeight="regular" color="white">
            Xóa
          </MDTypography>
        </MDButton>
      );
    }

    return (
      <TooltipCustom title="Xóa">
        <MDButton variant="outlined" color="error" onClick={handleOpen} iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
        </MDButton>
      </TooltipCustom>
    );
  };

  return (
    <>
      {renderButton()}

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
            <MDTypography variant="h5" component="h2" textAlign="center" fontSize="25">
              Xóa loại nhóm
            </MDTypography>
            <Divider />
            <MDBox mt={3} mb={2}>
              <DeleteOptions data={data} state={deleteValue} setState={setDeleteValue} />
              <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
                <MDButton
                  onClick={handleDeleteCategory}
                  variant="contained"
                  color="info"
                  sx={{ mx: 1 }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                    Xác nhận
                  </MDTypography>
                </MDButton>
                <MDButton onClick={handleClose} variant="contained" color="error" sx={{ mx: 1 }}>
                  <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                  <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                    Hủy
                  </MDTypography>
                </MDButton>
              </MDBox>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

DeleteCategoryButton.defaultProps = {
  typeButton: "menu",
  isMultiple: false
};

DeleteCategoryButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  isMultiple: PropTypes.bool
};

export default DeleteCategoryButton;
