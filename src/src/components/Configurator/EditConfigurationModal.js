import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

import { selectConfiguration } from "redux/configuration/selector";
import {
  updateDomainConfiguration,
  updateMaxLearningYearConfiguration
} from "redux/configuration/slice";

/**
 * EditConfigurationModal
 * @description
 * Edit configuration modal component for admin to edit school year and email domains in MentorUs
 * @param {boolean} open - open edit configuration modal
 * @param {function} onClose - close edit configuration modal callback
 * @returns {React.JSX.Element}
 */
function EditConfigurationModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const configuration = useSelector(selectConfiguration);

  const [maxLearningYear, setMaxLearningYear] = useState(configuration.maxLearningYear.value);
  const [maxLearningYearError, setMaxLearningYearError] = useState("");

  const [validEmailDomains, setValidEmailDomains] = useState(configuration.emailDomainsValid.value);
  const [emailDomain, setEmailDomain] = useState("");
  const [emailDomainError, setEmailDomainError] = useState("");

  // School year
  // -------------------------------------
  const handleMaxLearningYearChange = (e) => {
    const { value } = e.target;
    // 2 digits only
    if (value.length <= 2) {
      setMaxLearningYear(parseInt(value, 10));
    }
  };

  useEffect(() => {
    if (!maxLearningYear) {
      setMaxLearningYearError("Khoảng thời gian không được rỗng");
      setMaxLearningYear("");
      return;
    }

    setMaxLearningYearError("");
  }, [maxLearningYear]);
  // -------------------------------------

  // Email domains
  // -------------------------------------
  const handleNewDomainEmailChange = (e) => {
    const { value } = e.target;
    setEmailDomain(value);
    setEmailDomainError("");
  };

  useEffect(() => {
    setEmailDomainError("");
  }, [validEmailDomains]);

  /**
   * Handle when user click delete domain button
   * @description
   * Delete domain email from validEmailDomains.
   *
   * If has only 1 domain email left, set emailDomainError to "Phải có ít nhất 1 domain email đang hoạt động", not delete
   * @param {number} index - index of domain email in validEmailDomains
   * @returns {void}
   */
  const handleDeleteDomain = (index) => {
    if (index === 0) {
      setEmailDomainError("Phải có ít nhất 1 domain email đang hoạt động");
      return;
    }

    setValidEmailDomains((oldVal) => {
      const newVal = [...oldVal];
      newVal.splice(index, 1);
      return newVal;
    });
  };

  /**
   * Handle when user click add domain button
   * @description
   * Add new domain email to validEmailDomains.
   *
   * If emailDomain is empty, set emailDomainError to "Domain email không được rỗng"
   * If emailDomain is already in validEmailDomains, set emailDomainError to "Domain email đã tồn tại"
   * @returns {void}
   */
  const handleAddDomain = () => {
    if (!emailDomain) {
      setEmailDomainError("Domain email không được rỗng");
      return;
    }

    if (validEmailDomains.includes(emailDomain)) {
      setEmailDomainError("Domain email đã tồn tại");
      return;
    }

    setValidEmailDomains((oldVal) => {
      return [...oldVal, emailDomain];
    });
    setEmailDomain("");
  };

  // -------------------------------------
  const isMaxLearningYearEdit = () => {
    return parseInt(maxLearningYear, 10) !== configuration.maxLearningYear.value;
  };

  const isEmailDomainEdit = () =>
    !isEqual(validEmailDomains, configuration.emailDomainsValid.value);

  const handleClose = () => {
    // Ask user if they want to close without saving
    if (isMaxLearningYearEdit() || isEmailDomainEdit()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          onClose();
        }
      });
      return;
    }

    onClose();
  };

  const isValidData = () => {
    if (maxLearningYearError || emailDomainError) return false;

    if (maxLearningYear <= 0 || maxLearningYear >= 100) {
      setMaxLearningYearError("Thời gian học tối đa phải lớn hơn 0 và nhỏ hơn 100!");
      return false;
    }

    if (validEmailDomains.length === 0) {
      setEmailDomainError("Vui lòng nhập ít nhất 1 domain email");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate data
    if (!isValidData()) {
      return;
    }

    // Update configuration
    setLoading(dispatchContext, true);

    try {
      if (isEmailDomainEdit()) {
        await dispatch(
          updateDomainConfiguration({
            id: configuration.emailDomainsValid.id,
            req: validEmailDomains
          })
        ).unwrap();
      }

      if (isMaxLearningYearEdit()) {
        await dispatch(
          updateMaxLearningYearConfiguration({
            id: configuration.maxLearningYear.id,
            req: maxLearningYear
          })
        ).unwrap();
      }
      SuccessAlert("Chỉnh sửa cấu hình thành công");
      onClose();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    } finally {
      setLoading(dispatchContext, false);
    }
  };

  const isDisabledConfirmButton = () => {
    // Disable confirm button when:
    // - data is not valid
    // - data is not changed
    return !isValidData() || (!isMaxLearningYearEdit() && !isEmailDomainEdit());
  };

  // -------------------------------------
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
        <Box className="group-modal__container">
          <Typography variant="h5" component="h2" textAlign="center" fontSize="25">
            Cập nhật thông tin cấu hình
          </Typography>
          <Divider />
          <MDBox mt={3} mb={2}>
            <MDBox className="relationship__searchBox-item" mb={2}>
              <MDTypography
                variant="body2"
                fontWeight="regular"
                color="dark"
                sx={{ mr: 2, width: "40%", fontSize: "14px" }}
              >
                Các domain hợp lệ <span style={{ color: "red" }}>(*)</span>
              </MDTypography>
              <MDBox sx={{ width: "70%" }}>
                {validEmailDomains.length > 0 &&
                  validEmailDomains.map((item, index) => (
                    <MDBox key={item} className="configuration__email-item">
                      <MDInput
                        placeholder="Nhập phần đuôi email"
                        size="small"
                        sx={{ width: "80%" }}
                        readOnly
                        disabled
                        value={item || ""}
                      />
                      <IconButton size="medium" onClick={() => handleDeleteDomain(index)}>
                        <Icon fontSize="inherit">close</Icon>
                      </IconButton>
                    </MDBox>
                  ))}
                <MDBox className="configuration__email-item">
                  <MDInput
                    placeholder="Nhập domain email mới"
                    size="small"
                    sx={{ width: "80%" }}
                    value={emailDomain}
                    onChange={handleNewDomainEmailChange}
                    error={Boolean(emailDomainError)}
                    helperText={emailDomainError}
                  />
                  <TooltipCustom title="Thêm mới một domain email">
                    <IconButton size="medium" onClick={handleAddDomain}>
                      <Icon fontSize="inherit">add</Icon>
                    </IconButton>
                  </TooltipCustom>
                </MDBox>
              </MDBox>
            </MDBox>
            <Divider />
            <MDBox className="relationship__searchBox-item" mb={2}>
              <MDBox
                sx={{ width: "40%" }}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                mr={2}
              >
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ fontSize: "14px" }}
                >
                  Khoảng thời gian tối đa <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDTypography variant="caption" color="dark">
                  Đơn vị: <b>năm</b>
                </MDTypography>
              </MDBox>
              <MDInput
                type="number"
                placeholder="Nhập thời gian"
                size="small"
                sx={{ width: "70%" }}
                value={maxLearningYear}
                onChange={handleMaxLearningYearChange}
                inputProps={{ maxLength: 2 }}
                error={Boolean(maxLearningYearError)}
                helperText={maxLearningYearError}
              />
            </MDBox>
          </MDBox>
          <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
            <MDButton
              disabled={isDisabledConfirmButton()}
              onClick={handleSubmit}
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
        </Box>
      </Fade>
    </Modal>
  );
}

EditConfigurationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditConfigurationModal;
