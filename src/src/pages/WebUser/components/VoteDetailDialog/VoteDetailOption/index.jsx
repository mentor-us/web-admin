import { Controller, useWatch } from "react-hook-form";
import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

import useMyInfo from "hooks/useMyInfo";

function VoteDetailOption({
  control,
  index,
  remove,
  errors,
  field,
  voteTotal,
  onVoterChange,
  isMultipleChoice,
  setValue
}) {
  const myInfo = useMyInfo();
  const choices = useWatch({ name: "choices", control });
  const choiceName = useWatch({ name: `choices.${index}.name`, control });
  const votePercent = field.voters.length
    ? `${((field.voters.length / voteTotal) * 100).toFixed(2)}%`
    : "0%";

  return (
    <Controller
      control={control}
      name={`choices.${index}`}
      render={({ field: innerField }) => {
        return (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            className="!mb-2"
          >
            <Checkbox
              sx={{
                "&.Mui-disabled": {
                  opacity: 0.8
                }
              }}
              disabled={choiceName.length === 0}
              checked={field.isChosen || false}
              onChange={(e, isChosen) => {
                let voters = [...field.voters];
                if (!field.isChosen) {
                  voters.push({
                    id: myInfo.id,
                    name: myInfo.name,
                    imageUrl: myInfo.imageUrl
                  });
                  onVoterChange(voteTotal + 1);

                  if (!isMultipleChoice) {
                    choices.forEach((choice, idx) => {
                      if (index === idx) {
                        return;
                      }

                      if (choice.voters.flatMap((voter) => voter.id).includes(myInfo.id)) {
                        setValue(`choices.${idx}`, {
                          ...choice,
                          isChosen: false,
                          voters: choice.voters.filter((voter) => voter.id !== myInfo.id)
                        });
                        onVoterChange(voteTotal);
                      }
                    });
                  }
                } else {
                  const myVoteIndex = voters.findIndex((voter) => voter.id === myInfo.id);
                  if (myVoteIndex !== -1) {
                    onVoterChange(voteTotal - 1);
                    voters = voters.filter((voter) => voter.id !== myInfo.id);
                  }
                }

                innerField.onChange({
                  ...field,
                  voters,
                  isChosen
                });
              }}
            />
            {field?.isNewOption ? (
              <Controller
                control={control}
                name={`choices.${index}.name`}
                rules={{
                  required: "Không được để trống bình chọn",
                  validate: {
                    unique: (v) =>
                      !choices
                        .filter((choice) => choice.id !== field.id)
                        .flatMap((choice) => choice.name)
                        .includes(v) || "Phương án được thêm đã tồn tại"
                  }
                }}
                render={({ field: { ref, ...nameField } }) => {
                  return (
                    <TextField
                      {...nameField}
                      className="!p-0"
                      inputRef={ref}
                      fullWidth
                      label=""
                      error={errors?.choices ? errors?.choices[index] : false}
                      helperText={errors?.choices ? errors?.choices[index]?.name?.message : ""}
                      placeholder={`Lựa chọn ${index + 1}`}
                      inputProps={{
                        className: "!p-0 !px-2"
                      }}
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      InputProps={{
                        endAdornment: (
                          <IconButton className="!mx-0 !px-0" onClick={() => remove(index)}>
                            <ClearIcon />
                          </IconButton>
                        )
                      }}
                    />
                  );
                }}
              />
            ) : (
              <Box
                flex={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="vote-message-item h-10 !mb-0"
              >
                <motion.div
                  className="vote-percent-line !z-10"
                  initial={{ width: votePercent }}
                  animate={{
                    width: votePercent
                  }}
                  transition={{
                    duration: 0.2
                  }}
                />
                <Typography className="vote-option-text line-clamp-2 !text-sm !z-20">
                  {field.name}
                </Typography>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                  <AvatarGroup className="!z-20">
                    {field.voters
                      .flatMap((voter) => voter.imageUrl)
                      .map((image) => {
                        return (
                          <Avatar
                            key={image}
                            src={getImageUrlWithKey(image)}
                            className="!w-4 !h-4"
                          />
                        );
                      })}
                  </AvatarGroup>
                  <Typography className="vote-option-number line-clamp-1 !text-sm !z-20">
                    {field.voters.length}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>
        );
      }}
    />
  );
}

VoteDetailOption.defaultProps = {
  isMultipleChoice: true
};

VoteDetailOption.propTypes = {
  control: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  remove: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  voteTotal: PropTypes.number.isRequired,
  onVoterChange: PropTypes.func.isRequired,
  isMultipleChoice: PropTypes.bool,
  setValue: PropTypes.func.isRequired
};

export default VoteDetailOption;
