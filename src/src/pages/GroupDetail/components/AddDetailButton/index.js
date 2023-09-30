/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import AutoCompleteInput from "components/AutoComplete/AutoCompleteInput";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { roleMemberEnum } from "utils/constants";

import { getAccountsTableSelector } from "redux/accounts/selector";
import { addMember } from "redux/groupDetail/slice";

import ImportEmailButton from "../ImportEmailButton";

function AddDetailButton({ type, data }) {
  /// --------------------- Khai báo Biến, State -------------

  const { id } = useParams();
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [firstLoad, setFirstLoad] = useState({
    emails: true
  });
  const allUser = useSelector(getAccountsTableSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const formatArray = (array, typeArray = "normal") => {
    if (typeArray !== "normal")
      return array?.map((item) => {
        const itemObject = {};
        itemObject.email = item.email;

        return itemObject;
      });

    return array?.map((item) => item.email);
  };

  const getAnotherEmails = (emailList) => {
    const currentEmails = formatArray([...data]);
    const allEmails = formatArray(emailList, "object");
    const newEmails = allEmails?.filter((item) => !currentEmails.includes(item.email));

    return newEmails;
  };
  const isLostAllData = () => {
    if (emails.length > 0) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          setEmails([]);
          setFirstLoad({
            emails: true
          });
        }
      });
    } else {
      setOpen(false);
      setFirstLoad({
        emails: true
      });
    }
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event --------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleSubmit = async () => {
    if (firstLoad.emails || emails.length === 0) {
      setFirstLoad({
        emails: false
      });
      return;
    }
    const emailsConvert = emails.map((item) => item.email);
    setLoading(dispatchContext, true);

    try {
      await dispatch(addMember({ id, req: { emails: emailsConvert }, type })).unwrap();
      SuccessAlert("Thêm thành viên thành công");
      setOpen(false);
      setEmails([]);
      setFirstLoad({
        emails: true
      });
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------

  return (
    <>
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
                <AutoCompleteInput
                  value={emails}
                  event={setEmails}
                  placeholder={type === roleMemberEnum.mentee ? "Chọn mentee" : "Chọn mentor"}
                  data={getAnotherEmails(allUser) || []}
                  styleCSS={{ width: "65%" }}
                  checkValid={{
                    isFirst: firstLoad,
                    setIsFirst: setFirstLoad,
                    checkName: "emails"
                  }}
                  // nputChange={handleUserDataChange}
                />
                <ImportEmailButton setData={setEmails} />
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

AddDetailButton.propTypes = {
  type: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array).isRequired
};

export default AddDetailButton;
