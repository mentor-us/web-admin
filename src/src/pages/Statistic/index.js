/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import { getGeneral, getByMonth, resetState } from "redux/statistic/slice";
import { getStatisticFilterValueSelector } from "redux/statistic/selector";

import StatisticNumberAndChart from "./components/StatisticNumberAndChart";
import StatisticTable from "./components/StatisticTable";
import FilterBox from "./components/FilterBox/filterBox";

function Statistic() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();

  const filterValue = useSelector(getStatisticFilterValueSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  // function to get general data
  const getGeneralData = () => {
    if (filterValue !== "") {
      dispatch(
        getGeneral({
          groupCategoryId: filterValue // get by filter value (group category id)
        })
      );
    } else {
      dispatch(getGeneral("")); // get all
    }
  };

  useEffect(() => {
    getGeneralData();
  }, [filterValue]);

  // Reset all state when dispatch
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1}>
        <FilterBox />
        <StatisticNumberAndChart />
        <StatisticTable />
      </MDBox>
    </DashboardLayout>
  );
}

export default Statistic;
