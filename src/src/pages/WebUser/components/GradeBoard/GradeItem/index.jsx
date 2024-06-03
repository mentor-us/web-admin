import React, { useState } from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function GradeItem(props) {
  const { item } = props;
  const [score, setScore] = useState(item.score ?? "");
  const handleScoreChange = (event) => {
    const { value } = event.target;
    const numValue = Number(value);

    if (numValue >= 0 && numValue <= 10) {
      setScore(value);
    }
  };
  // const handleUpdateGrage = ()=>{
  //   item.id
  // }
  return (
    <div className="grade flex flex-row items-center">
      <div className="flex flex-row gap-x-3 items-center">
        <span>{item.name}:</span>
        <TextField
          id="standard-number"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            width: "10%"
          }}
          variant="standard"
          value={score}
          onChange={handleScoreChange}
        />
      </div>
      {item.verified ? (
        <span className="min-w-28 status text-right verified">Đã xác minh</span>
      ) : (
        <span className="min-w-28 status text-right unverified">Chưa xác minh</span>
      )}
    </div>
  );
}
GradeItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired
};
export default GradeItem;
