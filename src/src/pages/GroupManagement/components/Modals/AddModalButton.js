import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Icon,
  Autocomplete,
  TextField,
  Divider
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDComponents/MDButton";

import "./style.css";
import MDBox from "components/MDComponents/MDBox";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import AutoCompleteInput from "components/AutoComplete/AutoCompleteInput";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import BasicDatePicker from "components/DatePicker";

import { getAccountsTableSelector } from "redux/accounts/selector";
import { allCategoriesSelector } from "redux/groupsCategory/selector";
import { getFromToRangeSelector } from "redux/configuration/selector";

import { addNewGroup } from "redux/groups/slice";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import ImportEmailButton from "pages/GroupDetail/components/ImportEmailButton";
import { getAnotherDateFromToday } from "utils/formatDate";
import groupsServices from "service/groupsServices";
import { loadByEmail } from "redux/accounts/slice";

function AddModalButton() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const listCategories = useSelector(allCategoriesSelector);
  const userData = useSelector(getAccountsTableSelector);
  const fromToRange = useSelector(getFromToRangeSelector);
  const today = new Date();
  const tomorrow = getAnotherDateFromToday(today, 1, "date");

  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [mentorEmail, setMentorEmail] = useState([]);
  const [menteeEmail, setMenteeEmail] = useState([]);
  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [firstLoad, setFirstLoad] = useState({
    groupName: true,
    mentorEmail: true,
    menteeEmail: true,
    category: true,
    endDate: true,
    startDate: true
  });

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const GetDataConvert = () => {
    const categoryID = listCategories?.filter((item) => item.name === category)[0].id;
    const mentorEmails = mentorEmail.map((item) => item.email);
    const menteeEmails = menteeEmail.map((item) => item.email);
    return {
      name: groupName.toString().trim(),
      createdDate: today,
      description: description.toString().trim(),
      mentorEmails,
      menteeEmails,
      groupCategory: categoryID,
      status: "ACTIVE",
      timeStart: startDate,
      timeEnd: endDate
    };
  };

  const isOneReqDataHasValue = () => {
    return (
      groupName.length > 0 || mentorEmail.length > 0 || menteeEmail.length > 0 || category !== null
    );
  };

  const isAllReqDataHasValue = () => {
    return (
      groupName.length > 0 &&
      mentorEmail.length > 0 &&
      menteeEmail.length > 0 &&
      category != null &&
      startDate &&
      endDate
    );
  };

  const resetAllData = () => {
    setGroupName("");
    setDescription("");
    setMenteeEmail([]);
    setMentorEmail([]);
    setCategory(null);
    setStartDate(today);
    setEndDate(tomorrow);
    setFirstLoad({
      groupName: true,
      mentorEmail: true,
      menteeEmail: true,
      category: true,
      endDate: true,
      startDate: true
    });
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          resetAllData();
        }
      });
    } else {
      setOpen(false);
      resetAllData();
    }
  };

  const CreateGroup = async (data) => {
    const checkData = groupsServices.checkRequestDataCreateGroup(data, fromToRange.value);
    if (!checkData.status) {
      ErrorAlert(checkData.message);
      return;
    }

    setLoading(dispatchContext, true);

    try {
      await dispatch(addNewGroup(checkData.data)).unwrap();
      SuccessAlert("Thêm nhóm thành công");
      setOpen(false);
      resetAllData();
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
    const loadUserForAdd = async () => {
      try {
        await dispatch(loadByEmail("")).unwrap();
      } catch (error) {
        if (error?.message !== "401") {
          ErrorAlert(error?.message);
        }
      }
    };

    loadUserForAdd();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    isLostAllData();
  };

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

  const handleSubmit = () => {
    if (
      (firstLoad.groupName &&
        firstLoad.menteeEmail &&
        firstLoad.mentorEmail &&
        firstLoad.category &&
        firstLoad.endDate &&
        firstLoad.startDate) ||
      !isAllReqDataHasValue()
    ) {
      setFirstLoad({
        groupName: false,
        mentorEmail: false,
        menteeEmail: false,
        category: false,
        endDate: false,
        startDate: false
      });
      return;
    }
    const data = GetDataConvert();

    CreateGroup(data);
  };

  /// --------------------------------------------------------

  return (
    <div>
      <MDButton sx={{ mr: 1 }} onClick={handleOpen} variant="gradient" color="success">
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Thêm
        </MDTypography>
      </MDButton>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box className="group-modal__container" sx={{ width: "680px!important" }}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              fontSize="25px"
              component="h2"
              textAlign="center"
            >
              Tạo nhóm
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
                  sx={{
                    width: "70%"
                  }}
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
                  value={description}
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
                  Email Mentor <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox
                  style={{ width: "70%" }}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <AutoCompleteInput
                    key="mentor"
                    value={mentorEmail}
                    event={setMentorEmail}
                    data={userData || []}
                    placeholder="Chọn mentor"
                    styleCSS={{ width: "90%" }}
                    checkValid={{
                      isFirst: firstLoad,
                      setIsFirst: setFirstLoad,
                      checkName: "mentorEmail"
                    }}
                    removedList={{
                      anotherData: menteeEmail,
                      removedName: "email"
                    }}
                    // inputChange={handleUserDataChange}
                  />
                  <ImportEmailButton setData={setMentorEmail} />
                </MDBox>
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Email Mentee <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox
                  style={{ width: "70%" }}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <AutoCompleteInput
                    key="mentee"
                    value={menteeEmail}
                    event={setMenteeEmail}
                    data={userData || []}
                    placeholder="Chọn mentee"
                    styleCSS={{ width: "90%" }}
                    checkValid={{
                      isFirst: firstLoad,
                      setIsFirst: setFirstLoad,
                      checkName: "menteeEmail"
                    }}
                    removedList={{
                      anotherData: mentorEmail,
                      removedName: "email"
                    }}
                    // inputChange={handleUserDataChange}
                  />
                  <ImportEmailButton setData={setMenteeEmail} />
                </MDBox>
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
                  event={setStartDate}
                  minDate={getAnotherDateFromToday()}
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
                  event={setEndDate}
                  minDate={tomorrow}
                  maxDate={getAnotherDateFromToday(startDate, fromToRange.value, "year")}
                  checkValid={{
                    isFirst: firstLoad,
                    setIsFirst: setFirstLoad,
                    checkName: "endDate"
                  }}
                />
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
    </div>
  );
}

export default AddModalButton;
