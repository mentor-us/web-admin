import { useNavigate } from "react-router-dom";

import bgImage from "assets/images/hcmus.jpg";

import FullPageLayout from "layouts/FullPageLayout";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import "./styles.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <FullPageLayout>
      <MDBox
        sx={{
          backgroundImage: `linear-gradient(195deg, rgba(66, 66, 74, 0.6), rgba(25, 25, 25, 0.6)), url(${bgImage})`
        }}
        className="not-found__container"
      >
        <MDBox
          sx={{
            width: "50%",
            height: "max-content",
            px: 4,
            py: 4,
            background: "white",
            borderRadius: "10px"
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography component="p" fontSize="5rem" className="not-found___text">
            404
          </MDTypography>
          <MDTypography
            component="p"
            fontSize="2.5rem"
            fontWeight="regular"
            className="not-found___text"
          >
            Không tìm thấy trang này
          </MDTypography>
          <MDTypography component="p" fontSize="1.5rem" className="not-found___text">
            Vui lòng nhập đúng địa chỉ hoặc truy cập trang có đường dẫn hợp lệ
          </MDTypography>
          <MDButton
            variant="gradient"
            color="info"
            sx={{ mt: 1, fontSize: "1rem", textTransform: "none" }}
            onClick={() => navigate("/groups", { replace: true })}
          >
            Quay lại trang chủ
          </MDButton>
        </MDBox>
      </MDBox>
    </FullPageLayout>
  );
}

export default PageNotFound;
