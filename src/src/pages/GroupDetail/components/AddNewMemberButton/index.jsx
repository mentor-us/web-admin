import { useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import { getAccountsTableSelector } from "redux/accounts/selector";

import AddNewMemberModal from "../Modal/AddNewMemberModal";

/**
 * AddNewMemberButton
 * @description
 * This component will render a button to add new member to the group
 * @param {number} type - type of member (mentee or mentor)
 * @param {Object[]} currentMembers - all current members of the group
 * @returns
 */
function AddNewMemberButton({ type, currentMembers }) {
  const [open, setOpen] = useState(false);
  const users = useSelector(getAccountsTableSelector);

  const getMembersEmail = () => {
    return currentMembers.map((member) => member.email);
  };

  /**
   * Get available emails to add
   * @description
   * This function will filter out emails that already in the group
   * @returns {string[]} - List of available emails
   */
  const getAvailableEmails = () => {
    const currentEmails = getMembersEmail();
    return users?.map((user) => user.email).filter((email) => !currentEmails.includes(email));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// --------------------------------------------------------
  return (
    <>
      <MDButton sx={{ mr: 1 }} onClick={handleOpen} variant="gradient" color="success">
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Thêm
        </MDTypography>
      </MDButton>
      {open && (
        <AddNewMemberModal
          type={type}
          open={open}
          onClose={handleClose}
          options={getAvailableEmails()}
          memberEmails={getMembersEmail()}
        />
      )}
    </>
  );
}

AddNewMemberButton.propTypes = {
  type: PropTypes.number.isRequired,
  currentMembers: PropTypes.instanceOf(Array).isRequired
};

export default AddNewMemberButton;
