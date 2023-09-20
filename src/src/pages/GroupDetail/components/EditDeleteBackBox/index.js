import React from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import TooltipCustom from "components/Tooltip";
import MDBox from "components/MDComponents/MDBox";
import EditGroupButton from "pages/GroupManagement/components/EditGroupButton";
import DeleteGroupButton from "pages/GroupManagement/components/DeleteGroupButton";
import MDButton from "components/MDComponents/MDButton";
import DisableGroupButton from "pages/GroupManagement/components/DisableGroupButton/DisableGroupButton";
import EnableGroupButton from "pages/GroupManagement/components/EnableGroupButton/EnableGroupButton";

function EditDeleteBackBox({ data }) {
  const navigate = useNavigate();
  return (
    <MDBox display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>
      <MDBox mx={2}>
        <TooltipCustom title="Quay lại">
          <MDButton variant="outlined" color="dark" onClick={() => navigate(-1)} iconOnly circular>
            <Icon sx={{ fontWeight: "bold" }}>arrow_back</Icon>
          </MDButton>
        </TooltipCustom>
      </MDBox>
      {data.status !== "DELETED" && (
        <>
          <MDBox mx={2}>
            <EditGroupButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
          </MDBox>
          <MDBox mx={2}>
            <DeleteGroupButton
              data={data}
              setState={(e) => e}
              typeButton="modern"
              redirectURL="/groups"
            />
          </MDBox>
          {data.status !== "DISABLED" && (
            <MDBox mx={2}>
              <DisableGroupButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
            </MDBox>
          )}
          {data.status === "DISABLED" && (
            <MDBox mx={2}>
              <EnableGroupButton data={data} setState={(e) => e} typeButton="modern" isInDetail />
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
