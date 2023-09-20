import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { getAccountCheckedSelector } from "redux/accounts/selector";
import { getGroupsCheckedSelector } from "redux/groups/selector";
import { getGroupsCategoryCheckedSelector } from "redux/groupsCategory/selector";
import DeleteButton from "pages/AccountManagement/components/EditDelete/components/DeleteButton";
import EnableAccountButton from "pages/AccountManagement/components/EditDelete/components/EnableAccountButton";
import DisableAccountButton from "pages/AccountManagement/components/EditDelete/components/DisableAccountButton";
import MDBox from "components/MDComponents/MDBox";
import DeleteGroupButton from "pages/GroupManagement/components/DeleteGroupButton";
import DeleteCategoryButton from "pages/GroupCategoryManagement/components/DeleteCategoryButton";
import EnableGroupButton from "pages/GroupManagement/components/EnableGroupButton/EnableGroupButton";
import DisableGroupButton from "pages/GroupManagement/components/DisableGroupButton/DisableGroupButton";

function SelectAllFeature(type) {
  const myState = useSelector((state) => state);

  const checkIsAllDisabledGroup = (checkedGroups) => {
    const filter = checkedGroups.filter((item) => item.status === "DISABLED");
    if (checkedGroups.length !== 0 && filter.length === checkedGroups.length) {
      return true;
    }
    return false;
  };

  const checkIsAllEnabledGroup = (checkedGroups) => {
    const filter = checkedGroups.filter((item) => item.status !== "DISABLED");
    if (checkedGroups.length !== 0 && filter.length === checkedGroups.length) {
      return true;
    }
    return false;
  };
  const checkIsAllDisabledAccount = (checkedGroups) => {
    const filter = checkedGroups.filter((item) => item.status === false);
    if (checkedGroups.length !== 0 && filter.length === checkedGroups.length) {
      return true;
    }
    return false;
  };

  const checkIsAllEnabledAccount = (checkedGroups) => {
    const filter = checkedGroups.filter((item) => item.status === true);
    if (checkedGroups.length !== 0 && filter.length === checkedGroups.length) {
      return true;
    }
    return false;
  };
  const renderComboButton = () => {
    let component = <div />;

    switch (type.type) {
      case "groups": {
        const checkedGroups = getGroupsCheckedSelector(myState);

        if (checkedGroups.length > 0) {
          let enableButton = null;
          let disableButton = null;
          if (checkIsAllDisabledGroup(checkedGroups)) {
            enableButton = (
              <MDBox sx={{ mx: 0.5 }}>
                <EnableGroupButton
                  data={checkedGroups.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          } else if (checkIsAllEnabledGroup(checkedGroups)) {
            disableButton = (
              <MDBox sx={{ ml: 0.5, mr: 1 }}>
                <DisableGroupButton
                  data={checkedGroups.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          } else {
            enableButton = (
              <MDBox sx={{ mx: 0.5 }}>
                <EnableGroupButton
                  data={checkedGroups.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
            disableButton = (
              <MDBox sx={{ ml: 0.5, mr: 1 }}>
                <DisableGroupButton
                  data={checkedGroups.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          }
          component = (
            <MDBox display="flex" justifyContent="center" alignItems="center">
              <MDBox sx={{ mx: 1 }}>
                <DeleteGroupButton
                  data={checkedGroups}
                  setState={(e) => e}
                  typeButton="normal"
                  isMultiple
                />
              </MDBox>
              {enableButton}
              {disableButton}
            </MDBox>
          );
        }
        break;
      }
      case "group-detail":
        break;
      case "group-category": {
        const checkedCategories = getGroupsCategoryCheckedSelector(myState);

        if (checkedCategories.length > 0) {
          component = (
            <MDBox display="flex" justifyContent="center" alignItems="center">
              <MDBox sx={{ mx: 1 }}>
                <DeleteCategoryButton
                  data={checkedCategories}
                  setState={(e) => e}
                  typeButton="normal"
                  isMultiple
                />
              </MDBox>
            </MDBox>
          );
        }
        break;
      }
      case "account-management": {
        const checkedAccounts = getAccountCheckedSelector(myState);

        if (checkedAccounts.length > 0) {
          let enableButton = null;
          let disableButton = null;
          if (checkIsAllDisabledAccount(checkedAccounts)) {
            enableButton = (
              <MDBox sx={{ mx: 0.5 }}>
                <EnableAccountButton
                  data={checkedAccounts.filter((item) => !item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          } else if (checkIsAllEnabledAccount(checkedAccounts)) {
            disableButton = (
              <MDBox sx={{ ml: 0.5, mr: 1 }}>
                <DisableAccountButton
                  data={checkedAccounts.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          } else {
            enableButton = (
              <MDBox sx={{ mx: 0.5 }}>
                <EnableAccountButton
                  data={checkedAccounts.filter((item) => !item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
            disableButton = (
              <MDBox sx={{ ml: 0.5, mr: 1 }}>
                <DisableAccountButton
                  data={checkedAccounts.filter((item) => item.status)}
                  setState={(e) => e}
                  isMultiple
                  typeButton="normal"
                />
              </MDBox>
            );
          }
          component = (
            <MDBox display="flex" justifyContent="center" alignItems="center">
              <MDBox sx={{ mx: 0.5 }}>
                <DeleteButton
                  data={checkedAccounts}
                  setState={(e) => e}
                  typeButton="normal"
                  isMultiple
                />
              </MDBox>

              {enableButton}
              {disableButton}
            </MDBox>
          );
        }
        break;
      }
      case "account-detail":
        break;
      default:
        break;
    }

    return component;
  };

  return renderComboButton();
}

SelectAllFeature.defaultProps = {
  type: "none"
};

SelectAllFeature.propTypes = {
  type: PropTypes.oneOf([
    "groups",
    "group-detail",
    "group-category",
    "account-management",
    "account-detail",
    "none"
  ])
};
export default SelectAllFeature;
