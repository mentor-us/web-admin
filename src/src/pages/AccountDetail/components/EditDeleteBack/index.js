import React from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TooltipCustom from "components/Tooltip";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import EditAccountButton from "pages/AccountManagement/components/EditDelete/components/EditAccountButton";
import DeleteButton from "pages/AccountManagement/components/EditDelete/components/DeleteButton";

import { getCurrentUserSelector } from "redux/currentUser/selector";
import DisableAccountButton from "pages/AccountManagement/components/EditDelete/components/DisableAccountButton";
import EnableAccountButton from "pages/AccountManagement/components/EditDelete/components/EnableAccountButton";

function EditDeleteBackBox({ data }) {
  /// --------------------- Khai báo Biến, State -------------
  const currentUser = useSelector(getCurrentUserSelector);
  const isCurrentAccount = currentUser.id === data.id;
  const isNotAllow = currentUser.role === "ADMIN" && data.role === "SUPER_ADMIN";
  const navigate = useNavigate();

  /// --------------------------------------------------------
  return (
    <MDBox display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>
      <MDBox mx={2}>
        <TooltipCustom title="Quay lại">
          <MDButton variant="outlined" color="dark" onClick={() => navigate(-1)} iconOnly circular>
            <Icon sx={{ fontWeight: "bold" }}>arrow_back</Icon>
          </MDButton>
        </TooltipCustom>
      </MDBox>
      {!isNotAllow && (
        <>
          <MDBox mx={2}>
            <EditAccountButton
              data={data}
              setState={(e) => e}
              typeButton="modern"
              isInDetail
              isCurrentAccount={isCurrentAccount}
            />
          </MDBox>
          {!isCurrentAccount && (
            <MDBox mx={2}>
              <DeleteButton
                data={data}
                setState={(e) => e}
                typeButton="modern"
                redirectURL="/account-management"
              />
            </MDBox>
          )}
          {!isCurrentAccount && data.status && (
            <MDBox mx={2}>
              <DisableAccountButton
                data={data}
                setState={(e) => e}
                typeButton="modern"
                isInDetail
              />
            </MDBox>
          )}
          {!isCurrentAccount && !data.status && (
            <MDBox mx={2}>
              <EnableAccountButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
            </MDBox>
          )}
        </>
      )}
    </MDBox>
  );
}

EditDeleteBackBox.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default EditDeleteBackBox;
