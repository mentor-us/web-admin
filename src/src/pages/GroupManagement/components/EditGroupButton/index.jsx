import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Backdrop,
  Box,
  Divider,
  Fade,
  Icon,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { getFromToRangeSelector } from "features/configuration/selector";
import { editDetail } from "features/groupDetail/slice";
import { editGroup } from "features/groups/slice";
import { allCategoriesSelector } from "features/groupsCategory/selector";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
// import { groupStatusList } from "utils/constants";
import { getGroupStatusList } from "utils";

import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import groupsServices from "service/groupsServices";
import { getAnotherDateFromToday } from "utils/formatDate";

function EditGroupButton({ data, setState, typeButton, isInDetail }) {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const listCategories = useSelector(allCategoriesSelector);
  const [open, setOpen] = useState(false);
  const today = new Date();
  const statusList = getGroupStatusList();
  const [groupName, setGroupName] = useState(data.name);
  const [category, setCategory] = useState(
    listCategories?.find((item) => item.id === data.groupCategory)?.name
  );
  const [status, setStatus] = useState(statusList.find((item) => item.textValue === data.status));
  const [description, setDescription] = useState(data.description);
  const [startDate, setStartDate] = useState(new Date(data.timeStart));
  const [endDate, setEndDate] = useState(new Date(data.timeEnd));
  const [firstLoad, setFirstLoad] = useState({
    groupName: true,
    description: true,
    category: true,
    endDate: true,
    startDate: true
  });
  const fromToRange = useSelector(getFromToRangeSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const GetDataConvert = () => {
    const statusReq = status?.textValue;
    const categoryID = listCategories?.find((item) => item.name === category)?.id;

    return {
      name: groupName.toString().trim(),
      description: description.toString().trim(),
      groupCategory: categoryID,
      status: statusReq,
      timeStart: startDate,
      timeEnd: endDate
    };
  };

  const isOneReqDataHasChanged = () => {
    return (
      groupName !== data.name ||
      description !== data.description ||
      status !== statusList.find((item) => item.textValue === data.status) ||
      category !== listCategories?.find((item) => item.id === data.groupCategory)?.name ||
      new Date(startDate).getTime() !== new Date(data.timeStart).getTime() ||
      new Date(endDate).getTime() !== new Date(data.timeEnd).getTime()
    );
  };

  const isAllReqDataHasValue = () => {
    return groupName.length > 0 && category != null && startDate && endDate;
  };

  const resetAllReqData = () => {
    setGroupName(data.name);
    setStatus(statusList.find((item) => item.textValue === data.status));
    setCategory(listCategories?.find((item) => item.id === data.groupCategory)?.name);
    setStartDate(new Date(data.timeStart));
    setEndDate(new Date(data.timeEnd));
    // setStatusList(getGroupStatusList(data.status));
    setFirstLoad({
      groupName: true,
      mentorEmail: true,
      menteeEmail: true,
      category: true
    });
  };

  const isLostAllData = () => {
    if (isOneReqDataHasChanged()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          setState(null);
          resetAllReqData();
        }
      });
    } else {
      setOpen(false);
      resetAllReqData();
    }
  };

  const changeStatus = (value, type) => {
    let newStatus = null;
    const date = new Date(value);
    if (type === "start") {
      if (date.getTime() >= endDate.getTime()) {
        setStatus(null);
        return;
      }

      if (today.getTime() < date.getTime()) {
        newStatus = statusList.find((item) => item.textValue === "INACTIVE");
      } else if (today.getTime() < endDate.getTime()) {
        newStatus = statusList.find((item) => item.textValue === "ACTIVE");
      } else {
        newStatus = statusList.find((item) => item.textValue === "OUTDATED");
      }
    } else if (type === "end") {
      if (startDate.getTime() >= date.getTime()) {
        setStatus(null);
        return;
      }

      if (today.getTime() < startDate.getTime()) {
        newStatus = statusList.find((item) => item.textValue === "INACTIVE");
      } else if (today.getTime() < date.getTime()) {
        newStatus = statusList.find((item) => item.textValue === "ACTIVE");
      } else {
        newStatus = statusList.find((item) => item.textValue === "OUTDATED");
      }
    }
    setStatus(newStatus);
  };

  const EditGroup = async (req) => {
    const checkData = groupsServices.checkRequestDataEditGroup(req, fromToRange.value);
    if (!checkData.status) {
      ErrorAlert(checkData.message);
      return;
    }

    setLoading(dispatchContext, true);

    try {
      if (!isInDetail) {
        await dispatch(editGroup({ id: data.id, req })).unwrap();
      } else {
        await dispatch(editDetail({ id: data.id, req })).unwrap();
      }
      SuccessAlert("Chỉnh sửa nhóm thành công");
      setOpen(false);
      setState(null);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    resetAllReqData();
  }, [data]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setFirstLoad({
      ...firstLoad,
      groupName: false
    });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e, newValue) => {
    setCategory(newValue);
    setFirstLoad({
      ...firstLoad,
      category: false
    });
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
    changeStatus(value, "start");
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    changeStatus(value, "end");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstLoad.groupName &&
      firstLoad.category &&
      firstLoad.endDate &&
      firstLoad.startDate &&
      !isAllReqDataHasValue()
    ) {
      setFirstLoad({
        groupName: false,
        mentorEmail: false,
        menteeEmail: false,
        category: false
      });
      return;
    }

    const req = GetDataConvert();

    EditGroup(req);
  };

  /// --------------------------------------------------------

  return (
    <>
      {typeButton === "normal" ? (
        <MDBox display="flex" flexDirection="row" onClick={handleOpen} sx={{ width: "100%" }}>
          <Icon fontSize="medium" sx={{ mr: 1 }} color="info">
            edit
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="info">
            Sửa
          </MDTypography>
        </MDBox>
      ) : (
        <TooltipCustom title="Chỉnh sửa">
          <MDButton variant="outlined" color="info" iconOnly circular onClick={handleOpen}>
            <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
          </MDButton>
        </TooltipCustom>
      )}
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box className="group-modal__container" sx={{ width: "600px!important" }}>
            <Typography variant="h5" component="h2" textAlign="center" fontSize="25">
              Chỉnh sửa Nhóm
            </Typography>
            <Divider />
            <MDBox mt={3} mb={2}>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Tên nhóm <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập tên nhóm"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={groupName}
                  onChange={handleGroupNameChange}
                  inputProps={{ maxLength: 100 }}
                  error={!firstLoad.groupName && groupName.length === 0}
                  helperText={
                    !firstLoad.groupName && groupName.length === 0 ? "Tên nhóm không được rỗng" : ""
                  }
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Mô tả
                </MDTypography>
                <MDInput
                  placeholder="Nhập mô tả nhóm"
                  multiline
                  size="small"
                  sx={{ width: "70%" }}
                  value={description || " "}
                  onChange={handleDescriptionChange}
                  inputProps={{ maxLength: 200 }}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Loại nhóm <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Trống"
                  value={category}
                  onChange={handleCategoryChange}
                  sx={{ width: "70%", pl: "0!important", pt: "0!important" }}
                  options={listCategories
                    ?.filter((item) => item.status === "ACTIVE")
                    .map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn loại nhóm"
                      error={!firstLoad.category && category === null}
                      helperText={
                        !firstLoad.category && category === null
                          ? "Vui lòng chọn ít nhất 1 giá trị"
                          : ""
                      }
                      size="small"
                    />
                  )}
                />
              </MDBox>

              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Thời gian bắt đầu <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <BasicDatePicker
                  value={startDate}
                  event={handleStartDateChange}
                  minDate={getAnotherDateFromToday(startDate, -4, "year")}
                  maxDate={getAnotherDateFromToday(today, fromToRange.value, "year")}
                  checkValid={{
                    isFirst: firstLoad,
                    setIsFirst: setFirstLoad,
                    checkName: "startDate"
                  }}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Thời gian kết thúc <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <BasicDatePicker
                  value={endDate}
                  event={handleEndDateChange}
                  minDate={getAnotherDateFromToday(startDate, 0, "year")}
                  maxDate={getAnotherDateFromToday(today, fromToRange.value, "year")}
                  checkValid={{
                    isFirst: firstLoad,
                    setIsFirst: setFirstLoad,
                    checkName: "endDate"
                  }}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Trạng thái <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox
                  display="flex"
                  flexDirection="row"
                  justifyContent="left"
                  alignItems="center"
                  sx={{ width: "70%" }}
                >
                  <div
                    style={{
                      background: status?.color || "white",
                      borderRadius: "50%",
                      width: "0.5rem",
                      height: "0.5rem",
                      marginRight: "15px"
                    }}
                  />
                  <MDTypography
                    component="a"
                    variant="button"
                    color="dark"
                    sx={{ fontWeight: "400", ml: -1, color: status?.color || "white" }}
                  >
                    {status?.label}{" "}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton onClick={handleSubmit} variant="contained" color="info" sx={{ mx: 1 }}>
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

EditGroupButton.defaultProps = {
  typeButton: "normal",
  isInDetail: false
};

EditGroupButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.string,
  isInDetail: PropTypes.bool
};

export default EditGroupButton;
