/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// import { NavLink } from "react-router-dom";
// import MDBox from "components/MDComponents/MDBox";
// import MDTypography from "components/MDComponents/MDTypography";
import { compareDate, compareNumber, compareVietnameseWord, numberWithCommas } from "utils";

import { groupStatusList } from "utils/constants";
import { formatDate } from "utils/formatDate";

export default function statisticTableData(data, currentPage, itemsPerPage, columnHeaders) {
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
      accessor: "category",
      notSorted: false,
      type: "normal",
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      width: "150px",
      notSorted: false,
      type: "status",
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: "Tổng số mentee",
      accessor: "totalMentees",
      notSorted: false,
      type: "normal",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Tổng số mentor",
      accessor: "totalMentors",
      notSorted: false,
      type: "normal",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Tổng số tin nhắn",
      accessor: "totalMessages",
      notSorted: false,
      type: "normal",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Tổng số công việc",
      accessor: "totalTasks",
      notSorted: false,
      type: "normal",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Tổng số lịch hẹn",
      accessor: "totalMeetings",
      notSorted: false,
      type: "normal",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Lần hoạt động gần nhất",
      accessor: "lastTimeActive",
      width: "200px",
      type: "normal",
      sortType: compareDate,
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
    data.length === 0
      ? []
      : data?.map((item, index) => {
          const status = data && groupStatusList.find((i) => i.textValue === item.status);
          const numberOrder = itemsPerPage * (currentPage - 1) + index + 1;
          return {
            no: numberOrder,
            href: `/statistic/statistic-detail/${item.id}`,
            name: item.name,
            category: item.category,
            status: status.label,
            statusColor: status.color,
            totalMentees: numberWithCommas(item.totalMentees),
            totalMentors: numberWithCommas(item.totalMentors),
            totalMessages: numberWithCommas(item.totalMessages),
            totalTasks: numberWithCommas(item.totalTasks),
            totalMeetings: numberWithCommas(item.totalMeetings),
            lastTimeActive: item.lastTimeActive ? formatDate(item.lastTimeActive) : " "
          };
        });

  return {
    columns,
    rows
  };
}
