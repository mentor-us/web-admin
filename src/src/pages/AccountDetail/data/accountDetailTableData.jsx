/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// import { NavLink } from "react-router-dom";
// import MDTypography from "components/MDComponents/MDTypography";
// import MenuOption from "../components/MenuOption";\
import { compareVietnameseWord } from "utils";

export default function accountDetailTableData(data, columnHeaders) {
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
      Header: "Tên nhóm",
      accessor: "name",
      notSorted: false,
      type: "link",
      sortType: compareVietnameseWord,
      width: "40%",
      align: "center"
    },
    {
      Header: "Loại nhóm",
      accessor: "groupCategory",
      type: "normal",
      sortType: compareVietnameseWord,
      notSorted: false,
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
            href: `/groups/group-detail/${value.id}`,
            name: value.name,
            groupCategory: value.groupCategory
          };
        });

  return {
    columns,
    rows
  };
}
