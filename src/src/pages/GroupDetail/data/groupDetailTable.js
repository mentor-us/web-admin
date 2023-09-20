/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// import { NavLink } from "react-router-dom";
// import MDTypography from "components/MDComponents/MDTypography";

import { compareVietnameseWord } from "utils";
import MenuOption from "../components/MenuOption";

export default function groupDetailTable(type, data, columnHeaders, isDeleted) {
  let columns = [
    {
      Header: "STT",
      accessor: "no",
      width: "15px",
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
      align: "center"
    },
    {
      Header: "Họ tên",
      accessor: "name",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      align: "center"
    },
    {
      Header: "",
      accessor: "action",
      width: "10%",
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
      : data.map((value, index) => {
          const numberOrder = index + 1;

          return {
            no: numberOrder,
            href: `/account-management/account-detail/${value.id}`,
            email: value.email,
            name: value.name,
            action: <MenuOption type={type} data={value} isDeleted={isDeleted} />
          };
        });

  return {
    columns,
    rows
  };
}
