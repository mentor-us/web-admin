import React, { useState } from "react";
import { Autocomplete, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import PropTypes from "prop-types";

import GradeItem from "./GradeItem";
import "./index.css";

const years = ["2024", "2023", "2022", "2021"];
const semesters = ["HK1", "HK2", "HK3"];
const grades = [
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
  },
  {
    id: 3,
    name: null,
    score: 0,
    verified: false
  }
];

function GradeBoard(props) {
  const { isEditable } = props;
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [semester, setSemester] = useState(null);
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
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            disableClearable
            options={years}
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
            onChange={(e, newValue) => {
              setSemester(newValue);
            }}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            disableClearable
            options={semesters}
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn học kì" size="small" />
            )}
          />
        </div>
        <div className="flex flex-col space-y-6">
          {grades.map((grade) => {
            return <GradeItem item={grade} isEditable={isEditable} />;
          })}
        </div>
      </div>
    </ThemeProvider>
  );
}
GradeBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isEditable: PropTypes.bool.isRequired
};
export default GradeBoard;
