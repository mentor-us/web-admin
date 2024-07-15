import React, { useState } from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";
import { useDeleteGradeMutation } from "hooks/grades/mutation";

function DeleteGradeButton({ data, setState, isMultiple }) {
  const [, dispatchContext] = useMentorUs();
  // eslint-disable-next-line no-unused-vars
  const [deleteValue, setDeleteValue] = useState({
    type: "option 1",
    category: null
  });
  const deleteGradeMutator = useDeleteGradeMutation();

  const isFailCase = () => {
    const { type, category } = deleteValue;
    if (type === "option 2" && category === null) {
      ErrorAlert("Không thể xóa vì không có điểm số khác được chọn!");
      return true;
    }

    return false;
  };

  const deleteGroupGrade = async (req) => {
    setLoading(dispatchContext, true);
    const title =
      deleteValue.type === "option 1" ? "Xóa điểm số thành công" : "Chuyển điểm số thành công";

    try {
      // eslint-disable-next-line no-empty
      if (isMultiple) {
      } else {
        await deleteGradeMutator.mutateAsync({ id: data.id, req });
        // await dispatch(deleteGrade({ id: data.id, req })).unwrap();
        // dispatch(removeGroupWithRemovedGrade({ id: data.id }));
      }

      setState(null);
      SuccessAlert(title);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      } // check lai
    }
    setLoading(dispatchContext, false);
  };

  const handleDeleteGrade = async () => {
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
      title = "Xóa điểm số?";
      html = isMultiple
        ? `Bạn chắc chắn muốn xóa các điểm số đã chọn?`
        : `Bạn chắc chắn muốn xóa điểm số <b>${[
            data.year,
            data.semester,
            data.courseCode,
            data.courseName,
            data.student.name,
            data.score
          ].join(" - ")}</b>?`;
      request = {
        newCourseId: ""
      };
    }

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        deleteGroupGrade(request);
      }
    });
  };

  const renderButton = () => {
    return (
      <MDBox display="flex" flexDirection="row" onClick={handleDeleteGrade} sx={{ width: "100%" }}>
        <Icon fontSize="medium" sx={{ mr: 1 }} color="error">
          delete
        </Icon>
        <MDTypography variant="subtitle2" fontSize="medium" color="error">
          Xóa
        </MDTypography>
      </MDBox>
    );
  };

  return <>{renderButton()}</>;
}

DeleteGradeButton.defaultProps = {
  isMultiple: false
};

DeleteGradeButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool
};

export default DeleteGradeButton;
