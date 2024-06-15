/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {
  categoryCheckboxAllChange,
  categoryCheckboxSingleChange
} from "features/groupsCategory/slice";

import { compareVietnameseWord } from "utils";

import CustomCheckbox from "components/Checkbox";

import MenuOption from "../components/MenuOption";

export default function subjectTableData(
  data,
  isSelectAll,
  currentPage,
  itemsPerPage,
  isSearch,
  columnHeaders
) {
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
      Header: "Mã môn",
      accessor: "code",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      width: "250px",
      align: "left"
    },
    {
      Header: "Tên môn",
      accessor: "name",
      notSorted: true,
      type: "normal",
      width: "200px",
      align: "left"
    },
    {
      Header: (
        <CustomCheckbox
          data={isSelectAll}
          key="category-management"
          type="all"
          action={categoryCheckboxAllChange}
        />
      ),
      accessor: "is-checked",
      width: "5%",
      notSorted: true,
      type: "component",
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

  const rows = !data
    ? []
    : data.map((item, index) => {
        console.log("item");
        console.log(item);
        const numberOrder = isSearch ? itemsPerPage * (currentPage - 1) + index + 1 : index + 1;

        return {
          no: numberOrder,
          name: item.name,
          code: item.name,
          "is-checked": (
            <CustomCheckbox
              key={item.id}
              data={item}
              type="single"
              prop="isChecked"
              action={categoryCheckboxSingleChange}
            />
          ),
          action: <MenuOption data={item} />
        };
      });

  return {
    columns,
    rows
  };
}
