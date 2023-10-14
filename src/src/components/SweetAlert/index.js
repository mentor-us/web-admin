import Swal from "sweetalert2";

const getSweetAlertProps = (currentProps, anotherProps) => {
  const props = anotherProps !== null ? Object.assign(currentProps, anotherProps) : currentProps;
  return props;
};

const SuccessAlert = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000
    },
    anotherProps
  );

  return Swal.fire(props);
};

const SuccessAlertConfirm = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "OK",
      allowOutsideClick: false
    },
    anotherProps
  );

  return Swal.fire(props);
};

const ErrorAlert = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      width: "600px"
    },
    anotherProps
  );

  return Swal.fire(props);
};

const ErrorAlertConfirm = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "OK",
      allowOutsideClick: false
    },
    anotherProps
  );

  return Swal.fire(props);
};

const ErrorAlertYesNo = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "error",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      denyButtonText: "Đóng",
      confirmButtonText: "Đồng ý",
      allowOutsideClick: false
    },
    anotherProps
  );

  return Swal.fire(props);
};

const WarningAlertConfirm = (title, html, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title,
      html,
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      denyButtonText: "Hủy",
      allowOutsideClick: false
    },
    anotherProps
  );

  return Swal.fire(props);
};

const WarningAlertConfirmNotSavingData = (title = null, html = null, anotherProps = null) => {
  const props = getSweetAlertProps(
    {
      title: title || "Xác nhận huỷ?",
      html: html || "Thay đổi chưa lưu của bạn sẽ bị mất!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      confirmButtonText: "Tiếp tục",
      denyButtonText: "Thoát",
      allowOutsideClick: false
    },
    anotherProps
  );

  return Swal.fire(props);
};

export {
  ErrorAlert,
  ErrorAlertConfirm,
  ErrorAlertYesNo,
  SuccessAlert,
  SuccessAlertConfirm,
  WarningAlertConfirm,
  WarningAlertConfirmNotSavingData
};
