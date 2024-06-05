import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import { getAllSemesterOfYear, useGetAllYears } from "hooks/grades/queries";

import GradeItem from "./GradeItem";
import "./index.css";

const gradesList = [
  {
    id: 1,
    name: "Thiết kế phần mềm",
    score: 10,
    verified: true
  },
  {
    id: 2,
    name: "Thiết kế web",
    score: 5,
    verified: true
  },
  {
    id: 3,
    name: "Thiết kế giao dien",
    score: 7,
    verified: false
  }
];

const gradeExample = {
  id: null,
  name: null,
  score: 0,
  verified: false
};
function GradeBoard(props) {
  const { isEditable } = props;
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [semester, setSemester] = useState(null);
  const [grades, setGrades] = useState(gradesList);
  const disableYearAndSemester = grades.find((grade) => !grade.id);
  const { data: years } = useGetAllYears();
  const { data: semesters } = getAllSemesterOfYear();
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
    setGrades((pre) => [...pre, gradeExample]);
  };
  const handleDeleteGrade = (index) => {
    const newArray = [...grades];
    newArray.splice(index, 1);
    setGrades(newArray);
  };
  const handelSubmitGrade = (item) => {
    console.log("handelSubmitGrade");
    console.log(year, semester);
    const temp = [...grades];
    temp[item.index] = { ...item, year, semester };
    setGrades(temp);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="flex-col justify-between items-end space-y-2">
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
            noOptionsText="Trống"
            value={year}
            onChange={(e, newValue) => {
              setYear(newValue);
            }}
            disabled={disableYearAndSemester}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            disableClearable
            options={years ?? []}
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
            noOptionsText="Trống"
            value={semester}
            disabled={disableYearAndSemester}
            onChange={(e, newValue) => {
              setSemester(newValue);
            }}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            options={semesters ?? []}
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn học kì" size="small" />
            )}
          />
        </div>
        <div className="flex flex-col space-y-6">
          {grades.map((grade, idx) => {
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
