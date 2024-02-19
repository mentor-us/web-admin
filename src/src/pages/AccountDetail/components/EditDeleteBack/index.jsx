import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import DeleteButton from "pages/AccountManagement/components/EditDelete/components/DeleteButton";
import DisableAccountButton from "pages/AccountManagement/components/EditDelete/components/DisableAccountButton";
import EditAccountButton from "pages/AccountManagement/components/EditDelete/components/EditAccountButton";
import EnableAccountButton from "pages/AccountManagement/components/EditDelete/components/EnableAccountButton";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import TooltipCustom from "components/Tooltip";
import useMyInfo from "hooks/useMyInfo";

function EditDeleteBackBox({ data }) {
  const myInfo = useMyInfo();
  const isCurrentAccount = myInfo.id === data.id;
  const isNotAllow = myInfo.role === "ADMIN" && data.role === "SUPER_ADMIN";
  const navigate = useNavigate();

  const renderBlockButton = () => {
    if (isCurrentAccount) return null;

    if (data.status) {
      return (
        <MDBox mx={2}>
          <DisableAccountButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
        </MDBox>
      );
    }

    return (
      <MDBox mx={2}>
        <EnableAccountButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
      </MDBox>
    );
  };

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
                redirectURL="/admin/account-management"
              />
            </MDBox>
          )}
          {renderBlockButton()}
        </>
      )}
    </MDBox>
  );
}

EditDeleteBackBox.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default EditDeleteBackBox;
