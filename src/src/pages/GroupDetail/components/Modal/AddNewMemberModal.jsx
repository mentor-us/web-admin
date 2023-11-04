import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import { addMember } from "features/groupDetail/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import AutoCompleteEmailInput from "components/AutoComplete/AutoCompleteEmailInput";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { roleMemberEnum } from "utils/constants";

import ImportEmailButton from "../ImportEmailButton";
/**
 * AddNewMemberModal
 * @description
 * AddNewMemberModal is a component which popup a modal for admin to add members to a group.
 * @param {boolean} open - is modal open or not
 * @param {number} [type=roleMemberEnum.mentee] - type of member (mentee or mentor)
 * @param {function} onClose - callback when modal is closed
 * @param {string[]} options - list of available emails to add
 * @param {string[]} memberEmails - list of emails that already in the group
 * @returns {React.JSX.Element}
 */
function AddNewMemberModal({ type, onClose, open, options, memberEmails }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [selectedEmails, setSelectedEmails] = useState({ value: [] });

  const filteredOptions = useMemo(
    () => options.filter((opt) => !selectedEmails.value.includes(opt)),
    [options, selectedEmails.value]
  );

  const handleClose = () => {
    if (selectedEmails.value.length > 0) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          onClose();
        }
      });
      return;
    }

    onClose();
  };

  const handleImportEmails = (callback) => {
    setSelectedEmails((prev) => {
      // Remove duplicate emails
      const importedEmails = Array.from(new Set(callback(prev.value)));

      // Remove emails that already in the group
      const newEmails = importedEmails.filter((email) => !memberEmails.includes(email));
      return {
        value: newEmails,
        error:
          prev.value.length === newEmails.length
            ? "Tất cả Email nhập từ file đã tồn tại trong nhóm"
            : null
      };
    });
  };

  const validateData = (data) => {
    if (data.length === 0) {
      setSelectedEmails({
        value: data,
        error: "Vui lòng chọn ít nhất 1 email"
      });
      return false;
    }

    return true;
  };

  const handleSelectedEmailsChange = (emails) => {
    if (!validateData(emails)) return;

    setSelectedEmails({
      value: emails
    });
  };

  const handleSubmit = async () => {
    if (!validateData(selectedEmails.value)) return;

    setLoading(dispatchContext, true);
    try {
      await dispatch(addMember({ id, req: { emails: selectedEmails.value }, type })).unwrap();
      SuccessAlert("Thêm thành viên thành công");
      onClose();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    } finally {
      setLoading(dispatchContext, false);
    }
  };

  /// --------------------------------------------------------
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
        <Box className="group-modal__container" sx={{ width: "550px!important" }}>
          <Typography variant="h5" component="h2" textAlign="center" fontSize="25">
            Thêm {type === roleMemberEnum.mentee ? "Mentee" : "Mentor"}
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
                {type === roleMemberEnum.mentee ? "Email Mentee" : "Email Mentor"}{" "}
                <span style={{ color: "red" }}>(*)</span>
              </MDTypography>
              {type === roleMemberEnum.mentee ? (
                <AutoCompleteEmailInput
                  placeholder="Chọn mentee"
                  value={selectedEmails.value}
                  data={filteredOptions}
                  sx={{ width: "65%" }}
                  onChange={handleSelectedEmailsChange}
                  error={selectedEmails.error}
                  helperText={selectedEmails.error ?? ""}
                />
              ) : (
                <AutoCompleteEmailInput
                  placeholder="Chọn mentor"
                  value={selectedEmails.value}
                  data={filteredOptions}
                  sx={{ width: "65%" }}
                  onChange={handleSelectedEmailsChange}
                  error={selectedEmails.error}
                  helperText={selectedEmails.error ?? ""}
                />
              )}
              <ImportEmailButton setData={handleImportEmails} />
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

AddNewMemberModal.defaultProps = {
  type: roleMemberEnum.mentee
};

AddNewMemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.number,
  options: PropTypes.instanceOf(Array).isRequired,
  memberEmails: PropTypes.instanceOf(Array).isRequired
};

export default AddNewMemberModal;
