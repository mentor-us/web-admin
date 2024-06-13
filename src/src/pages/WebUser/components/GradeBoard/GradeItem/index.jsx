import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";

import { getAllCourse } from "hooks/grades/queries";

function GradeItem(props) {
  const { item, isEditable, onDeleteGrade, isCreateable, onSubmitGrade } = props;
  const { data: courses } = getAllCourse();
  const [score, setScore] = useState(item.score ?? "");
  const [course, setCourse] = useState(item?.course ?? "");
  const [verified, setVerified] = useState(item.verified ?? false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const handleScoreChange = (event) => {
    if (!isEditable) return;
    const { value } = event.target;
    const numValue = Number(value);

    if (numValue >= 0 && numValue <= 10) {
      setScore(value);
    }
  };
  // const handleNameChange = (event) => {
  //   if (!isEditable) return;
  //   setGradeName(event.target.value);
  // };

  const handleDeleteGrade = () => {
    onDeleteGrade(item);
  };
  const handleSubmitGrade = () => {
    setDisableSubmit(true);
    setIsSubmiting(true);
  };
  useEffect(() => {
    if (isSubmiting) {
      onSubmitGrade({ ...item, score: +score, course, verified });
      setIsSubmiting(false);
    }
  }, [isSubmiting]);
  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (item?.course?.id != course?.id || item.score != score) {
      setVerified(false);
      setDisableSubmit(false);
    } else {
      setVerified(item.verified);
      setDisableSubmit(true);
    }
  }, [course, score]);
  return (
    <div className="grade flex flex-row items-center gap-x-2 w-full">
      <div className="flex flex-row gap-x-3 items-center w-4/6">
        <div className="w-full">
          <Autocomplete
            noOptionsText="Không có thông tin môn học"
            value={course}
            required={isEditable}
            disabled={!isEditable}
            onChange={(e, newValue) => {
              setCourse(newValue);
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
