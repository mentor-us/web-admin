/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// import { NavLink } from "react-router-dom";
// import MDTypography from "components/MDComponents/MDTypography";
// import MDBox from "components/MDComponents/MDBox";
import { groupCheckboxAllChange, groupCheckboxSingleChange } from "features/groups/slice";

import { compareDate, compareVietnameseWord } from "utils";

import CustomCheckbox from "components/Checkbox";
import { groupStatusList } from "utils/constants";
import { formatDate, formatDateFromDuration } from "utils/formatDate";

import MenuOption from "../components/MenuOption";

export default function groupTableData(
  allCategories,
  data,
  isSelectAll,
  currentPage,
  itemsPerPage,
  columnHeaders
) {
  const groupCategoryName = (id) => {
    return allCategories && allCategories.length !== 0
      ? allCategories?.find((item) => item.id === id)?.name
      : "";
  };
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
      align: "left"
    },
    {
      Header: "Loại nhóm",
      accessor: "groupCategory",
      type: "normal",
      sortType: compareVietnameseWord,
      notSorted: false,
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
      Header: "Thời gian bắt đầu",
      accessor: "timeStart",
      notSorted: false,
      sortType: compareDate,
      type: "normal",
      align: "center"
    },
    {
      Header: "Thời gian kết thúc",
      accessor: "timeEnd",
      notSorted: false,
      type: "normal",
      sortType: compareDate,
      align: "center"
    },
    {
      Header: "Thời hạn",
      accessor: "duration",
      notSorted: true,
      type: "normal",
      align: "center"
    },
    {
      Header: (
        <CustomCheckbox
          data={isSelectAll}
          key="group-management"
          type="all"
          action={groupCheckboxAllChange}
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
      notSorted: true,
      width: "5%",
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
    data.length === 0
      ? []
      : data?.map((item, index) => {
          const status = data && groupStatusList.find((i) => i.textValue === item.status);
          const numberOrder = itemsPerPage * (currentPage - 1) + index + 1;
          return {
            no: numberOrder,
            href: `/admin/groups/group-detail/${item.id}`,
            name: item.name,
            groupCategory: groupCategoryName(item.groupCategory),
            status: status.label,
            statusColor: status.color,
            timeStart: formatDate(item.timeStart),
            timeEnd: formatDate(item.timeEnd),
            duration: formatDateFromDuration(item.duration),
            "is-checked":
              status.textValue !== "DELETED" ? (
                <CustomCheckbox
                  key={item.id}
                  data={item}
                  type="single"
                  prop="isChecked"
                  action={groupCheckboxSingleChange}
                />
              ) : null,
            action: <MenuOption data={item} />
          };
        });

  return { columns, rows };
}
