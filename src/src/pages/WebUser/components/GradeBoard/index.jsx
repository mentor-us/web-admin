import React, { useEffect, useState } from "react";
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

// const getDefaultYear = () => {
//   const currentYear = new Date().getFullYear();
//   const previousYear = currentYear - 1;
//   const yearRange = `${previousYear} - ${currentYear}`;
//   return yearRange;
// };
function GradeBoard(props) {
  const { isEditable } = props;
  const [year, setYear] = useState(null);
  console.log(year);
  const [semester, setSemester] = useState(null);
  const myInfo = useMyInfo();
  const {
    data: years,
    isLoading: isLoadingDefaultYear,
    isSuccess: loadYearSuccess
  } = useGetAllYears();
  const { data: semesters } = getAllSemesterOfYear(year);
  const { data: grades } = useGetAllGrades(year, semester, myInfo.id);
  const createGradeMutator = useCreateGradeMutation(year, semester);
  const updateGradeMutator = useUpdateGradeMutation(year, semester);
  const deleteGradeMutator = useDeleteGradeMutation(year, semester);
  const disableYearAndSemester = [...(grades ?? [])].find((grade) => !grade.id);

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
    // setGrades(temp);
  };
  useEffect(() => {
    if (loadYearSuccess) {
      setYear(years[0]);
    }
  }, [loadYearSuccess]);
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
              console.log("newValue");
              console.log(newValue);
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
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn học kì" size="small" />
            )}
          />
        </div>
        <div className="flex flex-col space-y-6">
          {!isLoadingDefaultYear && (
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
