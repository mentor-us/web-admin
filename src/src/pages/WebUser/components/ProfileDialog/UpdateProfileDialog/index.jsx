import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import { useUpdateProfileMutation } from "hooks/profile/mutation";

function UpdateProfileDialog(props) {
  const { open, onClose, info } = props;
  const { mutateAsync: updateProfileMutation, isPending } = useUpdateProfileMutation();
  const {
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: info.name ? info.name : "",
      phone: info.phone ? info.phone : "",
      dob: info.birthDate ? dayjs(info.birthDate) : null
    }
  });
  const prepare = (data) => {
    return {
      id: info.id,
      imageUrl: info.imageUrl,
      name: data.name,
      phone: data.phone,
      personalEmail: info.personalEmail,
      birthDate: data.dob.toISOString(),
      gender: info.gender
    };
  };

  const onSubmit = (data) => {
    // console.log("data", data.dob.date());
    toast.promise(
      new Promise((resolve, reject) => {
        updateProfileMutation(prepare(data))
          .then(() => {
            resolve();
          })
          .catch(reject);
      }),
      {
        loading: "Đang cập nhật...",
        success: "Cập nhật thành công",
        error: "Có lỗi xảy ra, vui lòng thử lại"
      }
    );
    onClose();
  };
  const onCancel = () => {
    reset();
    onClose();
  };
  const today = dayjs().add(1, "h");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: "form",
          className: "!px-3 !py-2"
        }}
        onSubmit={(event) => {
          if (isPending) {
            return;
          }
          event.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <DialogTitle alignSelf="center">Cập nhật thông tin</DialogTitle>
        <DialogContent className="!py-3">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Họ và tên không được để trống" }}
            render={({ field }) => (
              <TextField
                {...field}
                className="!mb-3"
                label="Họ và tên"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="!mb-3"
                label="Số điện thoại"
                fullWidth
                error={!!errors.phone}
                helperText={errors?.phone?.message}
              />
            )}
          />
          <Controller
            name="dob"
            control={control}
            rules={{
              validate: {
                gtnow: (v) => {
                  if (!v || dayjs().isAfter(v)) {
                    return true;
                  }

                  return "Ngày tới hạn phải lớn hơn hoặc bằng ngày hiện tại";
                }
              }
            }}
            render={({ field: { onChange, ...rest } }) => (
              <DatePicker
                className="!mb-3"
                format="DD/MM/YYYY"
                fullWidth
                label="Ngày sinh"
                slotProps={{
                  actionBar: {
                    actions: ["today"]
                  },
                  textField: {
                    fullWidth: true,
                    error: !!errors?.date,
                    helperText: errors?.date?.message
                  }
                }}
                //   localeText={{
                //     todayButtonLabel: "Hôm nay"
                //   }}
                maxDate={today}
                onChange={(newValue) => onChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Ngày *" />}
                {...rest}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Đóng</Button>
          <Button type="submit">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

UpdateProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired
};
export default UpdateProfileDialog;
