import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Backdrop, Box, Divider, Fade, Icon, Modal } from "@mui/material";
import { removeGroupWithRemovedCategory } from "features/groups/slice";
import { deleteMultipleCategories } from "features/groupsCategory/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import { useDeleteCourseMutation } from "hooks/courses/mutation";

import DeleteOptions from "./DeleteOptions";

function DeleteSubjectButton({ data, setState, typeButton, isMultiple }) {
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState({
    type: "option 1",
    category: null
  });
  const deleteCourseMutator = useDeleteCourseMutation();

  const isFailCase = () => {
    const { type, category } = deleteValue;
    if (type === "option 2" && category === null) {
      ErrorAlert("Không thể xóa vì không có môn học khác được chọn!");
      return true;
    }

    return false;
  };

  const deleteGroupCategory = async (req) => {
    setLoading(dispatchContext, true);
    const title =
      deleteValue.type === "option 1" ? "Xóa môn học thành công" : "Chuyển môn học thành công";

    try {
      if (isMultiple) {
        await dispatch(
          deleteMultipleCategories({ ids: data.map((item) => item.id), ...req })
        ).unwrap();
        dispatch(removeGroupWithRemovedCategory(data));
      } else {
        await deleteCourseMutator.mutateAsync({ id: data.id, req });
        // await dispatch(deleteCategory({ id: data.id, req })).unwrap();
        // dispatch(removeGroupWithRemovedCategory({ id: data.id }));
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
      newCourseId: ""
    };

    // Kiểm tra fail case
    if (isFailCase()) {
      return;
    }

    if (deleteValue.type === "option 1") {
      title = "Xóa môn học?";
      html = isMultiple
        ? `Bạn chắc chắn muốn xóa các môn học đã chọn?`
        : `Bạn chắc chắn muốn xóa môn học <b>${data.name}</b>?`;
      request = {
        newCourseId: ""
      };
    } else {
      title = "Chuyển môn học trước khi xóa?";
      html = isMultiple
        ? `Bạn chắc chắn muốn chuyển các nhóm thuộc môn học được chọn sang môn học <b>${deleteValue.category.name}</b>?`
        : `Bạn chắc chắn muốn chuyển các nhóm thuộc môn học <b>${data.name}</b> sang môn học <b>${deleteValue.category.name}</b>?`;
      request = {
        newCourseId: deleteValue.category.id
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
              Xóa môn học
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

DeleteSubjectButton.defaultProps = {
  typeButton: "menu",
  isMultiple: false
};

DeleteSubjectButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  isMultiple: PropTypes.bool
};

export default DeleteSubjectButton;
