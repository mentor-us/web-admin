import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";

function GradeItem(props) {
  const { item, isEditable } = props;
  const [score, setScore] = useState(item.score ?? "");
  const [gradeName, setGradeName] = useState(item.name ?? "");
  const [verified, setVerified] = useState(item.verified ?? false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const handleScoreChange = (event) => {
    const { value } = event.target;
    const numValue = Number(value);

    if (numValue >= 0 && numValue <= 10) {
      setScore(value);
    }
  };
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
            label="Tên môn học"
            InputLabelProps={{
              shrink: true,
              readOnly: disableSubmit
            }}
            variant="standard"
            value={gradeName}
            onChange={(event) => setGradeName(event.target.value)}
          />
        </div>
        <TextField
          id="standard-number"
          type="number"
          label="Điểm"
          InputLabelProps={{
            shrink: true,
            readOnly: disableSubmit
          }}
          sx={{
            width: "13%"
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
        <IconButton color="primary" aria-label="add to shopping cart" disabled={disableSubmit}>
          <CheckCircleIcon color={disableSubmit ? "disabled" : "primary"} />
        </IconButton>
      )}
    </div>
  );
}
GradeItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired
};
export default GradeItem;
