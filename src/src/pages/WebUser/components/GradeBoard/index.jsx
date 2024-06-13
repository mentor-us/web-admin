import React, { useEffect, useReducer } from "react";
import {
  Autocomplete,
  Button,
  createTheme,
  Skeleton,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import {
  useCreateGradeMutation,
  useDeleteGradeMutation,
  useUpdateGradeMutation
} from "hooks/grades/mutation";
import { getAllSemesterOfYear, useGetAllGrades, useGetAllYears } from "hooks/grades/queries";
import useMyInfo from "hooks/useMyInfo";

import GradeItem from "./GradeItem";
import "./index.css";

const gradeExample = {
  id: null,
  name: null,
  score: 0,
  verified: false
};

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
  const { isEditable } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const { year, yearInfo, semester, semesterInfo } = state;
  const myInfo = useMyInfo();
  const {
    data: years,
    isLoading: isLoadingDefaultYear,
    isSuccess: loadYearSuccess
  } = useGetAllYears(yearInfo);
  const { data: semesters } = getAllSemesterOfYear(semesterInfo);
  const { data: grades } = useGetAllGrades(year, semester, myInfo.id);
  const createGradeMutator = useCreateGradeMutation(year, semester);
  const updateGradeMutator = useUpdateGradeMutation(year, semester);
  const deleteGradeMutator = useDeleteGradeMutation(year, semester);

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
  const handleAddGrade = () => {
    createGradeMutator.mutate({ ...gradeExample, year, semester });
  };
  const handleDeleteGrade = (item) => {
    deleteGradeMutator.mutate(item.id);
  };
  const handelSubmitGrade = (item) => {
    console.log("handelSubmitGrade");
    console.log(year, semester);
    if (item.id) {
      updateGradeMutator.mutate(item);
    } else {
      createGradeMutator.mutate({ ...item, year, semester });
    }
  };
  useEffect(() => {
    if (loadYearSuccess) {
      dispatch({ type: "SET_YEAR", payload: years[0] });
    }
  }, [loadYearSuccess]);
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
            noOptionsText="Không có thông tin năm học"
            value={year}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, newValue) => {
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
            disableClearable
            // eslint-disable-next-line no-shadow
            options={years ?? []}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => <TextField {...params} placeholder="Chọn năm" size="small" />}
          />
        </div>
        <div className="form-group">
          <Typography variant="strong" component="div">
            Học kỳ:
          </Typography>
        </div>
        <div>
          <Autocomplete
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
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-3">
          {isLoadingDefaultYear && (
            <div className="flex flex-row justify-center">
              <Skeleton variant="rectangular" width="100%" height={60} />
            </div>
          )}
          {grades &&
            !isLoadingDefaultYear &&
            [...grades].map((grade, idx) => {
              return (
                <GradeItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={`grade-item-${idx}`}
                  onSubmitGrade={handelSubmitGrade}
                  onDeleteGrade={handleDeleteGrade}
                  item={{ ...grade, index: idx }}
                  isEditable={isEditable}
                  isCreateable={!!(semester && year)}
                />
              );
            })}
        </div>
        {isEditable && (
          <div className="flex flex-row justify-end">
            <Button
              className="mt-4 align-right"
              // variant="contained"
              color="success"
              disabled={!semester || !year}
              onClick={handleAddGrade}
            >
              Thêm điểm
            </Button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
GradeBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isEditable: PropTypes.bool.isRequired
};
export default GradeBoard;
