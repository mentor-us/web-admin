/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// import { NavLink } from "react-router-dom";
// import MDTypography from "components/MDComponents/MDTypography";
// import MDBox from "components/MDComponents/MDBox";
import { accountCheckboxAllChange, accountCheckboxSingleChange } from "features/accounts/slice";

import { compareVietnameseWord, getValueOfList } from "utils";

import CustomCheckbox from "components/Checkbox";
import { accountStatusList, roleAccountList } from "utils/constants";

import EditDelete from "../components/EditDelete";

export default function accountTableData(
  data,
  isSelectAll,
  currentPage,
  itemsPerPage,
  columnHeaders
) {
  let columns = [
    {
      Header: "STT",
      accessor: "no",
      width: "20px",
      notSorted: true,
      type: "normal",
      isShow: true,
      align: "center"
    },
    {
      Header: "Email",
      accessor: "email",
      notSorted: false,
      type: "link",
      align: "left"
    },
    {
      Header: "Tên người dùng",
      accessor: "name",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: "Vai trò",
      accessor: "role",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      notSorted: false,
      type: "status",
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: (
        <CustomCheckbox
          data={isSelectAll}
          key="account-management"
          type="all"
          action={accountCheckboxAllChange}
        />
      ),
      accessor: "is-checked",
      width: "5%",
      type: "component",
      notSorted: true,
      isShow: true,
      align: "center"
    },
    {
      Header: "",
      accessor: "action",
      width: "5%",
      notSorted: true,
      type: "component",
      isShow: true,
      align: "center"
    }
  ];

  // map giữa column hiện tại với column trong redux
  columns = columns.map((item) => {
    const columnItem = columnHeaders.find((item1) => item1.textValue === item.accessor);

    return columnItem ? { ...columnItem, ...item } : item;
  });

  const rows =
    data === null || data === undefined
      ? []
      : data.map((item, index) => {
          const statusInfo = accountStatusList.find(
            (statusItem) => statusItem.value === item.status
          );

          const role = getValueOfList(roleAccountList, item.role, "textValue", "role");

          const numberOrder = itemsPerPage * (currentPage - 1) + index + 1; // sau này update theo totalPage

          return {
            no: numberOrder,
            href: `/admin/account-management/account-detail/${item.id}`,
            email: item.email,
            name: item.name,
            role,
            status: statusInfo.label,
            statusColor: statusInfo.color,
            "is-checked": (
              <CustomCheckbox
                key={item.id}
                data={item}
                type="single"
                prop="isChecked"
                action={accountCheckboxSingleChange}
              />
            ),
            action: <EditDelete data={item} />
          };
        });

  return {
    columns,
    rows
  };
}
