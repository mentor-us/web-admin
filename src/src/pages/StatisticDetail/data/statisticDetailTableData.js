/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// import { NavLink } from "react-router-dom";
// import MDTypography from "components/MDComponents/MDTypography";
import {
  getValueOfList,
  numberWithCommas,
  compareVietnameseWord,
  compareDate,
  compareNumber
} from "utils";
import { roleMemberList } from "utils/constants";
import { formatDate } from "utils/formatDate";
// import UpdateStatisticDetail from "../components/UpdateStatisticDetail";

// import CustomCheckbox from "components/Checkbox";

export default function statisticDetailTableData(data, columnHeaders) {
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
      sortType: compareVietnameseWord,
      align: "left"
    },
    {
      Header: "Họ tên",
      accessor: "name",
      notSorted: false,
      width: "200px",
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
      align: "center"
    },
    {
      Header: "Số tin nhắn",
      accessor: "totalMessages",
      notSorted: false,
      type: "normal",
      width: "180px",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Số công việc",
      accessor: "totalTasks",
      notSorted: false,
      type: "normal",
      width: "200px",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Số công việc hoàn thành",
      accessor: "totalDoneTasks",
      notSorted: false,
      type: "normal",
      width: "200px",
      sortType: compareNumber,
      align: "center"
    },
    {
      Header: "Số cuộc hẹn tham gia",
      accessor: "totalMeetings",
      notSorted: false,
      type: "normal",
      width: "180px",
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
    data === null
      ? []
      : data.map((item, index) => {
          const numberOrder = index + 1;

          return {
            no: numberOrder,
            href: `/account-management/account-detail/${item.id}`,
            email: item.email,
            name: item.name,
            role: getValueOfList(roleMemberList, item.role, "textValue", "role"),
            totalMessages: numberWithCommas(item.totalMessages),
            totalTasks: numberWithCommas(item.totalTasks),
            totalDoneTasks: numberWithCommas(item.totalDoneTasks),
            totalMeetings: numberWithCommas(item.totalMeetings),
            lastTimeActive: item.lastTimeActive ? formatDate(item.lastTimeActive) : ""
          };
        });

  return {
    columns,
    rows
  };
}
