/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// import {
//   // categoryCheckboxAllChange,
//   categoryCheckboxSingleChange
// } from "features/groupsCategory/slice";

import { compareVietnameseWord } from "utils";

import CustomCheckbox from "components/Checkbox";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";

import MenuOption from "../components/MenuOption";

export default function subjectTableData(
  data,
  isSelectAll,
  currentPage,
  itemsPerPage,
  isSearch,
  columnHeaders
) {
  const { setIsSelectAll, setIsChecked } = useSubjectManagementStore();
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
          action={setIsSelectAll}
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
        const numberOrder = index + 1;
        // const isChecked = isSelectAll ? true : item.isChecked ?? false;
        // item.isChecked = isChecked;
        return {
          no: numberOrder,
          name: item.name,
          code: item.name,
          "is-checked": (
            <CustomCheckbox
              key={item.code}
              data={item.isChecked ?? false}
              type={false}
              // prop="isChecked"
              action={(checked) => setIsChecked({ ...item, isChecked: checked })}
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
