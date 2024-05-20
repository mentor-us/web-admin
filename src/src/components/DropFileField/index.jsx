import { useRef, useState } from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { formatBytes } from "utils";
import cloud from "assets/images/cloud.png";
import image from "assets/images/image.png";
import xlsx from "assets/images/xlsx.png";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import { imageExtensionList } from "utils/constants";

import "./styles.css";

function DropFileField({ setState, maxSize, accept }) {
  const wrapperRef = useRef(null);

  const [file, setFile] = useState();

  const checkFileExtension = (fileCheck) => {
    if (accept === ".xlsx") {
      const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const fileExtension = ".xlsx";
      return fileCheck.name.includes(fileExtension) && fileCheck.type === type;
    }
    if (accept === ".png, .jpeg, .jpg") {
      return fileCheck.type === "image/png" || fileCheck.type === "image/jpeg";
    }

    return false;
  };

  const createDataURL = (fileCheck) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(reader.result);
    };
    reader.readAsDataURL(fileCheck);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];

    if (accept === ".xlsx" && !checkFileExtension(newFile)) {
      ErrorAlert("Vui lòng chọn tập tin excel có định dạng là .xlsx!");
      return;
    }

    if (accept === ".png, .jpeg, .jpg" && !checkFileExtension(newFile)) {
      ErrorAlert("Vui lòng chọn tập tin ảnh có 1 trong 3 định dạng: .png, .jpeg, .jpg!");
      return;
    }

    if (maxSize && newFile.size > maxSize) {
      ErrorAlert(`Vui lòng chọn tập tin có dung lượng nhỏ hơn ${formatBytes(maxSize)} !`);
      return;
    }
    setFile(newFile);
    if (accept === ".png, .jpeg, .jpg") {
      createDataURL(newFile);
    } else {
      setState(newFile);
    }
  };

  const fileRemove = () => {
    setFile(null);
    setState(null);
  };

  const getImageRepresent = (fileCheck) => {
    if (accept === ".xlsx") {
      return xlsx;
    }
    if (accept.includes(".png")) {
      const nameArr = fileCheck.name.split(".");
      return imageExtensionList.find((item) => nameArr[nameArr.length - 1] === item.type).src;
    }

    return image;
  };

  return (
    <div className="drop-file-input_container">
      {!file && (
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label ">
            <div className="flex justify-center">
              <img src={cloud} alt="" />
            </div>

            <MDTypography component="p">
              Kéo thả tập tin <span style={{ fontWeight: "bold" }}>({accept})</span> vào đây
            </MDTypography>
            <MDTypography component="p">hoặc</MDTypography>
            <MDButton
              color="warning"
              sx={{ mt: 1, paddingTop: "7px!important", paddingBottom: "7px!important" }}
            >
              <MDTypography
                sx={{ color: "white" }}
                color="white"
                variant="body2"
                fontWeight="regular"
                fontSize="large"
              >
                Chọn tệp
              </MDTypography>
            </MDButton>
            {maxSize && (
              <MDTypography sx={{ mt: 1.7 }} fontSize="small" component="p">
                <i>
                  Kích cỡ tối đa đối với tập tin:
                  <span style={{ fontWeight: "bold" }}> {formatBytes(maxSize)}</span>{" "}
                </i>
              </MDTypography>
            )}
          </div>
          <input type="file" accept={accept} value="" onChange={onFileDrop} />
        </div>
      )}
      {file && (
        <div className="drop-file-preview">
          <div className="drop-file-preview__container">
            <div className="drop-file-preview__item">
              <img
                src={getImageRepresent(file)}
                alt=""
                style={{ objectFit: "contain", maxWidth: "50px" }}
              />
              <div className="drop-file-preview__item__info">
                <p>{file?.name}</p>
                <p>{formatBytes(file?.size)}</p>
              </div>
            </div>
            <MDBox className="drop-file-preview__item__del" onClick={fileRemove}>
              <Icon fontSize="inherit" color="error">
                close
              </Icon>
            </MDBox>
          </div>
        </div>
      )}
    </div>
  );
}

DropFileField.defaultProps = {
  maxSize: 1 * 1024 * 1024,
  accept: ".xlsx"
};

DropFileField.propTypes = {
  setState: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  accept: PropTypes.string
};

export default DropFileField;
