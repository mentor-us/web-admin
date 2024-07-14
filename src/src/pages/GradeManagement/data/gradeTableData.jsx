/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// import { compareVietnameseWord } from "utils";

// import CustomCheckbox from "components/Checkbox";
// import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";
import MenuOption from "../components/MenuOption";

export default function gradeTableData(data, columnHeaders) {
  // const { setIsSelectAll, setIsChecked } = useSubjectManagementStore();
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
      Header: "Năm học",
      accessor: "yearName",
      notSorted: true,
      type: "normal",
      width: "70px",
      align: "left"
    },
    {
      Header: "Học kỳ",
      accessor: "semesterName",
      notSorted: true,
      type: "normal",
      width: "50px",
      align: "left"
    },
    {
      Header: "Mã môn",
      accessor: "courseCode",
      notSorted: true,
      type: "normal",
      // sortType: compareVietnameseWord,
      width: "100px",
      align: "left"
    },
    {
      Header: "Tên môn",
      accessor: "courseName",
      notSorted: true,
      type: "normal",
      // sortType: compareVietnameseWord,
      width: "100px",
      align: "left"
    },
    {
      Header: "Tên sinh viên",
      accessor: "studentName",
      notSorted: true,
      type: "normal",
      width: "150px",
      align: "left"
    },
    {
      Header: "Điểm",
      accessor: "score",
      notSorted: true,
      type: "normal",
      width: "100px",
      align: "left"
    },
    // {
    //   Header: (
    //     <CustomCheckbox
    //       data={isSelectAll}
    //       key="category-management"
    //       type="all"
    //       action={setIsSelectAll}
    //     />
    //   ),
    //   accessor: "is-checked",
    //   width: "5%",
    //   notSorted: true,
    //   type: "component",
    //   isShow: true,
    //   align: "center"
    // },
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
        return {
          no: numberOrder,
          yearName: item?.year ?? "",
          semesterName: item?.semester ?? "",
          courseCode: item?.courseCode ?? "",
          courseName: item?.courseName ?? "",
          studentName: item?.student?.name ?? "",
          score: item?.score ?? "",
          // "is-checked": (
          //   <CustomCheckbox
          //     key={item.code}
          //     data={item.isChecked ?? false}
          //     type={false}
          //     // prop="isChecked"
          //     action={(checked) => setIsChecked({ ...item, isChecked: checked })}
          //   />
          // ),
          action: <MenuOption data={item} />
        };
      });

  return {
    columns,
    rows
  };
}
