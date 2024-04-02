import { Controller } from "react-hook-form";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import PropTypes from "prop-types";

function VoteOption({ control, index, remove, errors }) {
  return (
    <Controller
      control={control}
      name={`choices.${index}.name`}
      rules={{
        required: "Không được để trống bình chọn"
      }}
      render={({ field: innerField }) => (
        <Stack direction="row">
          <TextField
            {...innerField}
            label={`Lựa chọn ${index + 1} *`}
            error={errors?.choices && errors?.choices[index]}
            helperText={errors?.choices && errors?.choices[index]?.name?.message}
            fullWidth
            InputProps={{
              endAdornment:
                index > 1 ? (
                  <Tooltip title="Xóa lựa chọn">
                    <IconButton onClick={() => remove(index)}>
                      <ClearIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : null
            }}
          />
        </Stack>
      )}
    />
  );
}

VoteOption.propTypes = {
  control: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  remove: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired
};

export default VoteOption;
