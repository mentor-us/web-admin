/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {
  categoryCheckboxAllChange,
  categoryCheckboxSingleChange
} from "features/groupsCategory/slice";

import { compareVietnameseWord, getImageUrlWithKey } from "utils";

import CustomCheckbox from "components/Checkbox";
import { groupCategoryStatusList } from "utils/constants";

import MenuOption from "../components/MenuOption";

export default function categoryTableData(
  data,
  isSelectAll,
  currentPage,
  itemsPerPage,
  isSearch,
  columnHeaders
) {
  let columns = [
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
      width: "2%",
      notSorted: true,
      type: "component",
      isShow: true,
      align: "center"
    },
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
      Header: "Loại nhóm",
      accessor: "name",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      width: "250px",
      align: "left"
    },
    {
      Header: "Mô tả",
      accessor: "description",
      notSorted: true,
      type: "normal",
      width: "450px",
      align: "left"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      width: "150px",
      notSorted: false,
      sortType: compareVietnameseWord,
      type: "status",
      align: "left"
    },
    {
      Header: "Biểu tượng",
      accessor: "iconUrl",
      notSorted: true,
      width: "100px",
      type: "icon",
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
    data === null
      ? []
      : data.map((item, index) => {
          const numberOrder = isSearch ? itemsPerPage * (currentPage - 1) + index + 1 : index + 1;
          const status = data && groupCategoryStatusList.find((i) => i.textValue === item.status);

          return {
            no: numberOrder,
            name: item.name,
            description: item.description,
            iconUrl: getImageUrlWithKey(item.iconUrl),
            status: status.label,
            statusColor: status.color,
            "is-checked":
              status.textValue !== "DELETED" ? (
                <CustomCheckbox
                  key={item.id}
                  data={item}
                  type="single"
                  prop="isChecked"
                  action={categoryCheckboxSingleChange}
                />
              ) : null,
            action: <MenuOption data={item} />
          };
        });

  return {
    columns,
    rows
  };
}
