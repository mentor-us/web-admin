import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import bgImage from "assets/images/hcmus.jpg";

import FullPageCenter from "layouts/components/FullPageCenter";
import FullBgImageLayout from "layouts/FullBgImageLayout";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

function AccessDenied() {
  const navigate = useNavigate();
  return (
    <FullBgImageLayout image={bgImage}>
      <FullPageCenter>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            mb={1}
            p={2}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Lỗi
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={4} px={3}>
            <MDTypography className="text-center" variant="h4" fontWeight="medium" mt={1} fullWidth>
              Tài khoản không có quyền sử dụng chức năng này.
            </MDTypography>
            <MDTypography className="text-center" variant="h4" fontWeight="medium" mt={1} fullWidth>
              Vui lòng liên hệ với admin để được hỗ trợ
            </MDTypography>
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <MDButton
                variant="gradient"
                color="info"
                sx={{ mt: 2, textTransform: "none", fontSize: "1rem" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Quay lại
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </FullPageCenter>
    </FullBgImageLayout>
  );
}

AccessDenied.propTypes = {};

export default AccessDenied;
