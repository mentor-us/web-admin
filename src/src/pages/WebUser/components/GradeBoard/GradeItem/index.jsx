import React, { useEffect, useReducer } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";

import { getAllCourse } from "hooks/grades/queries";

const initState = {
  score: null,
  course: null,
  courseInfo: "",
  verified: null,
  disableSubmit: false,
  isSubmiting: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_COURSE":
      return { ...state, course: action.payload };
    case "SET_COURSE_INFO":
      return { ...state, courseInfo: action.payload };
    case "SET_VERIFIED":
      return { ...state, verified: action.payload };
    case "SET_DISABLE_SUBMIT":
      return { ...state, disableSubmit: action.payload };
    case "SET_IS_SUBMITING":
      return { ...state, isSubmiting: action.payload };
    default:
      return state;
  }
}
function GradeItem(props) {
  const { item, isEditable, onDeleteGrade, isCreateable, onSubmitGrade } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const { score, course, courseInfo, verified, disableSubmit, isSubmiting } = state;
  const { data: courses } = getAllCourse(course?.name === courseInfo ? "" : courseInfo);

  const handleScoreChange = (event) => {
    if (!isEditable) return;
    const { value } = event.target;
    const numValue = Number(value);

    if (numValue >= 0 && numValue <= 10) {
      dispatch({ type: "SET_SCORE", payload: value });
    }
  };
  const handleDeleteGrade = () => {
    onDeleteGrade(item);
  };
  const handleSubmitGrade = () => {
    dispatch({ type: "SET_DISABLE_SUBMIT", payload: true });
    dispatch({ type: "SET_IS_SUBMITING", payload: true });
  };
  useEffect(() => {
    if (isSubmiting) {
      onSubmitGrade({ ...item, score: +score, course, verified });
      dispatch({ type: "SET_IS_SUBMITING", payload: false });
    }
  }, [isSubmiting]);
  useEffect(() => {
    if (item?.course?.id !== course?.id || item.score !== score) {
      dispatch({ type: "SET_VERIFIED", payload: false });
      dispatch({ type: "SET_DISABLE_SUBMIT", payload: false });
    } else {
      dispatch({ type: "SET_VERIFIED", payload: item.verified });
      dispatch({ type: "SET_DISABLE_SUBMIT", payload: true });
    }
  }, [course, score]);
  useEffect(() => {
    dispatch({ type: "SET_SCORE", payload: item.score });
    dispatch({ type: "SET_COURSE", payload: item.course });
    dispatch({ type: "SET_VERIFIED", payload: item.verified });
  }, [item]);
  return (
    <div className="grade flex flex-row items-center gap-x-2 w-full justify-between">
      <div className="flex flex-row gap-x-3 items-center grow">
        <div className="w-full">
          <Autocomplete
            noOptionsText="Không có thông tin môn học"
            value={course}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            required={isEditable}
            disabled={!isEditable}
            onChange={(e, newValue) => {
              dispatch({ type: "SET_COURSE", payload: newValue });
            }}
            onInputChange={(event, value) => {
              dispatch({ type: "SET_COURSE_INFO", payload: value });
            }}
            sx={{
              width: "100%",
              pl: "0!important",
              pt: "0!important"
            }}
            color="text"
            options={courses ?? []}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn môn học" size="small" />
            )}
          />
        </div>
        <TextField
          id="standard-number"
          type="number"
          label="Điểm"
          required={isEditable}
          InputLabelProps={{
            shrink: true,
            readOnly: !isEditable
          }}
          sx={{
            width: "20%"
          }}
          variant="standard"
          value={score}
          onChange={handleScoreChange}
        />
      </div>
      {verified ? (
        <span className="min-w-24 text-right text-sm status verified">Đã xác minh</span>
      ) : (
        <span className="min-w-24 text-right text-sm status unverified">Chưa xác minh</span>
      )}
      {isEditable && (
        <div className="flex flex-row">
          <IconButton
            onClick={handleSubmitGrade}
            color="primary"
            size="small"
            aria-label="add to shopping cart"
            disabled={disableSubmit || isSubmiting || (!isCreateable && !item.id)}
          >
            <CheckCircleIcon
              color={
                disableSubmit || isSubmiting || (!isCreateable && !item.id) ? "disabled" : "primary"
              }
            />
          </IconButton>
          <IconButton
            onClick={handleDeleteGrade}
            color="primary"
            size="small"
            aria-label="add to shopping cart"
          >
            <RemoveCircleIcon color="error" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
GradeItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isCreateable: PropTypes.bool.isRequired,
  onDeleteGrade: PropTypes.func.isRequired,
  onSubmitGrade: PropTypes.func.isRequired
};
export default GradeItem;
