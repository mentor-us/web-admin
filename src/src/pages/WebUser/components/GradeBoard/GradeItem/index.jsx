import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";

function GradeItem(props) {
  const { item, isEditable, onDeleteGrade, isCreateable, onSubmitGrade } = props;
  const [score, setScore] = useState(item.score ?? "");
  const [gradeName, setGradeName] = useState(item.name ?? "");
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
  const handleNameChange = (event) => {
    if (!isEditable) return;
    setGradeName(event.target.value);
  };

  const handleDeleteGrade = () => {
    onDeleteGrade(item);
  };
  const handleSubmitGrade = () => {
    setDisableSubmit(true);
    setIsSubmiting(true);
  };
  useEffect(() => {
    if (isSubmiting) {
      onSubmitGrade({ ...item, score: +score, gradeName, verified });
      setIsSubmiting(false);
    }
  }, [isSubmiting]);
  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (item.name != gradeName || item.score != score) {
      setVerified(false);
      setDisableSubmit(false);
    } else {
      setVerified(item.verified);
      setDisableSubmit(true);
    }
  }, [gradeName, score]);
  return (
    <div className="grade flex flex-row items-center gap-x-2">
      <div className="flex flex-row gap-x-3 items-center">
        <div className="min-w-32">
          <TextField
            id="name"
            required={isEditable}
            label="Tên môn học"
            InputLabelProps={{
              shrink: true,
              readOnly: !isEditable
            }}
            variant="standard"
            value={gradeName}
            onChange={handleNameChange}
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
