/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  Autocomplete,
  createTheme,
  Skeleton,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { debounce } from "lodash";
// eslint-disable-next-line no-unused-vars
import { isNumber } from "utils";

import MDInput from "components/MDComponents/MDInput";
// import {
//   useCreateGradeMutation,
//   useDeleteGradeMutation,
//   useUpdateGradeMutation
// } from "hooks/grades/mutation";
// eslint-disable-next-line no-unused-vars
import { getAllSemesterOfYear, useGetAllGrades, useGetAllYears } from "hooks/grades/queries";
import useMyInfo from "hooks/useMyInfo";

import GradeItem from "./GradeItem";
import "./index.css";

// const gradeExample = {
//   id: null,
//   name: null,
//   score: 0,
//   verified: false
// };

const initState = {
  year: null,
  yearInfo: "",
  semester: null,
  semesterInfo: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_YEAR_INFO":
      return { ...state, yearInfo: action.payload };
    case "SET_SEMESTER":
      return { ...state, semester: action.payload };
    case "SET_SEMESTER_INFO":
      return { ...state, semesterInfo: action.payload };
    default:
      return state;
  }
}
function GradeBoard(props) {
  const { isEditable, user = {} } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const [debounceSemester, setDebounceSemester] = useState("");
  const { year, yearInfo, semester } = state;
  const myInfo = useMyInfo();
  const {
    data: years,
    isLoading: isLoadingDefaultYear,
    isSuccess: loadYearSuccess
  } = useGetAllYears(yearInfo.trim());
  // const { data: semesters } = getAllSemesterOfYear(semesterInfo.trim());
  const { data: grades, isFetching: isLoadingGrade } = useGetAllGrades({
    userId: isEditable ? myInfo?.id : user?.id ?? null,
    year: year?.name ?? null,
    semester: debounceSemester ?? null,
    pageSize: 25,
    page: 0
  });
  const queryClient = useQueryClient();

  // const createGradeMutator = useCreateGradeMutation(year, semester);
  // const updateGradeMutator = useUpdateGradeMutation(year, semester);
  // const deleteGradeMutator = useDeleteGradeMutation(year, semester);
  const debouncedSetSemester = useCallback(
    debounce((newValue) => {
      setDebounceSemester(newValue);
    }, 500),
    []
  );
  useEffect(() => {
    debouncedSetSemester(semester);
  }, [semester]);
  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            fontSize: "1rem"
          },
          popper: {
            fontSize: "1rem"
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: "1rem"
          }
        }
      }
    }
  });
  useEffect(() => {
    if (!year && loadYearSuccess) {
      dispatch({ type: "SET_YEAR", payload: years[0] });
    }
  }, [loadYearSuccess]);

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ["grades"]
    });
  }, [year, debounceSemester]);
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col gap-y-2">
        <Typography variant="h5" component="div" fontWeight="bold">
          Bảng Điểm
        </Typography>
        <div className="form-group">
          <Typography variant="strong" component="div">
            Năm học:
          </Typography>
        </div>
        <div>
          <Autocomplete
            noOptionsText={
              isLoadingDefaultYear ? "Đang lấy thông tin năm học" : "Không có thông tin năm học"
            }
            value={year}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, newValue) => {
              if (!newValue) {
                dispatch({ type: "SET_SEMESTER", payload: "" });
                // debouncedSetSemester("");
              }
              dispatch({ type: "SET_YEAR", payload: newValue });
            }}
            onInputChange={(event, value) => {
              dispatch({ type: "SET_YEAR_INFO", payload: value });
            }}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            // eslint-disable-next-line no-shadow
            options={years ?? []}
            getOptionLabel={(option) => option?.name || ""}
            renderOption={(propsEl, option) => {
              return (
                <li {...propsEl} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} placeholder="Chọn năm" size="small" />}
          />
        </div>
        <div className="form-group">
          <Typography variant="strong" component="div">
            Học kỳ:
          </Typography>
        </div>
        <div>
          <TextField
            placeholder="Nhập học kỳ"
            variant="outlined"
            type="number"
            size="small"
            // type="number"
            value={year ? semester : ""}
            InputLabelProps={{
              shrink: true
            }}
            disabled={!year}
            sx={{
              width: "100%"
            }}
            onChange={(e) => {
              // debouncedSetSemester(e.target.value);
              dispatch({ type: "SET_SEMESTER", payload: e.target.value });
            }}
            error={semester && !isNumber(semester)}
            // helperText={
            //   // eslint-disable-next-line no-nested-ternary
            //   !isNumber(semester) ? "Học kỳ phải là số" : ""
            // }
          />
          {/* <Autocomplete
            noOptionsText="Không có thông tin học kì"
            value={semester}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, newValue) => {
              dispatch({ type: "SET_SEMESTER", payload: newValue });
            }}
            onInputChange={(event, value) => {
              dispatch({ type: "SET_SEMESTER_INFO", payload: value });
            }}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            options={semesters ?? []}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn học kì" size="small" />
            )}
          /> */}
        </div>
        <div className="flex flex-col gap-y-4 mt-3">
          {isLoadingGrade && (
            <div className="flex flex-row justify-center">
              <Skeleton variant="rectangular" width="100%" height={60} />
            </div>
          )}
          {grades && !isLoadingGrade && !grades.totalCounts && (
            <div className="flex flex-row justify-center">Không có thông tin điểm số</div>
          )}
          {grades?.data &&
            !isLoadingGrade &&
            [...grades.data].map((grade, idx) => {
              return (
                <GradeItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={`grade-item-${idx}`}
                  item={{ ...grade, index: idx }}
                  isEditable={isEditable}
                />
              );
            })}
        </div>
      </div>
    </ThemeProvider>
  );
}
GradeBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isEditable: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};
export default GradeBoard;
