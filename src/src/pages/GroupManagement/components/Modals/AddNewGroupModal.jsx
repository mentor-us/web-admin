import { useMemo, useState } from "react";
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
import { getAccountsTableSelector } from "features/accounts/selector";
import { getFromToRangeSelector } from "features/configuration/selector";
import { addNewGroup } from "features/groups/slice";
import { allCategoriesSelector } from "features/groupsCategory/selector";
import PropTypes from "prop-types";

import { setLoading } from "context";
import dayjs from "dayjs";
import { useMentorUs } from "hooks";

import ImportEmailButton from "pages/GroupDetail/components/ImportEmailButton";
import AutoCompleteEmailInput from "components/AutoComplete/AutoCompleteEmailInput";
import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import groupsServices from "service/groupsServices";
import { getAnotherDateFromToday } from "utils/formatDate";

import "./style.css";

/**
 * AddNewGroupModal
 * @description
 * This component will render a modal to add new group
 * @param {boolean} open - is modal open
 * @param {function} onClose - callback when close modal
 * @returns {React.JSX.Element}
 */
function AddNewGroupModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [, appDispatch] = useMentorUs();
  const categories = useSelector(allCategoriesSelector);
  const allUserEmails = useSelector(getAccountsTableSelector);
  const fromToRange = useSelector(getFromToRangeSelector);
  const today = dayjs();
  const tomorrow = getAnotherDateFromToday(today, 1, "date");

  // Form Data
  const [groupName, setGroupName] = useState({ value: "" });
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState({ value: null });
  const [selectedMentees, setSelectedMentees] = useState({ value: [] });
  const [selectedMentors, setSelectedMentors] = useState({ value: [] });
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

  const filteredUserEmails = useMemo(() => {
    return allUserEmails
      .map((item) => item.email)
      .filter(
        (item) => !selectedMentors?.value.includes(item) && !selectedMentees?.value.includes(item)
      );
  }, [allUserEmails, selectedMentors, selectedMentees]);

  /**
   * Check if the form is in editing state with required fields
   * @returns {boolean} true if editing, otherwise false
   */
  const isEditing = () => {
    return (
      groupName.value.length > 0 ||
      categoryName.value !== null ||
      selectedMentors.value.length > 0 ||
      selectedMentees.value.length > 0
    );
  };

  const handleClose = () => {
    if (isEditing()) {
      // Hiển thị cảnh báo khi thoát trạng thái chỉnh sửa
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          onClose();
        }
      });
      return;
    }

    onClose();
  };

  const handleGroupNameChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setGroupName({
        value: "",
        error: "Tên nhóm không được rỗng"
      });
      return;
    }

    setGroupName({
      value
    });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e, value) => {
    if (!value) {
      setCategoryName({
        value: null,
        error: "Vui lòng chọn ít nhất 1 giá trị"
      });
      return;
    }

    setCategoryName({
      value
    });
  };

  const handleImportEmails = (setEmails, callback) => {
    setEmails((prev) => {
      return {
        value: callback(prev.value)
      };
    });
  };

  /**
   * Validate form data to make sure it has required fields before submit
   * @returns {boolean} isValid - true if valid, otherwise false
   */
  const validateFormData = () => {
    let isValid = true;

    // Required group name
    if (groupName.value.length === 0) {
      setGroupName({
        ...groupName,
        error: "Tên nhóm không được rỗng"
      });
      isValid = false;
    }

    // Required category
    if (categoryName.value === null) {
      setCategoryName({
        ...categoryName,
        error: "Vui lòng chọn ít nhất 1 giá trị"
      });
      isValid = false;
    }

    // Required mentors
    if (selectedMentees.value.length === 0) {
      setSelectedMentees({
        ...selectedMentees,
        error: "Vui lòng chọn ít nhất 1 giá trị"
      });
      isValid = false;
    }

    // Required mentees
    if (selectedMentors.value.length === 0) {
      setSelectedMentors({
        ...selectedMentors,
        error: "Vui lòng chọn ít nhất 1 giá trị"
      });
      isValid = false;
    }

    // Check start and end date
    isValid = isValid && startDate && endDate;

    return isValid;
  };

  /**
   * Normalize data before submit to server (trim string, match request schema,...)
   * @returns {object} normalizedData - normalized data to submit to server
   */
  const normalizeData = () => {
    const categoryID = categories?.filter((category) => category.name === categoryName.value)[0].id;
    return {
      name: groupName.value.toString().trim(),
      description: description.toString().trim(),
      groupCategory: categoryID,
      mentorEmails: selectedMentors.value,
      menteeEmails: selectedMentees.value,
      status: "ACTIVE",
      timeStart: startDate,
      timeEnd: endDate,
      createdDate: today
    };
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      return;
    }

    const normalizedData = normalizeData();

    // Recheck data before submit
    const checkData = groupsServices.checkRequestDataCreateGroup(normalizedData, fromToRange.value);
    if (!checkData.status) {
      ErrorAlert(checkData.message);
    }

    setLoading(appDispatch, true);

    try {
      await dispatch(addNewGroup(checkData.data)).unwrap();
      SuccessAlert("Thêm nhóm thành công");
      onClose();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(appDispatch, false);
  };

  return (
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
                value={groupName.value}
                onChange={handleGroupNameChange}
                inputProps={{ maxLength: 100 }}
                error={groupName.error}
                helperText={groupName.error ?? ""}
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
                value={categoryName.value}
                onChange={handleCategoryChange}
                sx={{ width: "70%", pl: "0!important", pt: "0!important" }}
                options={categories
                  ?.filter((item) => item.status === "ACTIVE")
                  .map((item) => item.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn loại nhóm"
                    error={categoryName.error}
                    helperText={categoryName.error ?? ""}
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
                <AutoCompleteEmailInput
                  key="mentor"
                  value={selectedMentors.value}
                  onChange={(emails) =>
                    setSelectedMentors({
                      value: emails
                    })
                  }
                  data={filteredUserEmails}
                  placeholder="Chọn mentor"
                  sx={{ width: "90%" }}
                  error={selectedMentors.error}
                  helperText={selectedMentors.error ?? ""}
                />
                <ImportEmailButton
                  setData={(callback) => handleImportEmails(setSelectedMentors, callback)}
                />
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
                <AutoCompleteEmailInput
                  key="mentee"
                  value={selectedMentees.value}
                  onChange={(emails) => setSelectedMentees({ value: emails })}
                  data={filteredUserEmails}
                  placeholder="Chọn mentee"
                  sx={{ width: "90%" }}
                  error={selectedMentees.error}
                  helperText={selectedMentees.error ?? ""}
                />
                <ImportEmailButton
                  setData={(callback) => handleImportEmails(setSelectedMentees, callback)}
                />
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
  );
}

AddNewGroupModal.defaultProps = {
  open: false,
  onClose: () => {}
};

AddNewGroupModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default AddNewGroupModal;
