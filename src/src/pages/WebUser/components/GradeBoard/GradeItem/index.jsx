import React, { useEffect, useReducer } from "react";
import PublicIcon from "@mui/icons-material/Public";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SchoolIcon from "@mui/icons-material/School";
import { IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";

const initState = {
  score: null,
  course: null,
  courseName: "",
  verified: null,
  isSubmiting: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_COURSE":
      return { ...state, course: action.payload };
    case "SET_COURSE_NAME":
      return { ...state, courseName: action.payload };
    case "SET_VERIFIED":
      return { ...state, verified: action.payload };
    case "SET_IS_SUBMITING":
      return { ...state, isSubmiting: action.payload };
    default:
      return state;
  }
}
function GradeItem(props) {
  const { item, isEditable, onDeleteGrade, onSubmitGrade } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const { score, course, courseName, verified, isSubmiting } = state;

  const handleDeleteGrade = () => {
    onDeleteGrade(item);
  };
  const onClickSetModeSharing = () => {
    dispatch({ type: "SET_IS_SUBMITING", payload: true });
  };
  useEffect(() => {
    if (isSubmiting) {
      onSubmitGrade({ ...item, score: +score, course, verified });
      dispatch({ type: "SET_IS_SUBMITING", payload: false });
    }
  }, [isSubmiting]);
  useEffect(() => {
    dispatch({ type: "SET_COURSE_NAME", payload: course?.name ?? "" });
  }, [course]);
  useEffect(() => {
    dispatch({ type: "SET_SCORE", payload: item.score });
    dispatch({ type: "SET_COURSE", payload: item.course });
  }, [item]);
  return (
    <div className="grade flex flex-row items-center gap-x-4 w-full justify-between">
      <SchoolIcon />
      <div className="flex flex-row gap-x-4 items-center grow">
        <TextField
          id="course-name"
          label="Môn học"
          InputLabelProps={{
            shrink: true,
            readOnly: true
          }}
          variant="standard"
          value={courseName}
        />
        {/* <Autocomplete
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
          /> */}
        <TextField
          id="standard-number"
          type="number"
          label="Điểm"
          InputLabelProps={{
            shrink: true,
            readOnly: true
          }}
          sx={{
            width: "20%"
          }}
          variant="standard"
          value={score}
        />
      </div>
      {isEditable && (
        <div className="flex flex-row">
          <IconButton
            onClick={onClickSetModeSharing}
            color="primary"
            size="small"
            aria-label="add to shopping cart"
          >
            <PublicIcon />
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
  onDeleteGrade: PropTypes.func.isRequired,
  onSubmitGrade: PropTypes.func.isRequired
};
export default GradeItem;
